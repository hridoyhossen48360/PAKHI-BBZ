const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "prefix",
  version: "1.4.0",
  hasPermssion: 0,
  credits: "Rx",
  description: "Show bot prefix info without using any prefix (with animation)",
  commandCategory: "System",
  usages: "",
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  if (body.toLowerCase().trim() === "prefix") {

    // ---------- PROGRESS BAR ANIMATION ----------
    const progress = [
        "[■□□□□□□□□□] 10%",
        "[■■■□□□□□□□] 30%",
        "[■■■■■□□□□□] 50%",
        "[■■■■■■■□□□] 70%",
        "[■■■■■■■■■□] 90%",
        "[■■■■■■■■■■] 100%"
    ];

    let loading = await api.sendMessage(
      `𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n\n${progress[0]}`,
      threadID
    );

    for (let i = 1; i < progress.length; i++) {
      await new Promise(r => setTimeout(r, 250));
      await api.editMessage(
        `𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n\n${progress[i]}`,
        loading.messageID
      );
    }

    // ---------- DATA ----------
    const ping = Date.now() - event.timestamp;
    const day = moment.tz("Asia/Dhaka").format("dddd");

    const BOTPREFIX = global.config.PREFIX || "!";
    const GROUPPREFIX = global.data.threadData?.[threadID]?.prefix || BOTPREFIX;
    const BOTNAME = global.config.BOTNAME || "✦ 𝙏𝙊𝙍𝙐 𝘾𝙃𝘼𝙉 ✦";

    const frames = [
      `
🌟╔═༶• 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 •༶═╗🌟
🕒 Ping: ${ping}ms
📅 Day: ${day}
💠 Bot Prefix: ${BOTPREFIX}
💬 Group Prefix: ${GROUPPREFIX}
🤖 Bot Name: ${BOTNAME}
🌟╚═༶• 𝗘𝗻𝗱 𝗢𝗳 𝗦𝘁𝗮𝘁𝘂𝘀 •༶═╝🌟
`,
      `
╭━━•✧𝗣𝗥𝗘𝗙𝗜𝗫 𝗦𝗧𝗔𝗧𝗨𝗦✧•━━╮
│ ⏱ Ping: ${ping}ms
│ 📆 Day: ${day}
│ 🔹 Bot Prefix: ${BOTPREFIX}
│ 🔹 Group Prefix: ${GROUPPREFIX}
│🤖 Bot: ${BOTNAME}
╰━━━━━━━━━━━━━━━╯
`,
      `
┏━༺ 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 ༻━┓
┃ 🕒 Ping: ${ping}ms
┃ 📅 Day: ${day}
┃ 💠 Bot Prefix: ${BOTPREFIX}
┃ 💬 Group Prefix: ${GROUPPREFIX}
┃ 🤖 Bot Name: ${BOTNAME}
┗━━━━━━━━━━━━━━━━━┛
`,
      `
▸▸▸ 𝗣𝗥𝗘𝗙𝗜𝗫 𝗦𝗧𝗔𝗧𝗨𝗦 ◂◂◂
  Ping: ${ping}ms
  Day: ${day}
  Bot Prefix: ${BOTPREFIX}
  Group Prefix: ${GROUPPREFIX}
  Bot Name: ${BOTNAME}
`
    ];

    // ---------- RANDOM GIF ----------
    const gifList = [
      "abdullah2.gif",
      "abdullah1.gif",
      "abdullah3.gif",
      "abdullah4.gif",
      "abdullah5.gif"
    ];

    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    const gifPath = path.join(__dirname, "noprefix", randomGif);

    const chosenFrame = frames[Math.floor(Math.random() * frames.length)];

    // remove loading message
    await api.unsendMessage(loading.messageID);

    return api.sendMessage(
      {
        body: chosenFrame,
        attachment: fs.existsSync(gifPath)
          ? fs.createReadStream(gifPath)
          : null
      },
      threadID,
      messageID
    );
  }
};

module.exports.run = async () => {};
