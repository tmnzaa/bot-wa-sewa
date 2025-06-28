module.exports = async ({ sock, m, isGroup, meAdmin, isOwner }) => {
  if (!isGroup || !meAdmin || !isOwner) return;

  const msg = m.message?.conversation || '';
  if (!msg.startsWith('.kick')) return;

  const mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
  if (!mentions || mentions.length === 0) return sock.sendMessage(m.key.remoteJid, { text: 'Tag user dulu!' });

  for (let id of mentions) {
    await sock.groupParticipantsUpdate(m.key.remoteJid, [id], 'remove');
  }
};
