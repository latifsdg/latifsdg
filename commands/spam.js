const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

module.exports = {
  name: 'spam',
  async execute({ msg }) {
    const args = msg.body.split(' ').slice(1);
    const count = parseInt(args[0]) || 5;
    const textToSend = args.slice(1).join(' ') || 'Spam!';
    const media = getMedia();

    for (let i = 0; i < count; i++) {
      if (media) {
        await msg.reply(media, undefined, { caption: textToSend });
      } else {
        await msg.reply(textToSend);
      }
    }
  }
};
