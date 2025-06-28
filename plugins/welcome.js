module.exports = async ({ sock, m, isGroup }) => {
  if (!isGroup) return;
  if (m.messageStubType === 27) {
    const user = m.messageStubParameters[0];
    await sock.sendMessage(m.key.remoteJid, { text: `Selamat datang @${user.split('@')[0]} 👋`, mentions: [user] });
  }
};
