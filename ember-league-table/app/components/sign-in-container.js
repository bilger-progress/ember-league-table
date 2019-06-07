import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
    firebaseApp: service(),
    actions: {
        signIn() {
            this.set('errorMsg', '');
            this.firebaseApp.auth().then(auth =>
                auth.signInWithEmailAndPassword(this.email, this.password)
                    .catch(error => {
                        this.set('errorMsg', error.message);
                    })
            );
        }
    },
    email: '',
    password: '',
    errorMsg: ''
});
