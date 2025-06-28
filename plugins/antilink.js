module.exports = async ({ sock, m, isGroup, meAdmin, paket }) => {
  if (!isGroup || !meAdmin) return;

  const msg = m.message?.conversation || '';
  const isLink = msg.includes('chat.whatsapp.com');

  const jid = m.key.remoteJid;
  const dbPath = './antilink.json';

  if (!require('fs').existsSync(dbPath)) require('fs').writeFileSync(dbPath, '[]');
  const db = JSON.parse(require('fs').readFileSync(dbPath));
  let data = db.find(x => x.id === jid);
  if (!data) {
    data = { id: jid, mode: 0 };
    db.push(data);
  }

  if (msg.startsWith('.antilink1')) {
    data.mode = msg.includes('on') ? 1 : 0;
    require('fs').writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return sock.sendMessage(jid, { text: `Antilink1 ${data.mode ? 'ON' : 'OFF'}` }, { quoted: m });
  }

  if (msg.startsWith('.antilink20')) {
    data.mode = msg.includes('on') ? 2 : 0;
    require('fs').writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return sock.sendMessage(jid, { text: `Antilink20 ${data.mode ? 'ON' : 'OFF'}` }, { quoted: m });
  }

  if (isLink && data.mode === 1) {
    await sock.sendMessage(jid, { delete: m.key });
  }

  if (isLink && data.mode === 2) {
    await sock.sendMessage(jid, { delete: m.key });
    await sock.groupParticipantsUpdate(jid, [m.key.participant], 'remove');
  }
};
