export default {
  name: "botinfo",
  author: "حمودي سان",
  role: "member",
  description: "يعرض معلومات عن البوت",

  async execute({ api, event, args }) {
    const message = `
🤖 معلومات البوت:
- المطور: حمودي سان
- نسخة البوت: 1.0.0
- الأوامر المتاحة: love, slap, kiss, hug, kill, wanted, hack, help, ping, avatar, botinfo
- رابط المطور: https://www.facebook.com/babasnfor80
    `;
    api.sendMessage(message, event.threadID);
  }
};
