var _ = require('underscore');

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.json') || {});

// Server variable for generating JWT
module.exports.secret = 'b3e739d25115ad6c137fa990076857e39300b6d19deef477a9c4c6bce799fce1';