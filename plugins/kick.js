module.exports = async ({ sock, m, isGroup, meAdmin }) => {
  const text = m.message?.conversation || '';
  if (!isGroup || !meAdmin || !text.startsWith('.kick')) return;

  const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (mentioned.length > 0) {
    await sock.groupParticipantsUpdate(m.key.remoteJid, mentioned, 'remove');
  }
};
