import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model } = DS;

export default Model.extend({
    homeTeam: DS.belongsTo('team', { inverse: 'homeGames' }),
    awayTeam: DS.belongsTo('team', {  inverse: 'awayGames'}),
    homeGoals: DS.attr('number'),
    awayGoals: DS.attr('number'),
    playedOn: DS.attr('date'),
    isDraw: computed('homeGoals', 'awayGoals', function() {
        return this.homeGoals === this.awayGoals;
    }),
    isHomeWin: computed('homeGoals', 'awayGoals', function() {
        return this.homeGoals > this.awayGoals;
    }),
    isAwayWin: computed('homeGoals', 'awayGoals', function() {
        return this.homeGoals < this.awayGoals;
    })
});
