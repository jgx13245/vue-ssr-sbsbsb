const Client = require('ssh2').Client
const client = new Client()

client.on('ready', () => {
  client.exec('cd /data/node-projects/activity-server && git pull && pm2 reload activity-server', (err, stream) => {
    if (err) throw err
    let result = ''
    stream.on('data', data => {
      result += data
    }).on('close', () => {
      console.log(result)
      client.end()
    })
  })
}).connect({
  host: '10.143.44.13',
  port: '22',
  username: 'root',
  password: 'D6j!tzk%XCz$'
})
