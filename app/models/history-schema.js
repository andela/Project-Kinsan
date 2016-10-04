var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema ({
  gameId : String,
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  completed: Boolean,
  winner: {
    type:  Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('History', HistorySchema);
