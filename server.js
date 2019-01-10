const app = require('./app');
const compression = require('compression')
const port = process.env.PORT || 3005
app.use(compression());
app.listen(port,function()
{
	console.log("Website running " + port);
});
