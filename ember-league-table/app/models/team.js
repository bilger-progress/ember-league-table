import DS from 'ember-data';
import { union, filterBy } from '@ember/object/computed';

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
    lostGames: union('homeGamesLost', 'awayGamesLost')
});
