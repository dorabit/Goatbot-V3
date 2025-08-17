export default {
  name: "help",
  author: "حمودي سان",
  role: "member",
  description: "يعرض قائمة الأوامر والمعلومات عن البوت",

  async execute({ api, event, args }) {
    const commands = [
      "love",
      "slap",
      "kiss",
      "hug",
      "kill",
      "wanted",
      "hack",
      "help"
    ];

    const message = `
👋 مرحباً بك!
📌 قائمة أوامر البوت:

${commands.map(cmd => `- ${cmd}`).join("\n")}

💡 مطور البوت: حمودي سان
🔗 فيسبوك: https://www.facebook.com/babasnfor80
    `;

    api.sendMessage(message, event.threadID);
  }
};
