import http from 'http'

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Home');
        res.end()
    }
    if(req.url === '/log'){
        res.write(JSON.stringify('Logging'))
        res.end()
    }
})

server.listen(3000, () => {
    console.log('Server listening port 3000')
})