import Service from '@ember/service';
import { inject as service } from '@ember/service'

export default Service.extend({
    firebaseApp: service(),
    router: service(),
    init() {
        this._super(...arguments);
        this.firebaseApp.auth().then(auth => auth.onAuthStateChanged(user => {
            if (user) {
                // TODO: Store - set User.
                this.router.transitionTo('dashboard');
            } else {
                // TODO: Store - remove User.
                this.router.transitionTo('sign-in');
            }
        }));
    }
});
