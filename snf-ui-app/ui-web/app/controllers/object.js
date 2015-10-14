import Ember from 'ember';

export default Ember.Controller.extend({
  itemType: 'object',
  object_view: true,
  needs: ['objects', 'application'],
  loading: false,

  closeDialog: false,

  container_id: Ember.computed.alias('parentController.container_id'),
  container_name: Ember.computed.alias('parentController.container_name'),
  groups: Ember.computed.alias('controllers.application.groups'),
  current_user: Ember.computed.alias('controllers.application.currentUser'),
  gridView: Ember.computed.alias('parentController.gridView'),
  listView: Ember.computed.alias('parentController.listView'),
  trash: Ember.computed.equal('container_name', 'trash'),
  read_only: Ember.computed.equal('model.allowed_to', 'read'),
  write_only: Ember.computed.equal('model.allowed_to', 'write'),
  mine: Ember.computed.alias('parentController.mine'),
  inherit_share: Ember.computed.alias('model.shared_ancestor_path'),
  account: Ember.computed.alias('parentController.account'),

  // Allowed actions
  // Actions that can be applied to multiple objects inherit their permissions
  // from parent controller
  canDelete: Ember.computed.alias('parentController.canDelete'),
  canMove: Ember.computed.alias('parentController.canMove'),
  canTrash: Ember.computed.alias('parentController.canTrash'),
  canRestore: Ember.computed.alias('parentController.canRestore'),
  canCopy: Ember.computed.alias('parentController.canCopy'),
  canUpload: Ember.computed.alias('parentController.canUpload'),
  canDownload: Ember.computed.bool('model.is_file'),

  // Object specific actions
  canRename: Ember.computed.alias('mine'),
  canShare: function(){
    return !this.get('trash') && this.get('mine');
  }.property('trash', 'mine'),

  canVersions: function(){
    return this.get('model.is_file') && !this.get('trash') && this.get('mine') && this.get('versioning');
  }.property('model.is_file', 'trash', 'mine', 'versioning'),

  canReplace: function(){
    return this.get('model.is_file') && this.get('write_only');
  }.property('model.is_file', 'write_only'),
  
  versioning: Ember.computed.alias('parentController.versioning'),

  handleSelect: function(selected) {
    this.set('model.isSelected', selected);
  },

  bindToSelectAll: function() {
    var context = this.get('selectAllContext') || this.parentController;
    if (context) {
      Ember.addListener(context, "selectAll", this, this.handleSelect);
    }
  }.on('init'),

  removeLoader: function() {
    this.set('loading', false);
  },

  bindToRemoveLoader: function() {
    var context = this.parentController;
    if(context) {
      Ember.addListener(context, "RemoveLoader", this, this.removeLoader);
    }
  }.on('init'),

  destroy: function() {
    this._super();
    var context = this.get('selectAllContext') || this.parentController;
    if (context) {
      Ember.removeListener(context, "selectAll", this, this.handleSelect);
    }
  }.on('destroy'),

  view_src: function(){
    var base_url = this.get('settings').get('storage_view_url');
    return base_url+'/'+this.get('model').get('id');
  }.property('model.id'),
  
  verb_for_action: function(){
    var action = this.get('actionToPerform');
    var dict = {
      'deleteObject': 'delete',
    };
    return dict[action];
  }.property('actionToPerform'),
  
  confirm_intro: function(){
    if (this.get('verb_for_action')) {
      var verb =  this.t('action_verb.'+this.get('verb_for_action'));
      var name = this.get('model.name');
      return this.t('overlay.confirm_simple.intro', 1, verb , 'object' , name);
    } 
  }.property('verb_for_action', 'model.name'),

  confirm_button: function(){
    if (this.get('verb_for_action')) {
      return this.t('button.'+this.get('verb_for_action'));
    }
  }.property('verb_form_action'),

  dirLinkRoute: function(){
    return this.get('parentController.objectRoute');
  }.property('parentController.objectRoute'),

  /*
  * Pithos API allows the name of objects to have at most 1024 chars.
  * When an object is renamed the length of the new name is checked
  */
  nameMaxLength: 1024,

  validInput: undefined,
  validationOnProgress: undefined,
  resetInput: undefined,

  newName: undefined,
  actionToExec: undefined,
  isUnique: undefined,
  oldPath: undefined,
  newID: undefined,
  isImg: function() {
    return this.get('model.type') === 'image';
  }.property('model.type'),

  checkUnique: function() {
    if(this.get('newName')) {
      var type = this.get('parentController').get('model').get('type');

      var object = this.get('model');
      var oldID = object.get('id');
      var stripped_name = this.get('newName');

      // oldPath will be used for X-Move-From Header
      var oldPath = '/'+ oldID;
      var temp = oldID.split('/');
      temp.pop();
      temp.push(stripped_name);
      var newID = temp.join('/');

      /*
      * hasRecordForId: Returns true if a record for a given type and ID
      * is already loaded.
      */
      var isUnique = !this.get('store').hasRecordForId(type, newID);

      this.set('newID', newID);
      this.set('oldPath', oldPath)
      this.set('isUnique', isUnique);
    }
  }.observes('newName'),


  renameObject: function(){
    if(this.get('validInput')) {
      var oldPath = this.get('oldPath');
      var newID = this.get('newID');
      var object = this.get('model');
      var self = this;
      var onSuccess = function() {
        var parent = this.get("parentController");
        parent && parent.get("model").update().then(function() {
          object.unloadRecord();
        });
      }.bind(this);

      var onFail = function(reason){
        self.send('showActionFail', reason);
      };

      this.store.moveObject(object, newID).then(onSuccess, onFail);

      // reset
      this.set('newName', undefined);
      this.set('validInput', undefined);
      this.set('isUnique', undefined);
      this.set('oldPath', undefined);
      this.set('newID', undefined)
    }
  }.observes('validInput'),

  actions: {
    initAction: function(action){
      this.get('parentController').send('clearSelected');
      this.set('model.isSelected', true);
      this.send(action);
    },

    openDelete: function(){
      this.send('showDialog', 'confirm-simple', this, this.get('model'), 'deleteObject');
    },

    openVersions: function(){
      this.send('showDialog', 'versions', 'object/versions', this.get('model'));
    },

    openShare: function(){
      this.send('showDialog', 'sharing', 'object/sharing', this.get('model'));
    },

    openCopy: function(){
      this.send('showDialog', 'paste', 'object/copy');
    },

    openCut: function(){
      this.send('showDialog', 'paste', 'object/cut');
    },

    deleteObject: function(){
      this.send('deleteObjects');
      this.set('closeDialog', true);
    },

    validateRename: function(action) {
      var flag = 'validationOnProgress';
      this.set('actionToExec', action);
      this.set(flag, true);
    },

    moveToTrash: function(){
      this.send('moveObjectsToTrash');
    },
  }
});

