import DS from 'ember-data';
import { union, filterBy } from '@ember/object/computed';

const { Model } = DS;

export default Model.extend({
    name: DS.attr('string'),
    homeGames: DS.hasMany('game', { inverse: 'homeTeam' }),
    awayGames: DS.hasMany('game', { inverse: 'awayTeam' }),
    playedGames: union('homeGames', 'awayGames'),
    drawnGames: filterBy('playedGames', 'isDraw')
});
