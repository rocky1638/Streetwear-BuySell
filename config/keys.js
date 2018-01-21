if (process.env.NODE_ENV === 'production') {
  // we are in prod mode
  module.exports = require('./prod');
} else {
  // we are in dev mode
  module.exports = require('./dev');
}
