export default {
  name: "menu",
  author: "حمودي سان",
  role: "member",
  description: "عرض قائمة تفاعلية بالأوامر",

  async execute({ api, event, args }) {
    const message = {
      body: "📌 اختر الأمر الذي تريد تنفيذه:",
      template: {
        type: "button",
        buttons: [
          { type: "postback", title: "💖 Love", payload: "love" },
          { type: "postback", title: "💋 Kiss", payload: "kiss" },
          { type: "postback", title: "🤗 Hug", payload: "hug" },
          { type: "postback", title: "👊 Slap", payload: "slap" },
          { type: "postback", title: "🔪 Kill", payload: "kill" },
          { type: "postback", title: "🕵️ Wanted", payload: "wanted" },
          { type: "postback", title: "💻 Hack", payload: "hack" },
          { type: "postback", title: "ℹ️ Bot Info", payload: "botinfo" }
        ]
      }
    };

    api.sendMessage(message, event.threadID);
  }
};
