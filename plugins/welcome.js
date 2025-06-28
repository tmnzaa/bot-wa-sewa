module.exports = async ({ sock, m, isGroup }) => {
  if (!isGroup) return;

  const msg = m.message?.conversation || '';
  const jid = m.key.remoteJid;

  const dbPath = './welcome.json';
  if (!require('fs').existsSync(dbPath)) require('fs').writeFileSync(dbPath, '[]');
  const db = JSON.parse(require('fs').readFileSync(dbPath));
  let data = db.find(x => x.id === jid);
  if (!data) {
    data = { id: jid, on: false };
    db.push(data);
  }

  if (msg.startsWith('.welcome')) {
    data.on = msg.includes('on');
    require('fs').writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return sock.sendMessage(jid, { text: `Welcome ${data.on ? 'ON' : 'OFF'}` }, { quoted: m });
  }
};
