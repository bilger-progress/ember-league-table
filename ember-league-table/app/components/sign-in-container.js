import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
    firebaseApp: service(),
    email: '',
    password: '',
    errorMsg: '',
    actions: {
        signIn() {
            this.set('errorMsg', '');
            this.firebaseApp.auth().then(auth =>
                auth.signInWithEmailAndPassword(this.get('email'), this.get('password'))
                    .catch(error => {
                        this.set('errorMsg', error.message);
                    })
            );
        }
    }
});
