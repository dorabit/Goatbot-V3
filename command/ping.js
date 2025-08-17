export default {
  name: "ping",
  author: "حمودي سان",
  role: "member",
  description: "اختبار البوت",

  async execute({ api, event, args }) {
    const start = Date.now();
    api.sendMessage("🏓 جاري الاختبار...", event.threadID, async (err, info) => {
      const end = Date.now();
      api.sendMessage(`🏓 البوت يعمل! الاستجابة: ${end - start}ms`, event.threadID);
    });
  }
};
