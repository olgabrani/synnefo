import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  expanded: false,
  loading: false,
  classNameBindings: ['isTrash'],
  
  name: function(){
    var root = this.get('root');
    var res = root.split('/').pop();
    if (root == '/') { res = 'My folders';}
    if (root == 'shared') { res = 'Shared with me';}
    return res;
  }.property('root'),

  notLink: function(){
    /*  Do not show link if 
        - It is a user sharing objects
        - It is the root of the shared with me objects
        - It is the parent of containers ('/')
    */
    var b = this.get('root') === '/';
    var c = this.get('root') === 'shared';
    return this.get('is_user') || b || c;
  }.property('root', 'is_user'),

  is_container: function(){
    return (this.get('root').match(/\//g) || [] ).length == 1 ;
  }.property('root'),

  is_user: function(){
    return this.get('root').indexOf('\/accounts\/') == 0 && 
            this.get('root').replace('\/accounts\/', '').indexOf('/') === -1;
  }.property('root'),

  is_folder: function(){
    return !this.get('is_container') && !this.get('is_root');
  }.property('is_root', 'is_container'),

  isTrash: function(){
    return this.get('root') === 'trash' && this.get('is_container');  
  }.property('root'),

  iconCls: function(){
    var res = "fa-folder";
    if (this.get('expanded')) { res = "fa-folder-open";}
    if (this.get('isTrash')) { res = "fa-trash";}
    if (this.get('is_user')) { res = "fa-user";}
    if (this.get('root') === 'shared') { res = "fa-share-alt"}
    return res;
  }.property('isTrash', 'expanded', 'is_user', 'root'),

  textTemplateName: function(){
    var role = this.get('role');
    if (role) {
      return "components/dir-tree/name-"+role;
    }
    return "components/dir-tree/name";
  }.property('role'),

  container_id: function(){
    var parts = this.get('root').split('/');
    var account = parts.shift();
    var container_name = parts.shift();
    return account + '/' + container_name;
  }.property('root'),

  current_path: function(){
    var arr = this.get('root').split('/');
    arr.shift();
    arr.shift();
    return arr.join('/');
  }.property('root'),

  subdirs: function(){
    var self = this;
    if (!this.get('expanded')){
      return [];
    }
    var res = this.get('resolver')(this.get('root'));
    res.then(function(b){
      self.set('loading', false);
    });
    return res;
  }.property('root', 'expanded'),

  link: function(){
    let path = this.get('root').split('/');
    path.shift();
    return path.join('/');
  }.property('root'),
 
  actions: {

    toggle: function(){
      if (!(this.get('expanded'))) {
        this.set('loading', true);
      }
      this.toggleProperty('expanded');
    },

    select: function(root){
      var param = root || this.get('root');
      this.sendAction('action', param);
    },

    click: function(root) {
      this.sendAction('click', root, this);
    }
  },

});
