var mongoose = require('mongoose'),
  History = mongoose.model('History');

exports.userHistory = function (req, res) {
  History.find({players: req.params.id})
  .populate('players', 'name')
  .populate('winner', 'name') 
  .exec(function (err, history) { 
    if (err) {
      res.json(err);
    }
    res.json(history);
  });
};

exports.saveGameHistory = function (req, res) {
  History.findOne({gameId: req.body.gameId}, function (err, history) {
    if (!history) {
      History.create(req.body, function (err, history) {
        if(err){
          res.json(err);
        }
        res.json(history);
      });
    } else{
      res.json({
        message: 'history already exists'
      });
    }
  });
};

exports.deleteHistory = function (req, res) {
  History.remove({gameId: req.params.id}, function (err) {
    if (err) {
      res.json(err);
    }
    res.json({
      message: 'history deleted'
    });
  });
};