if (process.env.NODE_ENV == 'production') {
  module.exports = JSON.stringify(require('./awsconfigprod.js'));
} else {
  module.exports = require('./awsconfig.json');
}
