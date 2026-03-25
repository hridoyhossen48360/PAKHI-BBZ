const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
	name: "info",
	version: "1.0.3",
	hasPermssion: 0,
	credits: "rX Abdullah",
	description: "Admin.",
	commandCategory: "Admin",
	cooldowns: 1
};

module.exports.run = async function({ api, event }) {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const currentTime = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");

	const message = 
`╔═══━━━─── • ───━━━═══╗
   👑 𝗢𝗪𝗡𝗘𝗥 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 👑
╚═══━━━─── • ───━━━═══╝

╭─❖ 𝗕𝗔𝗦𝗜𝗖 𝗜𝗡𝗙𝗢
│ ✦ 𝗡𝗮𝗺𝗲     : 𝗠𝗶𝘀𝘁𝘆 𝗕𝗯𝘇
│ ✦ 𝗔𝗴𝗲      : 𝟭𝟴
│ ✦ 𝗥𝗼𝗹𝗲     : 𝗔𝗱𝗺𝗶𝗻
╰───────────────❖

╭─❖ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧
│ 💬 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : 
│ https://m.me/61564643127325
╰───────────────❖

╭─❖ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦
│ ⏰ 𝗧𝗶𝗺𝗲     : ${currentTime}
│ ⚡ 𝗨𝗽𝘁𝗶𝗺𝗲  : ${hours}h ${minutes}m ${seconds}s
╰───────────────❖

╔═══━━━─── • ───━━━═══╗
  𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗺𝘆 𝗯𝗼𝘁 
╚═══━━━─── • ───━━━═══╝
;

	// লোকাল cache gif
	const cacheDir = path.join(__dirname, "cache");
	const cacheFile = path.join(cacheDir, "info.gif");

	try {
		// cache ফোল্ডার চেক
		if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

		// gif ফাইল নাই হলে error দিবে
		if (!fs.existsSync(cacheFile)) {
			return api.sendMessage("❌ info.gif ফাইল cache ফোল্ডারে পাওয়া যায়নি!", event.threadID);
		}

		// send gif + 10 sec unsend
		await api.sendMessage(
			{
				body: message,
				attachment: fs.createReadStream(cacheFile)
			},
			event.threadID,
			(err, info) => {
				if (!err) {
					setTimeout(() => {
						api.unsendMessage(info.messageID);
					}, 10000); // 10 sec পরে auto unsend
				}
			}
		);

	} catch (error) {
		console.error(error);
		api.sendMessage("❌ GIF পাঠানো ব্যর্থ হয়েছে।", event.threadID);
	}
};
