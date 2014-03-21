/* Use: */
/* If the initial state of the checkbox is unchecked:  {{checkbox-custom}} */
/* If the initial state of the checkbox is checked:  {{checkbox-custom checkboxState="preselected"}} */

Snf.CheckboxCustomComponent = Ember.Component.extend({
	tagName: 'a',
	classNames: ['check'],
	layoutName: 'components/btn-span',
	spanCls: undefined,
	checkedCls: 'snf-checkbox-checked',
	uncheckedCls: 'snf-checkbox-unchecked',


	didInsertElement: function() {
		this.setInitClasses();
	},
	setInitClasses: function() {
		var initialState = this.get('checkboxState');
        if(initialState === 'preselected')
			this.check();
		else
			this.uncheck();
	},
	toggleParentLiState: function() {
		var elState = this.get('spanCls');
		var checkedCls = this.get('checkedCls');
		var uncheckedCls = this.get('uncheckedCls');
		
		if(elState === checkedCls)
			this.$().closest('li').addClass('selected');
		else if(elState === uncheckedCls)
			this.$().closest('li').removeClass('selected');
	},
	changeState : function() {
		var currentState = this.get('spanCls');
		if(currentState === this.get('checkedCls'))
			this.uncheck();
		else
			this.check();
	},
    check : function(param) {
		this.get('param').set('isSelected', true);
		this.set('spanCls', this.get('checkedCls'));
        this.toggleParentLiState();
    },
    uncheck : function(param) {
        this.get('param').set('isSelected', false);
        this.set('spanCls', this.get('uncheckedCls'));
		this.toggleParentLiState();
	},

    reset: function() {
		if(this.get('checkboxState') === 'preselected')
			this.check();
		else
			this.uncheck();
    },
    click: function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.changeState();
    }
});