module.exports.config = {
  name: "setmoney",
  version: "0.0.1",
  hasPermssion: 2,
  credits: "Hridoy",
  description: "নিজের বা ট্যাগ করা ব্যক্তির টাকা পরিবর্তন করুন",
  commandCategory: "Game",
  usages: "< me/tag >",
  cooldowns: 5,
  info: [
    {
      key: 'Tag',
      prompt: 'ফাঁকা রাখুন অথবা কারো ট্যাগ দিন, একাধিক ট্যাগ সম্ভব',
      type: 'Text',
      example: '@Mirai-chan'
    }
  ]
};

module.exports.run = async function({ api, event, args, Currencies, utils, Users }) {
  var mention = Object.keys(event.mentions)[0];
  var prefix = ";";
  var { body } = event;
  var content = body.slice(prefix.length + 9, body.length);
  var sender = content.slice(0, content.lastIndexOf(" "));
  var moneySet = content.substring(content.lastIndexOf(" ") + 1);

  if (args[0] == 'me') {
    return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → আপনার ব্যালেন্সে ${moneySet} টাকা যোগ করা হয়েছে`, 
      event.threadID, 
      () => Currencies.increaseMoney(event.senderID, parseInt(moneySet)), 
      event.messageID
    );
  }
  else if (args[0] == "del") {
    if (args[1] == 'me') {
      var s = event.senderID;
      const moneyme = (await Currencies.getData(event.senderID)).money;
      api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → আপনার সমস্ত টাকা মুছে ফেলা হয়েছে\n💸মুছে ফেলা টাকার পরিমাণ: ${moneyme}`, 
        event.threadID, 
        async () => await Currencies.decreaseMoney(event.senderID, parseInt(moneyme))
      );
    } 
    else if (Object.keys(event.mentions).length == 1) {
      var mention = Object.keys(event.mentions)[0];
      const moneydel = (await Currencies.getData(mention)).money;
      api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → ${event.mentions[mention].replace("@","")} এর সমস্ত টাকা মুছে ফেলা হয়েছে\n💸মুছে ফেলা টাকার পরিমাণ: ${moneydel}`, 
        event.threadID, 
        async () => await Currencies.decreaseMoney(mention, parseInt(moneydel))
      );
    }
    else return api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → ভুল কমান্ড ফরম্যাট", event.threadID, event.messageID);
  }
  else if (Object.keys(event.mentions).length == 1) {
    return api.sendMessage({
      body: `[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → ${event.mentions[mention].replace("@","")} এর ব্যালেন্সে ${moneySet} টাকা যোগ করা হয়েছে`,
      mentions: [{
        tag: event.mentions[mention].replace("@",""),
        id: mention
      }]
    }, event.threadID, async () => Currencies.increaseMoney(mention, parseInt(moneySet)), event.messageID);
  }
  else if(args[0] == "uid") {
    var id = args[1];
    var cut = args[2];
    let nameeee = (await Users.getData(id)).name;
    return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → ${nameeee} এর ব্যালেন্সে ${cut} টাকা যোগ করা হয়েছে`, 
      event.threadID, 
      () => Currencies.increaseMoney(id, parseInt(cut)), 
      event.messageID
    );
  }
  else {
    api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → ভুল কমান্ড ফরম্যাট", event.threadID, event.messageID);
  }
};
