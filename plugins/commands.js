const fs = require('fs');
const moment = require('moment');

module.exports = async ({ sock, m, isOwner }) => {
  const body = m.message?.conversation || '';
  const args = body.trim().split(' ');
  const cmd = args[0];

  if (!body.startsWith('.')) return;

  if (cmd === '.menu') {
    const menu = `
📋 *MENU BOT*
.antilink1 on/off
.antilink20 on/off
.antipromosi1 on/off
.antipromosi44 on/off
.welcome on/off
.open
.close
.open 20:00
.close 21:00
.tagall
.tagall2 Halo!
.kick @user
`.trim();
    sock.sendMessage(m.key.remoteJid, { text: menu }, { quoted: m });
  }

  if (cmd === '.sewa' && isOwner) {
    const [_, id, paket, hari] = args;
    if (!id || !paket || !hari) {
      return sock.sendMessage(m.key.remoteJid, { text: '❌ Format: .sewa id paket hari' });
    }

    const sewa = JSON.parse(fs.readFileSync('./sewa.json'));
    const expired = new Date(Date.now() + Number(hari) * 86400000);
    sewa.push({ id, paket, expired });
    fs.writeFileSync('./sewa.json', JSON.stringify(sewa, null, 2));
    sock.sendMessage(m.key.remoteJid, { text: `✅ Grup disewa sampai ${moment(expired).format('LLL')}` });
  }
};
