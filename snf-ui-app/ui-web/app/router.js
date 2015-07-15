import Ember from 'ember';
import config from './config/environment';

var rootURL = null;
if (window.navigator.userAgent.match(/MSIE [6789]/)) {
  rootURL = '/' + config.baseURL + '/';
}

var Router = Ember.Router.extend({
  location: config.locationType
});

if (rootURL) {
  Router.reopen({
    rootURL: rootURL
  });
}

Router.map(function() {
  this.resource('index', {path: '/'});
  this.resource('containers');

  this.resource('account', {path: '/shared/accounts'}, function() {
    this.route('container', {path: '/:account'}, function() {
      this.route('objects', {path: '/:container_name/*path'});
      // *path wont match an initial url with no path set 
      this.route('objects_redirect', {path: '/:container_name'});
    });
  });

  this.resource('container', { path: '/containers/:container_name'}, function(){
    this.resource('objects', { path: '/*current_path'}, function(){
      this.resource('object', { overrideNameAssertion: true }, function(){
        this.route('versions');
      });
    });
  });
  this.resource('errors/404', {path: '*path'});
});

export default Router;
