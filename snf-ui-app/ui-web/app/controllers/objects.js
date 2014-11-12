import Ember from 'ember';
import SnfDropletController from '../lib/droplet';

export default Ember.ArrayController.extend(SnfDropletController, {
  itemController: 'object',

  hasUpPath: function(){
    return this.get('current_path') !== '/';
  }.property('current_path'),

  upPath: function(){
    var arr =  this.get('current_path').split('/');
    arr.pop();
    return arr.join('/');
  }.property('current_path'),

  dropletUrl: function(){
    var url =  this.get('settings').get('storage_host')+'/'+this.get('container_id')+'/';
    if (this.get('current_path') !== '/') {
      url = url + this.get('current_path')+ '/';
    }
    return url;
  }.property('current_path'),

  dropletHeaders: function(){
    return {'X-Auth-Token': this.get('settings').get('token'),
              'X-Requested-With': 'XMLHttpRequest'};
  }.property(),

  objectsCount: function(){
    return this.get('length');
  }.property('@each'),

  copyFlag: false,
 
  actions: {
    createDir: function(){
      var that = this;
      var dir_name = this.get('newDir');
      
      if (!dir_name) { return false; }
      if (!dir_name.trim()) { return; }
      
      var name = dir_name;

      var temp = [];
      temp.push(this.get('container_id'));

      if (this.get('hasUpPath')) {
        temp.push(this.get('current_path'));
      }
      temp.push(name);
      var id = temp.join('/');
      
      var object = this.store.createRecord('object', {
        id: id, 
        name: name,
        content_type: 'application/directory',
      });

      var onsuccess = function(object) {
        that.send('refreshRoute');
      };
      
      var onfail = function(reason){
        console.log(reason);
      };

      object.save().then(onsuccess, onfail);
    },

    newObj: false,

    pasteObject: function(){
      if (!this.get('toPasteObject')){
        console.log('Nothing has been cut or copied');
        return false;
      }
      var object = this.get('toPasteObject');
      var old_path = '/'+object.get('id');
      var current_path = (this.get('current_path') === '/')? '/': '/'+this.get('current_path')+'/';
      var new_id = this.get('container_id')+current_path+object.get('stripped_name');
      var that = this;
      var copy_flag = this.get('copyFlag');
    

      // If the object exists aready in the copy destination folder, 
      // show a dialog that asks the user if he wants to overwrite the 
      // existing object (thus creating a new version of this object)
      // or if he wants to create a copy of the object
      if ( (object.get('id') === new_id ) && copy_flag ) {
        var objects = [];
        objects.addObject(object);
        // 'objects' controller requires an array of models
        this.send('showDialog', 'paste', this , objects);
        return;
      } 
      this.send('_resumePaste', object, old_path, new_id, copy_flag);
    },
  
    // restarts object paste
    _resumePaste: function(object, old_path, new_id, copy_flag){
      var that = this;
      this.store.moveObject(object, old_path, new_id, copy_flag).then(function(){
        that.send('refreshRoute');
      });
      this.set('toPasteObject', null);
      this.set('copyFlag', false);


    },

    // continues pasting by calling _resumePaste method
    pasteVersion: function(object) {
      var old_path = '/'+object.get('id');
      var current_path = (this.get('current_path') === '/')? '/': '/'+this.get('current_path')+'/';
      var new_id = this.get('container_id')+current_path+object.get('stripped_name');
 
      this.send('_resumePaste', object, old_path, new_id, true);
    },

    // before pasting it will call _objNewCopyId to rename the object
    pasteCopy: function(object) {
      this.send('_objNewCopyId', object, object.get('id'));
    },
     
     // if the object_id already exists, then it is renamed to 
     // <old-name>.<extension> to <old-name>-copy.<extension>
    _objNewCopyId: function(object, object_id){
      var exists = this.store.hasRecordForId('object', object_id );
      if (exists) {
        var temp = object_id.split('.');
        var extension = null;
        if (temp.length>1 ) {
          extension = '.'+ temp.pop();
        }
        object_id = temp.join('.')+'-copy';
        if (extension) {
          object_id = object_id + extension;
        }
        this.send('_objNewCopyId', object, object_id);
      } else {
        this.send('_resumePaste', object, '/'+object.get('id'), object_id, true);
      }
    },

    refresh: function(){
      this.send('refreshRoute');
    }
  }

});
