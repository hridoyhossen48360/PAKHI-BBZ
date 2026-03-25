const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "owner",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "rX Abdullah", //don't change my credit 
    description: "Show Owner Info",
    commandCategory: "Admin",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌸 𝗣𝗔𝗞𝗛𝗜 𝗜𝗡𝗙𝗢 🌸      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞  : 𝐏𝐚𝐤𝐡𝐢
┃ 🚺 𝐆𝐞𝐧𝐝𝐞𝐫  : 𝐅𝐞𝐦𝐚𝐥𝐞
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝐒𝐩𝐞𝐜𝐢𝐚𝐥 💖
┃ 🎂 𝐀𝐠𝐞      : 16+
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐬𝐥𝐚𝐦
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝐒𝐜𝐡𝐨𝐨𝐥 𝐒𝐭𝐮𝐝𝐞𝐧𝐭
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : 𝐧𝐨𝐭 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞
┃ 📢 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 : 𝐩𝐫𝐢𝐯𝐚𝐭𝐞
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : 𝐩𝐫𝐢𝐯𝐚𝐭𝐞
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞: ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
  
    return request(encodeURI(`https://i.ibb.co/hvYXKkx/image0.jpg`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};
