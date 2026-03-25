module.exports.config = {
  name: "truefalse",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "rX Abdullah",
  description: "Random True/False or Sotti/Mitta reply",
  commandCategory: "Game",
  usages: "true or false / sotti mitta",
  cooldowns: 2,
  prefix: false
};

module.exports.handleEvent = async function({ api, event }) {
  const content = event.body?.toLowerCase();
  if (!content) return;

  // All supported trigger phrases
  const triggers = ["true or false", "!true or false", "sotti mitta", "!sotti naki mitta"];

  // Check if any trigger matches
  if (triggers.some(trigger => content.includes(trigger))) {
    const trueReplies = [
      "একদম সত্য কথা বললা রে ভাই 😌",
      "সত্যিই তো, তুই তো সত্যবাদী 🤝",
      "এইটা ১০০% সত্য 💯",
      "ভাই সত্যি কথা বললে শান্তি লাগে 😇",
      "সত্যি বলছি, মনের কথা কইলা 🤞"
    ];

    const falseReplies = [
      "মিথ্যা ধরা খাইছোস রে ভাই 😒",
      "তোর কথা শুনে হইল মিথ্যার হিমালয় 😑",
      "এইটা একদম বানোয়াট কথা 🤥",
      "মিথ্যা কথা বলিস কেন রে ভাই? 😂",
      "ভাই, মিথ্যার উপরেও মিথ্যা 🙄"
    ];

    const isTrue = Math.random() < 0.5;

    const reply = isTrue
      ? `${trueReplies[Math.floor(Math.random() * trueReplies.length)]}\n✅ True`
      : `${falseReplies[Math.floor(Math.random() * falseReplies.length)]}\n❌ False`;

    return api.sendMessage(reply, event.threadID, event.messageID);
  }
};

module.exports.run = async () => {};
