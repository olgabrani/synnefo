import Ember from 'ember';

/*
* For now this view is used for 3 things:
*  - create container
*  - create directory
*  - rename object
* The above actions set or modify the ID of the record.
* The view runs some validations for the input value but the controller
* of the corresponding action checks if there is already another object
* with the new ID.
*
* The view accepts the following parameters:
*  - value: for renaming is the the stripped name of the object
*  - oldValue: for renaming is the the initial stripped name of the object
*    It is used in order to determine if the name of the object has been
*    modified.
*  - cls: class names
*  - placeholder
*
* Note: each of the above actions are handled by a different controller.

* Each controller must have these properties:
* - isUnique
* - newID
* - newName
*
* If the checks of the view result that the input is in a valid form,
* the controller must check if the ID is unique
*/

export default Ember.View.extend({
  classNames: ['input-with-valid', 'js-input-single'],
  classNameBindings: ['cls'], // cls is provided by parent the template

  templateName: 'input-single',

  oldValue: undefined,
  inputValue: undefined,

  notEmpty: function() {
    var value = this.get('inputValue');
    if(value) {
      value = value.trim();
    }
    else {
      value = '';
    }
    this.set('inputValue', value);

    if(value) {
      return true;
    }
    else {
      return false;
    }
  }.property('inputValue'),


  /* 
  * isModified is used for rename action.
  * For actions that don't check an old value, like create actions,
  * returns true, so that we won't nedd to check for which action we
  * are validating.
  */
  isModified: function() {
    var oldValue = this.get('oldValue');
    if(oldValue && oldValue === this.get('inputValue')) {
      return false;
    }
    else {
      return true;
    }
  }.property('inputValue'),

  isLargeName: function() {
    var maxLength = this.get('controller').get('nameMaxLength');
    return this.get('inputValue').length > maxLength;
  }.property('inputValue'),

  // for objects actions (create, rename)
  isLargePath: function() {
    var maxLength = this.get('controller').get('nameMaxLength');
    // current_path is a prop of ObjectsController
    var currentPath = this.get('controller').get('current_path') || this.get('controller').get('parentController').get('current_path');
    currentPath = currentPath + this.get('inputValue');
    return currentPath.length > maxLength;
  }.property('inputValue'),

  overLimitChars: function() {
    var maxLength = this.get('controller').get('nameMaxLength'),
        inputLength, currentPath, pathLength;
    if(this.get('isLargeName')) {
      inputLength = this.get('inputValue').length;
      return inputLength - maxLength;
    }
    else if(this.get('isLargePath')) {
      // current_path is a prop of ObjectsController
      currentPath = this.get('controller').get('current_path') || this.get('controller').get('parentController').get('current_path');
      currentPath = currentPath + this.get('inputValue');

      return currentPath.length - maxLength;

    }
    else {
      return 0;
    }

  }.property('inputValue'),

  manipulateSize: function() {

    var self = this;
    return function() {
      var smallerValue, warningMsg = undefined;
      if(self.get('controller').get('name_stripped') === 'containers') {
        if(self.get('isLargeName')) {
            smallerValue = self.get('inputValue').slice(0, -(self.get('overLimitChars')));
            self.$('input').val(smallerValue);
            self.$('input').keyup();
            warningMsg = 'isLarge';
        }
        if(!self.get('warningVisible') && warningMsg) {
            self.send('showInfo', warningMsg);
        }
      }
      else {
        if(self.get('isLargeName') || self.get('isLargePath')) {
            smallerValue = self.get('inputValue').slice(0, -(self.get('overLimitChars')));
            self.$('input').val(smallerValue);
            self.$('input').keyup();
            warningMsg = 'isLarge';
        }
        if(!self.get('warningVisible') && warningMsg) {
            self.send('showInfo', warningMsg);
        }
      }

    };
  }.property(), // like partial input but could check and path

  checkSlash: function() {
    var self = this;
    return function() {
      if(!self.get('errorVisible')) {
        var hasSlash = self.get('inputValue').indexOf('/') !== -1;
        if(hasSlash) {
          self.send('showInfo', 'hasSlash', true);
        }
      }
    };
  }.property(),

  isUnique: function() {
    var self = this;
    return function() {
      if(!self.get('errorVisible')) {
        self.get('controller').set('newName', self.get('inputValue'));
        var notUnique = !self.get('controller').get('isUnique');
        var isModified = self.get('isModified');
        if(isModified && notUnique) {
          self.send('showInfo', 'notUnique', true);
        }
      }
    };
  }.property(), // different for rename and create, works with controller, runs only if isModified is true


  allowAction: function() {
    var self = this;
    return function () {
      if(self.get('controller').get('name_stripped') === 'containers') {
        if(!self.get('errorVisible') && !self.get('isLargeName')) {
          self.get('controller').set(self.get('actionFlag'), undefined); // undefined so that the html attr to be removed from a tags
        }
        else {
        // This is used to disable the action btn in the rename
        // form when the name is the same with the original
        // (the one that exists in store)
        self.get('controller').set(self.get('actionFlag'), true);
        }
      }
      else {
        if(self.get('isModified') && !self.get('errorVisible') && !self.get('isLargeName') &&  !self.get('isLargePath')) {
          self.get('controller').set(self.get('actionFlag'), undefined); // undefined so that the html attr to be removed from a tags
        }
        else {
        // This is used to disable the action btn in the rename
        // form when the name is the same with the original
        // (the one that exists in store)
        self.get('controller').set(self.get('actionFlag'), true);
        }
      }
    };
  }.property(),

  errorVisible: false,
  errorMsg: '',
  warningVisible: false,
  warningMsg: '',


  eventManager: Ember.Object.create({
    keyUp: function(event, view) {
      var escKey = 27;
      event.stopPropagation();
      if(event.keyCode == escKey) {
        $('body .close-reveal-modal').trigger('click');
        view.$().siblings('.js-cancel').trigger('click');
      }

      else {
        /*
         * should concern to disable the action button at the start
         * and then after 300 check if the input is valid and enable/disable
         * the action button. Do this in order to avoid to submit action before
         * the examination of the input and the multiple instant submitions.
         * (think double enter, click, click, click the button)
         */
        view.send('hideInfo', true);
        var value = view.$('input').val();
        view.set('inputValue', value);

        if(view.get('notEmpty')) {
            view.get('controller').set('notEmptyInput', true);
            /*
            * Each function checks the trimmed value of the input only if
            * the function before it, hasn't detect an error. We do this
            * because we display one error at the time.
            */
            view.get('checkSlash')();
            view.get('manipulateSize')();
            view.get('isUnique')();
            view.get('allowAction')();
        }
        else {
          view.get('controller').set(view.get('actionFlag'), true);
        }
      }
    }
  }),

  hideInfoOnReset: function() {
    if(this.get('controller').get('resetInput')) {
      this.send('hideInfo', true);
      this.send('hideInfo');
      this.get('controller').set('resetInput', false)
    }
  }.observes('controller.resetInput'),

  actions: {

    hideInfo: function(isError) {
      if(isError) {
        this.set('errorVisible', false);
      }
      else {
        var self = this;
        setTimeout(function() {
          self.set('warningVisible', false);
        }, 3000);
      }
    },

    showInfo: function(type, isError) {
      /*
      * type can take the values:
      *  - hasSlash
      *  - isLarge
      *  - notUnique
      */

      //  TEMP
      var message = {
        hasSlash: '"/" is not allowed',
        isLarge: 'Too large name or path.Max: ' + this.get('controller').get('nameMaxLength') + ' bytes',
        notUnique: 'Already exists'
      };

      if(isError) {
        this.set('errorMsg', message[type]);
        this.set('errorVisible', true);
        this.get('controller').set(this.get('actionFlag'), false);
      }
      else {
        this.set('warningMsg', message[type]);
        this.set('warningVisible', true);
        this.send('hideInfo');
      }
    }
  },
});
