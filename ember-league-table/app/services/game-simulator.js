import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({
    store: inject(),
    init() {
        this._super(...arguments);
        this.seedTeams();
    },
    seedTeams() {
        const teamNames = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'];
        teamNames.forEach((item, index) => {
            this.store.createRecord('team', { id: index, name: item });
        });
    }
});
