require('dotenv').config();
let SftpClient = require('ssh2-sftp-client');

const config = {
  host: process.env.SFTP_SERVER,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASSWORD,
  port: process.env.SFTP_PORT || 22
};

let remotePath = process.env.SFTP_URL;


async function main() {
  const client = new SftpClient('ci-cd');
  const src = `${__dirname}${process.env.LOCAL_PATH}`;


  try {
    await client.connect(config);
    client.on('upload', info => {
      console.log(`Listener: Uploaded ${info.source}`);
    });
    let rslt = await client.uploadDir(src, remotePath);
    return rslt;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}

main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });
