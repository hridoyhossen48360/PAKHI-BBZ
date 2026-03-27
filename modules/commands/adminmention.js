const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "adminmention",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Hridoy",
  description: "Misty bbz mention করলে savage reply",
  commandCategory: "Admin",
  usages: "on/off/status",
  cooldowns: 5
};

// ===== FILE PATH =====
const filePath = path.join(__dirname, "adminmention.json");

// ===== LOAD DATA =====
function loadData() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ enable: true }, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath));
}

// ===== SAVE DATA =====
function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ===== SAVAGE REPLIES =====
const replies = [
  "এই এই! Misty bbz কে ডাকছোস কেন? চাকরি লাগবে নাকি? 🤨",
  "Misty bbz কে মেনশন? আগে আয়না দেখে আয় 😏",
  "Misty bbz ব্যস্ত, তোর মতো ফ্রি না 😎",
  "এই গ্রুপে হিরো একটাই — Misty bbz 😈",
  "Misty bbz কে ট্যাগ দিয়ে বিখ্যাত হইতে চাস? 🤣",
  "Misty bbz কে বিরক্ত করলে জরিমানা লাগবে 💸",
  "এই যে, Misty bbz কে ডাকলে কি চকলেট দিবি? 🍫",
  "Misty bbz কে ট্যাগ করে কি পাবি? seen ও পাবি না 😏",
  "Misty bbz বস, বসকে বিরক্ত করা মানা 🚫",
  "ট্যাগ দিয়ে হিরো হওয়ার চেষ্টা? ফেল 😆",
  "Misty bbz কে মেনশন = অটো ইগনোর 😎",
  "এই গ্রুপে তোর ভ্যালু ওয়াইফাই সিগনালের মতো 📶",
  "Misty bbz কে ট্যাগ করা মানে নিজের অপমান 😈",
  "Misty bbz কে বিরক্ত করলে ব্যান খাবি 😏",
  "এই ${name}, বেশি উড়িস না, Misty bbz আছে 👀",
  "Misty bbz কে মেনশন করে রিপ্লাই আশা করিস না 🤣",
  "বসকে বিরক্ত করলে শাস্তি আছে 😤",
  "Misty bbz কে ডাকতে হলে আগে অনুমতি নে 😎",
  "তোর মেনশন দেখে Misty bbz হাসতেছে 😂",
  "Misty bbz কে ট্যাগ? তোর আত্মবিশ্বাস দেখলে ভয় লাগে 😆",
  "Misty bbz কে বিরক্ত করার আগে ইনস্যুরেন্স করে আয় 🪦",
  "Misty bbz রাজা 👑, তুই ব্যাকগ্রাউন্ড এক্সট্রা 😏",
  "এই গ্রুপে Misty bbz ছাড়া কেউ গুরুত্বপূর্ণ না 😎",
  "Misty bbz কে মেনশন করে অ্যাটেনশন চাস? 🤡",
  "Misty bbz তোর ক্রাশ না যে ডাকবি 😈",
  "এই ${name}, বেশি লাফাস না 😤",
  "Misty bbz কে ট্যাগ করে রিপ্লাই চাই? স্বপ্ন দেখিস 😴",
  "Misty bbz কে বিরক্ত করলে মিউট খাবি 🔇",
  "Misty bbz কে মেনশন করে কি পাবি? হতাশা 🤣",
  "এই গ্রুপে Misty bbz ফাইনাল বস 🎮",
  "Misty bbz কে ট্যাগ মানে রিস্ক নেওয়া 😏",
  "Misty bbz কে বিরক্ত করলে সিস্টেম ক্র্যাশ 😈",
  "এই ${name}, Misty bbz কে বিরক্ত করিস না 😎",
  "Misty bbz কে মেনশন = seen ইগনোর মোড অন 😆",
  "Misty bbz কে ট্যাগ দিয়ে ভাইরাল হবি নাকি? 🤣",
  "Misty bbz কে বিরক্ত করলে গ্রুপ থেকে গায়েব 💀",
  "Misty bbz কে মেনশন করলে ভাগ্য লাগবে 😏",
  "এই গ্রুপে Misty bbz গুগল 😎",
  "Misty bbz কে ট্যাগ করে উত্তর চাই? LOL 😂",
  "Misty bbz কে বিরক্ত করলে ব্লক খাবি 🚫",
  "এই ${name}, বেশি হিরো হইস না 😈",
  "Misty bbz কে মেনশন করে কুল হতে পারবি না 😆",
  "Misty bbz কে বিরক্ত করলে সরাসরি অ্যাকশন 😤",
  "Misty bbz কে ট্যাগ মানে ডেঞ্জার জোন ⚠️",
  "Misty bbz কে মেনশন করে সিন ক্রিয়েট করতেছিস? 🤡",
  "Misty bbz সার্ভার, তুই বাগ 🐛",
  "Misty bbz কে বিরক্ত করলে ফাইন লাগবে 😏",
  "এই ${name}, তোর মেনশন ইউজলেস 😎",
  "Misty bbz কে ট্যাগ করে সম্মান হারাচ্ছিস 🤣",
  "Misty bbz কে বিরক্ত করলে সাইলেন্ট ট্রিটমেন্ট 😴",
  "Misty bbz কে মেনশন করে অ্যাটেনশন পাবি না 😈"
];

// ===== HANDLE COMMAND =====
module.exports.run = async function ({ api, event, args }) {
  let data = loadData();

  if (!args[0]) {
    return api.sendMessage(
      "ব্যবহার:\nadminmention on\nadminmention off\nadminmention status",
      event.threadID,
      event.messageID
    );
  }

  const cmd = args[0].toLowerCase();

  if (cmd === "on") {
    data.enable = true;
    saveData(data);
    return api.sendMessage("✅ Admin Mention চালু হয়েছে!", event.threadID);
  }

  if (cmd === "off") {
    data.enable = false;
    saveData(data);
    return api.sendMessage("⛔ Admin Mention বন্ধ হয়েছে!", event.threadID);
  }

  if (cmd === "status") {
    return api.sendMessage(
      `📊 Status: ${data.enable ? "ON ✅" : "OFF ⛔"}`,
      event.threadID
    );
  }
};

// ===== HANDLE EVENT =====
module.exports.handleEvent = async function ({ api, event, Users }) {
  const data = loadData();
  if (!data.enable) return;

  if (!event.mentions) return;

  const mentionIDs = Object.keys(event.mentions);

  // 👉 এখানে Misty bbz এর UID বসাবি
  const adminUID = "61564643127325";

  if (mentionIDs.includes(adminUID)) {
    const name = await Users.getNameUser(event.senderID);
    const reply =
      replies[Math.floor(Math.random() * replies.length)].replace(
        "${name}",
        name
      );

    return api.sendMessage(reply, event.threadID, event.messageID);
  }
};
