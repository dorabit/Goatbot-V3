import fs from "fs-extra";
import jimp from "jimp";

export default {
  name: "avatar",
  author: "حمودي سان",
  role: "member",
  description: "عرض صورة الشخص الممنشن",

  async execute({ api, event, args }) {
    const mention = Object.keys(event.mentions);
    if (!mention.length) {
      api.sendMessage("🔖 | قم بعمل منشن أولاً 🐸", event.threadID);
      return;
    }

    try {
      const userId = mention[0];
      const avatar = await jimp.read(`https://graph.facebook.com/${userId}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
      const output = "avatar.jpg";
      await avatar.writeAsync(output);

      api.sendMessage({ attachment: fs.createReadStream(output) }, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage("حدث خطأ أثناء جلب الصورة ❌", event.threadID);
    }
  }
};
