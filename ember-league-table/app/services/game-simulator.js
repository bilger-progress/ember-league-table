import Service from '@ember/service';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import { shuffle } from 'ember-composable-helpers/helpers/shuffle';
import { computed } from '@ember/object';

const DELAY_BETWEEN_GAMES = 1000;

export default Service.extend({
    store: inject(),
    teams: computed(function() {
        return this.store.peekAll('team');
    }),
    games: computed(function() {
        return this.store.peekAll('game');
    }),
    init() {
        this._super(...arguments);
        this.seedTeams();
        later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
    },
    seedTeams() {
        const teamNames = [
            'Manchester United',
            'Chelsea',
            'Barca',
            'Manchester City',
            'Liverpool',
            'PSV Eindhoven',
            'Ajax',
            'Ludogorec',
            'Levski Sofia',
            'Arsenal',
            'Cardiff City'
        ];
        teamNames.forEach((item, index) => {
            this.store.createRecord('team', { id: index, name: item });
        });
    },
    simulateGame() {
        const teams = this.store.peekAll('team');
        const shuffledTeams = shuffle(teams);
        const homeTeam = shuffledTeams[0];
        const awayTeam = shuffledTeams[1];
        const homeGoals = this.randomScore(4);
        const awayGoals = this.randomScore(3);
        this.store.createRecord('game', {
            homeTeam,
            awayTeam,
            homeGoals,
            awayGoals,
            playedOn: new Date()
        });
        later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
    },
    randomScore(maximumGoals){
        return Math.round(Math.random() * maximumGoals);
    }
});
