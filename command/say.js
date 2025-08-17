export default {
  name: "say",
  author: "حمودي سان",
  role: "member",
  description: "يجعل البوت يكرر كلامك",

  async execute({ api, event, args }) {
    if (!args.length) {
      api.sendMessage("🔖 | اكتب شيء ليقوله البوت 🐸", event.threadID);
      return;
    }

    const text = args.join(" ");
    api.sendMessage(text, event.threadID);
  }
};
