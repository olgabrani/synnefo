Snf.TagController = Ember.ObjectController.extend({
    actions: {
        createTag: function(data, model) {
            var tag = this.store.createRecord('tag', data);
            tag.save();

            // model can be any model class instance which 
            // shares the tags interface used below.
            if (model) {
              model.get('tags').addObject(tag);
            }
        }
    },
});


var _defaultNewTagColor = '#16C1E9';

Snf.AddTagController = Snf.TagController.extend({
  newTagName: '',
  newTagColor: _defaultNewTagColor,
  closed: false,
  actions: {
    handleSubmit: function() {
      // resolve form params
      var tagDetails = {
        name: this.get('newTagName'),
        color: this.get('newTagColor')
      };

      // validate ???
      // failed validation messages ???

      // do create tag
      this.send('createTag', tagDetails, this.get('model'));

      // hide form (view should use this attr)
      this.set('closed', true);

      // reset the newTag
      this.set('newTagName', '');
      this.set('newTagColor', _defaultNewTagColor);
    }
  }
});
