import fs from "fs-extra";
import jimp from "jimp";

export default {
  name: "love",
  author: "حمودي سان",
  role: "member",
  description: "دمج صورة الشخص على قالب Love",

  async execute({ api, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) {
      api.sendMessage("🔖 | يجب أن تقوم بعمل منشن أولاً 🐸", event.threadID);
      return;
    }

    const userId = mention[0];

    try {
      const imagePath = await generateLove(userId);
      api.sendMessage({
        attachment: fs.createReadStream(imagePath)
      }, event.threadID);
    } catch (error) {
      console.error("Error while running love command:", error);
      api.sendMessage("حدث خطأ أثناء تنفيذ الأمر ❌", event.threadID);
    }
  }
};

async function generateLove(userId) {
  // تحميل صورة الشخص
  const avatar = await jimp.read(`https://graph.facebook.com/${userId}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);

  // تحميل قالب الحب
  const template = await jimp.read("https://i.imgur.com/0F6q9Oo.png"); // مثال قالب حب

  // قص الصورة بشكل دائري
  avatar.resize(200, 200);
  const mask = await new jimp(200, 200, 0xFFFFFFFF);
  mask.scan(0, 0, mask.bitmap.width, mask.bitmap.height, (x, y, idx) => {
    const radius = 100;
    const centerX = 100;
    const centerY = 100;
    const dx = x - centerX;
    const dy = y - centerY;
    if (dx * dx + dy * dy > radius * radius) {
      mask.bitmap.data[idx + 3] = 0; // الشفافية
    }
  });
  avatar.mask(mask, 0, 0);

  // دمج الصورة داخل القالب
  template.composite(avatar, 150, 100); // تعديل الإحداثيات حسب القالب

  const outputPath = "love_result.jpg";
  await template.writeAsync(outputPath);
  return outputPath;
}
