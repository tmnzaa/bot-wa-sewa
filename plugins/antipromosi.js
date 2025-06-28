module.exports = async ({ sock, m, isGroup, meAdmin, paket }) => {
  const text = m.message?.conversation || '';
  if (!isGroup || !meAdmin || !paket) return;

  if (text.match(/(promosi|beli|jual|top up|akun|dm|follow)/gi)) {
    if (paket === 'pro') {
      await sock.groupParticipantsUpdate(m.key.remoteJid, [m.key.participant], 'remove');
    } else {
      await sock.sendMessage(m.key.remoteJid, { delete: m.key });
    }
  }
};
