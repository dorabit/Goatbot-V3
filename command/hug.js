import fs from "fs-extra";
import jimp from "jimp";

export default {
  name: "hug",
  author: "حمودي سان",
  role: "member",
  description: "دمج صورة الشخص على قالب Hug",

  async execute({ api, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) {
      api.sendMessage("🔖 | يجب أن تقوم بعمل منشن أولاً 🐸", event.threadID);
      return;
    }

    const userId = mention[0];

    try {
      const imagePath = await generateHug(userId);
      api.sendMessage({
        attachment: fs.createReadStream(imagePath)
      }, event.threadID);
    } catch (error) {
      console.error("Error while running hug command:", error);
      api.sendMessage("حدث خطأ أثناء تنفيذ الأمر ❌", event.threadID);
    }
  }
};

async function generateHug(userId) {
  const avatar = await jimp.read(`https://graph.facebook.com/${userId}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const template = await jimp.read("https://i.imgur.com/qgk0OCl.png"); // مثال قالب حضن

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
      mask.bitmap.data[idx + 3] = 0;
    }
  });
  avatar.mask(mask, 0, 0);

  template.composite(avatar, 150, 100); // تعديل الإحداثيات حسب القالب

  const outputPath = "hug_result.jpg";
  await template.writeAsync(outputPath);
  return outputPath;
}
