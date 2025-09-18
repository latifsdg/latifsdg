const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

module.exports = {
  name: 'antilink',
  async execute({ msg }) {
    const chat = await msg.getChat();
    if (!chat.isGroup) return msg.reply('⚠️ Cette commande est pour les groupes.');

    const media = getMedia();
    const text = `🚫 Antilink activé. Tout lien sera supprimé automatiquement.`;
    if (media) {
      await msg.reply(media, undefined, { caption: text });
    } else {
      await msg.reply(text);
    }
  }
};
