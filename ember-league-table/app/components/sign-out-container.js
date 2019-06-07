import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
    firebaseApp: service(),
    actions: {
        signOut() {
            this.firebaseApp.auth().then(auth =>
                auth.signOut()
            );
        }
    }
});
