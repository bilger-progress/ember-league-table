import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-in', { path: '/signIn' });
  this.route('dashboard', { path: '/dashboard' });
  this.route('missing-route', { path: '/*path' });
});

export default Router;
