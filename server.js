const express = require('express');
const projects = require('./routes/projects');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
require('dotenv').config()
console.log("app Running")
app.enable('trust proxy');

app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.secret, resave: false, saveUninitialized: true }));

app.get('/arch.sh',(req,res) =>
{
	res.sendFile(path.join(__dirname,'arch.sh'))
})
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use(
	'/demo',
	express.static(path.join(__dirname, '/demo'), {
		extensions: ['html', 'htm']
	})
);
app.use('/api', projects);
app.use('*', (req, res) => {
	res.sendFile(path.resolve( 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT,()=>
{
	console.log("listening")
})