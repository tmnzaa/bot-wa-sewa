module.exports = async ({ sock, m, isGroup, meAdmin }) => {
  if (!isGroup || !meAdmin) return;

  const msg = m.message?.conversation || '';
  const jid = m.key.remoteJid;

  if (msg.startsWith('.tagall')) {
    const metadata = await sock.groupMetadata(jid);
    const participants = metadata.participants.map(p => p.id);
    sock.sendMessage(jid, {
      text: '',
      mentions: participants
    });
  }

  if (msg.startsWith('.tagall2')) {
    const text = msg.replace('.tagall2', '').trim();
    const metadata = await sock.groupMetadata(jid);
    const participants = metadata.participants.map(p => p.id);
    sock.sendMessage(jid, {
      text: text,
      mentions: participants
    });
  }
};
