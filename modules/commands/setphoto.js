const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "setphoto",
  version: "1.0.0",
  hasPermssion: 2, // শুধুমাত্র admin বা owner চালাতে পারবে (0 দিলে সবাই পারবে)
  credits: "rX Abdullah",
  description: "Bot-এর প্রোফাইল ছবি পরিবর্তন করুন একটি ছবির রিপ্লাই বা অ্যাটাচমেন্ট দিয়ে",
  commandCategory: "System",
  usages: "Reply a photo with !set photo",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const message = event.body ? event.body.toLowerCase() : "";
    const isSetPhotoCmd = message.includes("!set photo");

    if (!isSetPhotoCmd) return;

    // চেক করুন অ্যাটাচমেন্ট বা রিপ্লাই আছে কিনা
    let photoAttachment = null;
    if (event.attachments && event.attachments.length) {
      photoAttachment = event.attachments.find(a => a.type === "photo" || a.type === "image");
    }

    if (!photoAttachment && event.messageReply && event.messageReply.attachments) {
      photoAttachment = event.messageReply.attachments.find(a => a.type === "photo" || a.type === "image");
    }

    if (!photoAttachment) {
      return api.sendMessage(
        "> 🎀\n𝐏𝐥𝐚𝐲 𝐰𝐢𝐭𝐡 𝐩𝐡𝐨𝐭𝐨",
        event.threadID,
        event.messageID
      );
    }

    const imageUrl = photoAttachment.url || photoAttachment.previewUrl;
    if (!imageUrl) {
      return api.sendMessage("⚠️ ইমেজ লিঙ্ক পাওয়া যায়নি। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }

    const tmpFile = path.join(__dirname, `tmp_${Date.now()}.jpg`);
    const writer = fs.createWriteStream(tmpFile);

    api.sendMessage("🔄 ছবিটি ডাউনলোড করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...", event.threadID, event.messageID);

    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream"
    });

    response.data.pipe(writer);

    writer.on("finish", () => {
      const imgStream = fs.createReadStream(tmpFile);

      api.changeAvatar(imgStream, (err) => { // কিছু Mirai base-এ setUserImage বা changeAvatar নামে থাকে
        fs.unlinkSync(tmpFile); // টেম্প ফাইল মুছে দিন
        if (err) {
          console.error(err);
          return api.sendMessage("❌ প্রোফাইল ছবি পরিবর্তন ব্যর্থ হয়েছে!", event.threadID);
        }
        return api.sendMessage("> 🎀\n𝐎𝐤 𝐝𝐨𝐧𝐞 𝐛𝐚𝐛𝐲..!", event.threadID);
      });
    });

    writer.on("error", (err) => {
      console.error(err);
      api.sendMessage("> 🎀\n𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲 𝐬𝐨𝐦𝐞𝐭𝐡𝐢𝐧𝐠 𝐰𝐫𝐨𝐧𝐠!", event.threadID);
    });

  } catch (err) {
    console.error(err);
    api.sendMessage("⚠️ কোনো ত্রুটি ঘটেছে!", event.threadID);
  }
};
