module.exports = function ({ api, models, Users, Threads, Currencies }) {
    const logger = require("../../utils/log.js");
    const moment = require("moment-timezone"); // timezone support

    return async function ({ event }) {
        const timeStart = Date.now();
        const time = moment.tz("Asia/Dhaka").format("HH:mm:ss L"); // Asia/Dhaka

        const { userBanned, threadBanned } = global.data;
        const { events } = global.client;
        const { allowInbox, DeveloperMode } = global.config;
        let { senderID, threadID, body } = event;
        senderID = String(senderID);
        threadID = String(threadID);

        if (userBanned.has(senderID) || threadBanned.has(threadID) || (allowInbox === false && senderID === threadID)) {
            return;
        }

        // ==========================
        // MENTION LOGIC (all @user)
        // ==========================
        if (typeof body === "string") {
            const tagMatches = body.match(/@([^\s@]+)/g); // সব @mentions
            if (tagMatches && tagMatches.length > 0) {
                try {
                    const info = await api.getThreadInfo(threadID);
                    const nicknames = info.nicknames || {};
                    const userInfo = info.userInfo || [];
                    event.mentions = {};

                    for (const tag of tagMatches) {
                        const tagName = tag.replace("@", "").toLowerCase();

                        // Check nicknames first
                        let foundID = Object.keys(nicknames).find(id =>
                            nicknames[id].toLowerCase().includes(tagName)
                        );

                        // Check actual names if nickname not found
                        if (!foundID) {
                            const user = userInfo.find(u =>
                                (u.name && u.name.toLowerCase().includes(tagName)) ||
                                (u.firstName && u.firstName.toLowerCase().includes(tagName))
                            );
                            if (user) foundID = user.id;
                        }

                        if (foundID) event.mentions[foundID] = "";
                    }
                } catch (err) {
                    logger(`Mention logic error: ${err}`, "error");
                }
            }
        }

        // ==========================
        // RUN EVENTS
        // ==========================
        for (const [key, value] of events.entries()) {
            if (value.config.eventType.includes(event.logMessageType)) {
                const eventRun = events.get(key);
                try {
                    const Obj = {
                        api,
                        event,
                        models,
                        Users,
                        Threads,
                        Currencies
                    };
                    eventRun.run(Obj);

                    if (DeveloperMode === true) {
                        logger(global.getText('handleEvent', 'executeEvent', time, eventRun.config.name, threadID, Date.now() - timeStart), '[ Sự kiện ]');
                    }
                } catch (error) {
                    logger(global.getText('handleEvent', 'eventError', eventRun.config.name, JSON.stringify(error)), "error");
                }
            }
        }
    };
};
