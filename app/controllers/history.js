var mongoose = require('mongoose'),
  History = mongoose.model('History');

exports.userHistory = function (req, res) {
  History.find({players: req.params.id})
  .populate('players', 'name')
  .populate('winner', 'name') // history.player.name
  .exec(function (err, history) { //try another .populate for winner
    if (err) {
      res.json(err);
    }
    res.json(history);
  });
};

exports.saveGameHistory = function (req, res) {
  History.findOne({gameId: req.body.gameId}, function (err, history) {
    if (history) {
      res.json(history);
    }
    else{
      History.create(req.body, function (err, history) {
        if(err){
          res.json(err);
        }
        res.json(history);
      });
    }
  });
};
