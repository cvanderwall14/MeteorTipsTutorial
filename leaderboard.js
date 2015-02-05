PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1} });
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId === selectedPlayer){
        return "selected"
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });
  
  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5}});
    },
    'click .removePlayer': function(evt) {
      PlayersList.remove(Session.get('selectedPlayer'));
    }
  });
  
  Template.addPlayerForm.events({
    'submit form': function(evt){
      evt.preventDefault();
      var playerNameVar = evt.target.playerName.value;
      PlayersList.insert({
        name: playerNameVar,
        score: 0
      });
    }
  });
  
}

if(Meteor.isServer){
  
}