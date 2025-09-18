const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

module.exports = {
  name: 'help',
  async execute({ msg }) {
    const media = getMedia();
    const text = `
📝 *Aide - Brazzers V1*
Voici toutes les commandes disponibles :
!menu, !info, !kickall, !promote, !demote, !spam, !antilink, !game, !dsmots, !vv
👑 Créateur : influenceur 
`;
    if (media) {
      await msg.reply(media, undefined, { caption: text });
    } else {
      await msg.reply(text);
    }
  }
};
