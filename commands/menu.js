const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

module.exports = {
  name: 'menu',
  async execute({ msg }) {
    const media = getMedia();
    const text = `
🌟 *MENU - Brazzers V1* 🌟

🔥 !help - Aide
🔥 !info - Info bot
🔥 !kickall - Kick all (admin)
🔥 !promote - Promouvoir
🔥 !demote - Rétrograder
🔥 !spam - Spam
🔥 !antilink - Antilink
🔥 !game - Jeu
🔥 !dsmots - Devine le mot
🔥 !vv - Visiteurs uniques

👑 Créateur : Influenceur 
🤖 Bot : Brazzers V1
    `;
    if (media) {
      await msg.reply(media, undefined, { caption: text });
    } else {
      await msg.reply(text);
    }
  }
};
