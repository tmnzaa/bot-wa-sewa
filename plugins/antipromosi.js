module.exports = async ({ sock, m, isGroup, meAdmin }) => {
  if (!isGroup || !meAdmin) return;

  const msg = m.message?.conversation || '';
  const jid = m.key.remoteJid;

  const dbPath = './antipromosi.json';
  if (!require('fs').existsSync(dbPath)) require('fs').writeFileSync(dbPath, '[]');
  const db = JSON.parse(require('fs').readFileSync(dbPath));
  let data = db.find(x => x.id === jid);
  if (!data) {
    data = { id: jid, mode: 0 };
    db.push(data);
  }

  if (msg.startsWith('.antipromosi1')) {
    data.mode = msg.includes('on') ? 1 : 0;
    require('fs').writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return sock.sendMessage(jid, { text: `Antipromosi1 ${data.mode ? 'ON' : 'OFF'}` }, { quoted: m });
  }

  if (msg.startsWith('.antipromosi44')) {
    data.mode = msg.includes('on') ? 2 : 0;
    require('fs').writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return sock.sendMessage(jid, { text: `Antipromosi44 ${data.mode ? 'ON' : 'OFF'}` }, { quoted: m });
  }

  const promosiKata = ['jual', 'dijual', 'promosi', 'diskon', 'harga'];
  const promosi = promosiKata.some(kata => msg.toLowerCase().includes(kata));

  if (promosi && data.mode === 1) {
    await sock.sendMessage(jid, { delete: m.key });
  }

  if (promosi && data.mode === 2) {
    await sock.sendMessage(jid, { delete: m.key });
    await sock.groupParticipantsUpdate(jid, [m.key.participant], 'remove');
  }
};
