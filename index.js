const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');
const { state, saveCreds } = useSingleFileAuthState('./session/session.json');
const config = require('./config.json');
const plugins = fs.readdirSync('./plugins').map(file => require(`./plugins/${file}`));

function getPaket(jid) {
  const sewa = JSON.parse(fs.readFileSync('./sewa.json'));
  const data = sewa.find(g => g.id === jid);
  if (!data || new Date(data.expired) < new Date()) return null;
  return data.paket;
}

async function start() {
  const sock = makeWASocket({ auth: state, printQRInTerminal: true });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection }) => {
    if (connection === 'open') console.log('✅ Bot aktif!');
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const from = m.key.remoteJid;
    const sender = (m.key.participant || m.key.remoteJid).split('@')[0];
    const isGroup = from.endsWith('@g.us');
    const isOwner = config.owner.includes(sender);
    let meAdmin = false;

    if (isGroup) {
      const metadata = await sock.groupMetadata(from);
      const me = metadata.participants.find(p => p.id.includes(sock.user.id));
      meAdmin = me?.admin !== null;
    }

    const paket = isGroup ? getPaket(from) : null;

    for (let plugin of plugins) {
      try {
        await plugin({ sock, m, isOwner, isGroup, meAdmin, paket });
      } catch (err) {
        console.error(err);
      }
    }
  });
}

start();
