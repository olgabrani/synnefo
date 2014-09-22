import Ember from 'ember';

var Router = Ember.Router.extend({
  location: NewUiENV.locationType
});

Router.map(function() {
  this.route('foo');
  this.route('bar');
});

export default Router;
