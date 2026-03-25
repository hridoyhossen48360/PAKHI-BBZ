const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "prefix",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "Rx",
  description: "Show bot prefix info without using any prefix",
  commandCategory: "System",
  usages: "",
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  if (body.toLowerCase().trim() === "prefix") {
    const ping = Date.now() - event.timestamp;
    const day = moment.tz("Asia/Dhaka").format("dddd");

    const BOTPREFIX = global.config.PREFIX || "!";
    const GROUPPREFIX = global.data.threadData?.[threadID]?.prefix || BOTPREFIX;
    const BOTNAME = global.config.BOTNAME || "ʀx ᴄʜᴀᴛ ʙᴏᴛ";

    const frames = [
      `
🌟╔═༶• 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 •༶═╗🌟
🕒 Ping: ${ping}ms
📅 Day: ${day}
🤖 Bot Name: ${BOTNAME}
💠 Bot Prefix: ${BOTPREFIX}
💬 Group Prefix: ${GROUPPREFIX}
🌟╚═༶• 𝗘𝗻𝗱 𝗢𝗳 𝗦𝘁𝗮𝘁𝘂𝘀 •༶═╝🌟
`,
      `
╭━━•✧𝗣𝗥𝗘𝗙𝗜𝗫 𝗦𝗧𝗔𝗧𝗨𝗦✧•━━╮
│ ⏱ Ping: ${ping}ms
│ 📆 Day: ${day}
│ 🤖 Bot: ${BOTNAME}
│ 🔹 Bot Prefix: ${BOTPREFIX}
│ 🔹 Group Prefix: ${GROUPPREFIX}
╰━━━━━━━━━━━━━━━╯
`,
      `
┏━༺ 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 ༻━┓
┃ 🕒 Ping: ${ping}ms
┃ 📅 Day: ${day}
┃ 🤖 Bot Name: ${BOTNAME}
┃ 💠 Bot Prefix: ${BOTPREFIX}
┃ 💬 Group Prefix: ${GROUPPREFIX}
┗━━━━━━━━━━━━━━━━━┛
`,
      `
▸▸▸ 𝗣𝗥𝗘𝗙𝗜𝗫 𝗦𝗧𝗔𝗧𝗨𝗦 ◂◂◂
  Ping: ${ping}ms
  Day: ${day}
  Bot Name: ${BOTNAME}
  Bot Prefix: ${BOTPREFIX}
  Group Prefix: ${GROUPPREFIX}
`
    ];

    // ===============================
    // 💠 RANDOM GIF SELECTION
    // ===============================
    const gifList = [
      "abdullah2.gif",
      "abdullah1.gif",
      "abdullah3.gif"
    ];

    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    const gifPath = path.join(__dirname, "noprefix", randomGif);

    const chosenFrame = frames[Math.floor(Math.random() * frames.length)];

    return api.sendMessage(
      {
        body: chosenFrame,
        attachment: fs.createReadStream(gifPath)
      },
      threadID,
      messageID
    );
  }
};

module.exports.run = async () => {};
