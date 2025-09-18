const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

function getMedia() {
  const mediaPath = path.join(__dirname, '..', 'media', 'menu.jpg');
  if (!fs.existsSync(mediaPath)) return null;
  return MessageMedia.fromFilePath(mediaPath);
}

module.exports = {
  name: 'kickall',
  async execute({ client, msg }) {
    const chat = await msg.getChat();
    if (!chat.isGroup) return msg.reply('⚠️ Cette commande est pour les groupes.');
    const admins = (await chat.participants).filter(p => p.isAdmin).map(p => p.id._serialized);
    if (!admins.includes(msg.author)) return msg.reply('⚠️ Seuls les admins peuvent utiliser cette commande.');

    for (let participant of chat.participants) {
      if (!participant.isAdmin) {
        await chat.removeParticipants([participant.id._serialized]);
      }
    }

    const media = getMedia();
    const text = `👢 Tous les membres non-admin ont été expulsés du groupe.`;
    if (media) {
      await msg.reply(media, undefined, { caption: text });
    } else {
      await msg.reply(text);
    }
  }
};
