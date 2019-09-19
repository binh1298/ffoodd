const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({  });

const server = http.createServer(function(req, res) {
  if (req.url.startsWith('/core'))
    return proxy.web(req, res, { target: 'http://127.0.0.1:3001' });

  if (req.url.startsWith('/auth'))
    return proxy.web(req, res, { target: 'http://127.0.0.1:3002' });

  res.writeHead(404, { 'Content-type': 'application/json' });
  res.write(JSON.stringify({
    url: req.url,
    status: 404,
    message: 'NOT_FOUND'
  }));
  res.end();
});

server.listen(3000);