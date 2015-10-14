import Ember from 'ember';
import {DropFileViewMixin} from 'ui-web/snf/dropfile/mixins';
import {SnfAddHandlerMixin} from 'ui-web/snf/dropfile/synnefo';

export default Ember.View.extend(DropFileViewMixin, SnfAddHandlerMixin, {
	layoutName: 'object',
	tagName: 'li',
  classNameBindings: ['isSelected', 'loading', 'new'],

  dropFileTarget: Ember.computed.alias('controller.controllers.application'),

  dropFileLocation: function(event) {
    return this.get('controller').get('parentController').get('currentPathWithContainer').replace(/\/$/, "") + 
           "/" + 
           this.get("controller.model.stripped_name");
  },

  isSelected: function(){
    return this.get('controller.model.isSelected');
  }.property('controller.model.isSelected'),
 
  loading: function(){
    return this.get('controller').get('loading') || this.get('controller.model.loading');
  }.property('controller.loading', 'controller.model.loading'),

  new: function(){
    return this.get('controller.model.new');
  }.property('controller.model.new'),
 
  // delegate events to parent controller for non dir entries
  drop: function(e) {
    if (!this.get("controller.model.is_dir")) { return true }
    return this._super(e);
  },
  dragEnter: function(e) { 
    if (!this.get("controller.model.is_dir")) { return true }
    return this._super(e);
  },
  dragLeave: function(e) { 
    if (!this.get("controller.model.is_dir")) { return true }
    return this._super(e);
  },

  click: function(e) {
    let isCheck = e.target.className.includes("fa-check");
    let isDiv = (e.target.tagName == 'DIV') && (e.target.className != 'loader');

    if (isCheck || isDiv) {
      this.get('controller.model').toggleProperty('isSelected');
    } else {
      return;
    }
  },
	/*
	* type -> iconCls:
	* - folder -> fa-folder
	* - text -> fa-file-text-o
	* - compressed -> fa-file-zip-o
	* - image -> fa-file-image-o
	* - audio -> fa-file-audio-o
	* - video -> fa-file-video-o
	* - pdf -> fa-file-pdf-o
	* - word -> fa-file-word-o
	* - excel -> fa-file-excel-o
	* - powerpoint -> fa-file-powerpoint-o
	* - unknown -> fa-file-o (unknown type) 
	*/
	iconCls: function() {
		var type = this.get('controller').get('model.type');
		var iconCls = {};

		iconCls['folder'] = 'fa-folder';
		iconCls['folder-open'] = 'fa-folder-open';
		iconCls['text'] = 'fa-file-text-o';
		iconCls['compressed'] = 'fa-file-zip-o';
		iconCls['image'] = 'fa-file-image-o';
		iconCls['audio'] = 'fa-file-audio-o';
		iconCls['video'] = 'fa-file-video-o';
		iconCls['pdf'] = 'fa-file-pdf-o';
		iconCls['word'] = 'fa-file-word-o';
		iconCls['excel'] = 'fa-file-excel-o';
		iconCls['powerpoint'] = 'fa-file-powerpoint-o';
		iconCls['ebook'] = 'fa-book';
		iconCls['stylesheet'] = 'fa-file-code-o';
		iconCls['unknown'] = 'fa-file-o';
    
    if (type == "folder") {
      type = this.get("dragActive") ? "folder-open" : "folder";
    }

		return iconCls[type];
	}.property('controller.type', 'dragActive'),

	previewSupported: function() {
		var type = this.get('controller').get('model.type');
		var name = this.get('controller').get('model.name');
    var extensionIndex = name.lastIndexOf('.') + 1;
		var extension = name.substr(extensionIndex).toLowerCase();
		var supportedFormats;
		if(type === 'image') {
			// should check the supported format of every preview plugin
			supportedFormats = ['png', 'gif', 'jpeg', 'jpg'];
			if(supportedFormats.indexOf(extension) > -1)	{
				return true;
			}
		}
		return false;
	}.property('controller.name'),

  hideRenameForm: function() {
    var self = this;
    // hide rename form on click outside input and buttons
    $(document).mouseup(function(e) {
      if(self.get('_state') === 'inDOM' && self.$('.js-input-single').hasClass('open')) {
        var $btnCancel = self.$('.js-cancel');
        var $btnOK = self.$('.js-hide-edit');
        var $input = self.$('input');

        var okNotPressed = !$btnOK.is(e.target) && ($btnOK.has(e.target).length === 0);
        var cancelNotPressed = !$btnCancel.is(e.target) && ($btnCancel.has(e.target).length === 0);

        if(cancelNotPressed && okNotPressed && !$input.is(e.target)) {
          self.send('reset');
        }
      }
    });

    // hide on esc
    $(document).keyup(function(e) {
      if (self.get('_state') === 'inDOM' && e.keyCode == 27 && self.$('.js-input-single').hasClass('open')) {
        self.send('reset');
      }
    });

  }.on('didInsertElement'),

	didInsertElement: function() {
		var self = this;
		this.$('.js-show-edit').on('click', function() {
			self.send('toggleEdit');
		});

		this._super();
	},

  wait: false,
	actions: {
		reset: function(actions) {
			/*
			* actions is the action with params that should be triggered split by comma
			* action -> actions[0]
			* params -> actions[1]
			*/
      if(!this.get('wait')) {
        this.set('wait', true);
        if(actions) {
          var actions = actions.split(',');
          this.get('controller').send(actions[0], actions[1])
        }
        else {
          this.$('input').val('');
          this.send('toggleEdit');
        }
      }
    },
		toggleEdit: function() {
			this.$('.js-show-edit').toggleClass('hidden');
      this.$('.js-input-single').toggleClass('hidden');
			this.$('.js-input-single').toggleClass('open');
			this.$('.js-hide-edit').toggleClass('hidden');
			this.$('.js-name').toggleClass('hidden');
      this.$(".input-with-valid").find('input')[0].focus();
			this.get('controller').set('resetInput', true);
      this.set('wait', false);
		}
	}
});
