module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    credits: "rX",
    hasPermssion: 1,
    description: "Turn off antiout",
    usages: "antiout on/off",
    commandCategory: "Group",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
    return api.sendMessage(`🎀 <\n ${(data["antiout"] == true) ? "𝐭𝐮𝐫𝐧 𝐨𝐧" : "𝐓𝐮𝐫𝐧 𝐨𝐟𝐟"} 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 𝐛𝐚𝐛𝐲`, event.threadID);

}
