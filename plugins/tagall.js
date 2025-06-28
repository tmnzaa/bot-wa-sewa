module.exports = async ({ sock, m, isGroup, meAdmin }) => {
  const text = m.message?.conversation || '';
  if (!isGroup || !meAdmin || !text.startsWith('.tagall')) return;

  const metadata = await sock.groupMetadata(m.key.remoteJid);
  const mention = metadata.participants.map(p => p.id);
  const pesan = text.split(' ').slice(1).join(' ') || '';

  await sock.sendMessage(m.key.remoteJid, {
    text: pesan,
    mentions: mention
  });
};
