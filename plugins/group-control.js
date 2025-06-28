const schedule = require('node-schedule');

module.exports = async ({ sock, m, isGroup, meAdmin }) => {
  if (!isGroup || !meAdmin) return;
  const msg = m.message?.conversation || '';

  const jid = m.key.remoteJid;

  if (msg.startsWith('.open ')) {
    const jam = msg.split(' ')[1];
    schedule.scheduleJob(jam + ':00', () => {
      sock.groupSettingUpdate(jid, 'not_announcement');
      sock.sendMessage(jid, { text: `Grup dibuka otomatis jam ${jam}` });
    });
    return sock.sendMessage(jid, { text: `Akan buka jam ${jam}` }, { quoted: m });
  }

  if (msg.startsWith('.close ')) {
    const jam = msg.split(' ')[1];
    schedule.scheduleJob(jam + ':00', () => {
      sock.groupSettingUpdate(jid, 'announcement');
      sock.sendMessage(jid, { text: `Grup ditutup otomatis jam ${jam}` });
    });
    return sock.sendMessage(jid, { text: `Akan tutup jam ${jam}` }, { quoted: m });
  }

  if (msg === '.open') {
    sock.groupSettingUpdate(jid, 'not_announcement');
    return sock.sendMessage(jid, { text: 'Grup dibuka' });
  }

  if (msg === '.close') {
    sock.groupSettingUpdate(jid, 'announcement');
    return sock.sendMessage(jid, { text: 'Grup ditutup' });
  }
};
