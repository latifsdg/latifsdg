// ============================
// Brazzers V1 - Bot WhatsApp
// ============================

const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Créer le client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Quand le QR code est prêt
client.on('qr', (qr) => {
    console.log('📸 Scannez ce QR code avec WhatsApp :');
    qrcode.generate(qr, { small: true });
});

// Quand le client est prêt
client.on('ready', () => {
    console.log('✅ Bot Brazzers V1 connecté avec succès !');
});

// ============================
// Charger automatiquement les commandes
// ============================
const commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.name && command.execute) {
        commands.set(command.name.toLowerCase(), command);
        console.log(`✅ Commande chargée : ${command.name}`);
    }
}

// ============================
// Écouter les messages
// ============================
client.on('message', async (msg) => {
    const prefix = '!';
    if (!msg.body.startsWith(prefix)) return;

    const args = msg.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (!command) return;

    try {
        await command.execute({ client, msg, args });
    } catch (error) {
        console.error(error);
        msg.reply('⚠️ Une erreur est survenue en exécutant la commande.');
    }
});

// ============================
// Lancer le bot
// ============================
client.initialize();
