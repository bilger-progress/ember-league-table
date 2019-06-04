import DS from 'ember-data';
import { union, filterBy, sum, mapBy } from '@ember/object/computed';
import { computed } from '@ember/object';

const { Model } = DS;

export default Model.extend({
    name: DS.attr('string'),
    homeGames: DS.hasMany('game', { inverse: 'homeTeam' }),
    awayGames: DS.hasMany('game', { inverse: 'awayTeam' }),
    playedGames: union('homeGames', 'awayGames'),
    drawnGames: filterBy('playedGames', 'isDraw'),
    homeGamesWon: filterBy('homeGames', 'isHomeWin'),
    awayGamesWon: filterBy('awayGames', 'isAwayWin'),
    wonGames: union('homeGamesWon', 'awayGamesWon'),
    homeGamesLost: filterBy('homeGames', 'isAwayWin'),
    awayGamesLost: filterBy('awayGames', 'isHomeWin'),
    lostGames: union('homeGamesLost', 'awayGamesLost'),
    homeGoalsScoredArray: mapBy('homeGames', 'homeGoals'),
    homeGoalsScored: sum('homeGoalsScoredArray'),
    awayGoalsScoredArray: mapBy('awayGames', 'awayGoals'),
    awayGoalsScored: sum('awayGoalsScoredArray'),
    goalsScored: computed('homeGoalsScored', 'awayGoalsScored', function(){
        return this.homeGoalsScored + this.awayGoalsScored;
    }),
    homeGoalsConcededArray: mapBy('homeGames', 'awayGoals'),
    homeGoalsConceded: sum('homeGoalsConcededArray'),
    awayGoalsConcededArray: mapBy('awayGames', 'homeGoals'),
    awayGoalsConceded: sum('awayGoalsConcededArray'),
    goalsConceded: computed('homeGoalsConceded', 'awayGoalsConceded', function(){
        return this.homeGoalsConceded + this.awayGoalsConceded;
    }),
    goalsDifference: computed('goalsScored', 'goalsConceded', function() {
        return this.goalsScored - this.goalsConceded;
    }),
    points: computed('wonGames.lenth', 'drawnGames.length', function() {
        return (this.wonGames.length * 3) + this.drawnGames.length;
    })
});
