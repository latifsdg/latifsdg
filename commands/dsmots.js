const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

module.exports = {
  name: 'dsmots',
  async execute({ msg }) {
    const media = getMedia();
    const text = `🔤 Devine le mot : (à compléter selon ton jeu)`;
    if (media) {
      await msg.reply(media, undefined, { caption: text });
    } else {
      await msg.reply(text);
    }
  }
};
