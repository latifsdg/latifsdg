const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

let visitors = new Set();

module.exports = {
  name: 'vv',
  async execute({ msg }) {
    visitors.add(msg.from);
    const media = getMedia();
    const text = `👥 Visiteurs uniques : ${visitors.size}`;
    if (media) {
      await msg.reply(media, undefined, { caption: text });
    } else {
      await msg.reply(text);
    }
  }
};
