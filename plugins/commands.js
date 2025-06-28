module.exports = async ({ sock, m, isOwner }) => {
  const msg = m.message?.conversation || '';
  if (!msg.startsWith('.menu')) return;

  if (!isOwner) return sock.sendMessage(m.key.remoteJid, { text: '❌ Hanya owner!' });

  const menu = `
*📋 MENU BOT:*
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
.tagall2
.kick @user
`.trim();

  sock.sendMessage(m.key.remoteJid, { text: menu }, { quoted: m });
};
