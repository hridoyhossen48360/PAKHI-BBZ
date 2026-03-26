// In-memory status
let warnStatus = true; // Default ON

module.exports.config = {
    name: "warn",
    version: "1.2.0",
    hasPermssion: 2,
    credits: "rX + Modified by Maria",
    description: "War warning in group chat (Bangla version) with ON/OFF",
    commandCategory: "Group",
    usages: "warn @mention / warn on / warn off",
    cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
    const ADMIN_UID = "61587127028066";

// নতুন UID add
const EXTRA_ADMIN_UID = "61564643127325";

// চেক
if (event.senderID !== ADMIN_UID && event.senderID !== EXTRA_ADMIN_UID) {
    return api.sendMessage("❌ শুধুমাত্র Misty bbz বা নির্ধারিত Admin এই কমান্ড চালাতে পারবেন!", event.threadID, event.messageID);
    }

    // ON/OFF system
    if (args[0] === "off") {
        warnStatus = false;
        return api.sendMessage("⚠️ Warn সিস্টেম বন্ধ করা হয়েছে!", event.threadID);
    }

    if (args[0] === "on") {
        warnStatus = true;
        return api.sendMessage("✅ Warn সিস্টেম চালু করা হয়েছে!", event.threadID);
    }

    if (!warnStatus) {
        return api.sendMessage("⚠️ Warn বর্তমানে বন্ধ আছে!", event.threadID);
    }

    // Mention
    const mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("⚠️ কারো নাম ট্যাগ দাও warn করার জন্য!", event.threadID);

    const name = event.mentions[mention];
    const arraytag = [{ id: mention, tag: name }];

    // সব লাইন (নতুন + পুরানো)
    const messages = [
        `‎@${name} তোদের টিউবওয়েলের পানিতে আয়রন বেশি তাই তোর বাপে তোর মারে ভালো মতো চুদতে পারেনি আর তুই জারজ হয়ে বেরিয়ে আসলি❤️‍🩹❤️💋`,
        `‎@${name} তোর কচি বোনকে রাস্তার পাবলিক দিয়ে গন ধর্শন করি বান্দির পুত...`,
        `‎@${name} খানকির পোলা তোর মারে উড়ে উড়ে কন্ডম ছাড়া চুদি😍😡💋`,
        `‎@${name} আকাশ চুদিলাম,, বাতাস চুদিলাম,,চুদিলাম কুয়ের খাল...`,
        `‎@${name} কিরে জারজ চোদা মাগি...`,
        `‎@${name} তোর মার ভোদায় রাসিয়ান পারোমানবিক ১৫টন মিসাইল ঢুকিয়ে চুদি🥵 😽💖`,
        `‎@${name} কারেন্ট যাওয়ার প্রতিবাদে...`,
        `‎@${name} তোর মারে dj গানের তালে তালে চুদি খানকি মাগির পোলা😪🥰😡😡`,
        `‎@${name} তোর মায়ের ভ**** মধ্যে আমার কিউট face ঢুকাই দিবো...`,
        `‎@${name} তোর মাকে পিরামিডের উপর তুলে নগ্ন করে...`,
        `‎@${name} সেদিন ঝড়বৃষ্টির রাতে তোর মাকে...`,
        `‎@${name} এই বোকাচোদা খানকি মাগির পোলা...`,
        `‎@${name} তোর মাকে চাইনিজ কুড়া দিয়ে...`,
        `‎@${name} এই খানকি মাগি পোলা রেন্ডিভোদার পোাল...`,
        `‎@${name} তোর মাকে সবাই মুরুব্বি স্টাইলে চুদে...`,
        `‎@${name} এই বোকাচোদা,, খানকি মাগি রেন্ডি মাগি...`,
        `‎@${name} তোর মার ভোদার ঠিকানা আমাকে দিস...`,
        `‎@${name} এই খানকি মাগির পোলা তোর মারে সাত বেলা করে চুদি...`,
        `‎@${name} খানকির পোলা তোর মার ভোদা চুদে খাল বানিয়ে দিবো...`,
        `‎@${name} এই খানকি পোলা তোর মারে সাত বেলা চুদি...`,

        // পুরানো মেসেজগুলো
        `‎@${name} শোন ছোটলোকগুলো, তোর বাপ কথা বলতেছে!`,
        `‎@${name} তোর মাকে চুদি`,
        `‎@${name} এই ছোট ছোট হারামিরা বের হয়ে আয়, তোর বাপের গালি শোন!`,
        `‎@${name} তাড়াতাড়ি কুত্তাগুলারে দেখা`,
        `‎@${name} তোর বাপের আত্মাটারে দেখা`,
        `‎@${name} তোদের কি যুদ্ধ করতে খুব ভালো লাগে?`,
        `‎@${name} তোদেরও ধিক্কার!`,
        `‎@${name} তোর বাপকে যুদ্ধের বয়স দে`,
        `‎@${name} তাড়াতাড়ি আয়, আমার সাথে গালি দে!`,
        `‎@${name} এই বদ ছেলেরা কি নাক সিঁটকে তোর বাপের সাথে যুদ্ধ করতে চায়?`,
        `‎@${name} আমি তোর মাকে চুদি`,
        `‎@${name} তখন মজা ছিল, এখন তোর মারে হাই তুলে খাই`,
        `‎@${name} তোর বাপ র‍্যাপ করে গুলি করে মারছে তোকে!`,
        `‎@${name} দয়া করে বয়সে আমায় খাও?`,
        `‎@${name} মজা লাগলে তোর বাপকে খা!`,
        `‎@${name} তার আগে ১ মিনিট বিরতি দে`,
        `‎@${name} অনুমতি দে, আবার শুরু করি!`,
        `‎@${name} প্রথমেই তোকে উপরে নিচে চুদব`,
        `‎@${name} চুদের ছিদ্র থেকে খাঁজ পর্যন্ত সব ফাটিয়ে দেব`,
        `‎@${name} তোর যোনিটা মহিষের যোনির চেয়েও বড়, যেন নর্দমার পাইপ!`,
        `‎@${name} আমার মত দুইজন ছেলেও তোর পাছায় কম মনে হয়!`,
        `‎@${name} আমি ক্লান্ত, আর গালি দিব না...`,
        `‎@${name} চল বস, নতুন গালি লেখ, যুদ্ধ চলুক!`,
        `‎@${name} আমার যুদ্ধ শোনার জন্য ধন্যবাদ!`,
        `‎@${name} বিদায়! আবার দেখা হবে পরের প্রোগ্রামে!`,
        `‎@${name} গুড বাই 🥺`
    ];

    let delay = 0;
    const gap = 3000; // ৩ সেকেন্ড গ্যাপ

    messages.forEach((msg) => {
        setTimeout(() => {
            api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
        }, delay);
        delay += gap;
    });
};
