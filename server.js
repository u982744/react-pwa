var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const domain = 'localhost';
// const domain = '192.168.1.109';

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true
}).listen(3000, domain, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://' + domain + ':3000/');
});
