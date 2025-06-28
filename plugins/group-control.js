const moment = require('moment');

module.exports = async ({ sock, m, isGroup, meAdmin }) => {
  const text = m.message?.conversation || '';
  if (!isGroup || !meAdmin) return;

  if (text === '.open') {
    await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement');
  }

  if (text === '.close') {
    await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
  }

  if (text.startsWith('.open ') || text.startsWith('.close ')) {
    const [cmd, jam] = text.split(' ');
    const now = moment().format('HH:mm');

    if (now === jam) {
      if (cmd === '.open') {
        await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement');
      } else {
        await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
      }
    }
  }
};
