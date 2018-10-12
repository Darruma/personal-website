const app = require('./app');
const http = require('http');
const https = require('https');
const compression = require('compression')
const fs = require('fs');
const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8');
app.use(compression());
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});
httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});