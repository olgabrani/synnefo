Ember.TEMPLATES["_actions-bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"rt-actions\">\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("single")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "childInit", options) : helperMissing.call(depth0, "link-to", "childInit", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "parent", "grid-view", options) : helperMissing.call(depth0, "link-to", "parent", "grid-view", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "parent", "list-view", options) : helperMissing.call(depth0, "link-to", "parent", "list-view", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("<span class=\"snf-gridview\">");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("<span class=\"snf-listview\"></span>");
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"filter-menu\">\n        <div><a class=\"filter\" href=\"\">Filter</a></div>\n        <ul class=\"options\">\n            <li><a href=\"\">option 1</a></li>\n            <li><a href=\"\">option 2</a></li>\n            <li><a href=\"\">option 3</a></li>\n            <li><a href=\"\">option 4</a></li>\n        </ul>\n    </div>\n    ");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("\n    <div id=\"hd-search\" class=\"hd-search\">\n        <form>\n            <span class=\"hd-icon-search snf-search\"></span>\n            <input class=\"hd-search-input\" placeholder=\"Enter your search term...\" type=\"search\" value=\"\" name=\"search\" id=\"search\">\n        </form>\n    </div>\n    ");
  }

  data.buffer.push("<section class=\"actions-bar clearfix\">\n\n    <h2>");
  stack1 = helpers._triageMustache.call(depth0, "pageTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n\n    ");
  stack1 = helpers['if'].call(depth0, "hasViewOptions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    \n    ");
  stack1 = helpers['if'].call(depth0, "hasFilter", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    \n    ");
  stack1 = helpers['if'].call(depth0, "hasSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["_header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("<span class=\"snf-pc-outline\"></span>");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("<span class=\"snf-network-outline\"></span>");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("<span class=\"snf-volume-outline\"></span>");
  }

  data.buffer.push("<header class=\"header\">\n    <nav>\n        <ul class=\"icons-nav\">\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "vms", "grid-view", options) : helperMissing.call(depth0, "link-to", "vms", "grid-view", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "networks", "grid-view", options) : helperMissing.call(depth0, "link-to", "networks", "grid-view", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "volumes", "grid-view", options) : helperMissing.call(depth0, "link-to", "volumes", "grid-view", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        </ul>\n    </nav>\n    <div class=\"login\">\n        <div class=\"wrap\">\n            <a href=\"\">user1@synnefo.org</a>\n            <ul>\n                <li><a href=\"\">dashboard</a></li>\n                <li><a href=\"\">sign out</a></li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"logo\">\n        <a href=\"index.html\"><img src=\"../images/synnefo-logo.png\" alt=\"software logo\"></a>\n    </div>\n</header>\n");
  return buffer;
  
});

Ember.TEMPLATES["_modals"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"app-modal\" class=\"medium reveal-modal\" data-reveal>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["add-tag"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"buttons\">\n    <a class=\"btn1 show-add-tag wrap-a\" id=\"show-add-tag\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "open", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span>add new tag</span></a>\n</div>\n\n<div class=\"snf-color-picker\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("isOpen:opened:closed")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    <h3>Select color:</h3>\n    <form action=\"#\" method=\"post\">\n        <div id=\"colorpicker\">\n            <div class=\"farbtastic\">\n                <div class=\"color\" style=\"background-color: rgb(255, 0, 21);\"></div>\n                <div class=\"wheel\"></div>\n                <div class=\"overlay\"></div>\n                <div class=\"h-marker marker\" style=\"left: 90px; top: 13px;\"></div>\n                <div class=\"sl-marker marker\" style=\"left: 87px; top: 114px;\"></div>\n            </div>\n        </div>\n        \n        <div class=\"form-item\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("newTagColor"),
    'class': ("color-preview"),
    'type': ("text"),
    'id': ("color"),
    'disabled': ("disabled")
  },hashTypes:{'value': "ID",'class': "STRING",'type': "STRING",'id': "STRING",'disabled': "STRING"},hashContexts:{'value': depth0,'class': depth0,'type': depth0,'id': depth0,'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            <span class=\"input\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("newTagName"),
    'class': ("tag_name"),
    'type': ("text"),
    'placeholder': ("My Tag")
  },hashTypes:{'value': "ID",'class': "STRING",'type': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'class': depth0,'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </span>\n        </div>\n    </form>    \n    <div class=\"btns\">\n        <a class=\"btn1 wrap-a\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "handleSubmit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span>OK</span></a>\n        <a class=\"btn1 hide-add-tag wrap-a\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span>CANCEL</span></a>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "header", options) : helperMissing.call(depth0, "partial", "header", options))));
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "modals", options) : helperMissing.call(depth0, "partial", "modals", options))));
  data.buffer.push("\n\n<div class=\"body-wrapper\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/add-new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">          \n    <div class=\"img-wrap\">\n        <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":snf-font iconCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span>\n    </div>\n    <h4>");
  stack1 = helpers._triageMustache.call(depth0, "text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/btn-simple"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1;


  stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["components/btn-span"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.spanCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "view.content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>");
  return buffer;
  
});

Ember.TEMPLATES["components/editable-prop"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <span class=\"prop\">");
  stack1 = helpers._triageMustache.call(depth0, "prop", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("prop"),
    'focus-out': ("acceptEditableChanges"),
    'insert-newline': ("acceptEditableChanges")
  },hashTypes:{'value': "ID",'focus-out': "STRING",'insert-newline': "STRING"},hashContexts:{'value': depth0,'focus-out': depth0,'insert-newline': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <a class=\"edit\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "allowEdit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span class=\"snf-edit\"></span></a>\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <a class=\"save\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "acceptEditableChanges", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span class=\"snf-ok-sign\"></span></a>\n    ");
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, "isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = helpers['if'].call(depth0, "isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<span class=\"editbuttons\">\n    ");
  stack1 = helpers.unless.call(depth0, "isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers['if'].call(depth0, "isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</span>\n                    ");
  return buffer;
  
});

Ember.TEMPLATES["components/reveal-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n");
  stack1 = helpers._triageMustache.call(depth0, "foo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <p class=\"buttons\">\n        <a href=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "ok", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn4\"><span>Yes</span></a>\n        <a href=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn4\"><span>No</span></a>\n    </p>\n");
  return buffer;
  }

  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "hasButtons", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<a class=\"close-reveal-modal has-tip\" data-tooltip title=\"close window\">x</a>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/sideactions-project"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <ul>\n        <li>");
  stack1 = helpers._triageMustache.call(depth0, "current.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        ");
  stack1 = helpers['if'].call(depth0, "isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "project", "in", "availableProjects", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "reassignProject", {hash:{
    'newproject': ("project")
  },hashTypes:{'newproject': "ID"},hashContexts:{'newproject': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "project.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <li><a  class=\"reassign\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showProjects", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Reassign<span class=\"arrow-right\"></span></a></li>\n        ");
  return buffer;
  }

  data.buffer.push("<a href=\"#\" title=\"Show projects\"><span class=\"snf-folder-move-full\"></span></a>\n");
  stack1 = helpers['if'].call(depth0, "isDisplayed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/tag-el"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<em href=\"#\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("title"),
    'style': ("style")
  },hashTypes:{'title': "ID",'style': "ID"},hashContexts:{'title': depth0,'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"has-tip tag\">&nbsp;</em>\n<span>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n<a class=\"delete\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteTag", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" title=\"remove this tag from this vm\"><span class=\"snf-trash-outline\"></span></a>");
  return buffer;
  
});

Ember.TEMPLATES["details"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":os os")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "os", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            <li>\n                                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "item.act", "item.controller", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "item.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></a>\n                            </li>\n                        ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                            <li>There are no available actions</li>\n\n                        ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'title': ("menu.link")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "menu.link", options) : helperMissing.call(depth0, "link-to", "menu.link", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("menu.icon")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span>");
  return buffer;
  }

  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "actions-bar", options) : helperMissing.call(depth0, "partial", "actions-bar", options))));
  data.buffer.push("\n<section class=\"main row\">\n\n    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":details status")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "lt-bar", options) : helperMissing.call(depth0, "outlet", "lt-bar", options))));
  data.buffer.push("\n        <section class=\"top\">\n            <div class=\"lt\">\n                <div class=\"img-wrap\">\n                    <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":snf-font iconCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span>\n                    ");
  stack1 = helpers['if'].call(depth0, "os", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n\n            </div>\n            <div class=\"rt\">\n                <div class=\"title\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['editable-prop'] || (depth0 && depth0['editable-prop']),options={hash:{
    'prop': ("name"),
    'ok': ("saveModel")
  },hashTypes:{'prop': "ID",'ok': "STRING"},hashContexts:{'prop': depth0,'ok': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "editable-prop", options))));
  data.buffer.push("\n                    <span class=\"status\">");
  data.buffer.push(escapeExpression((helper = helpers['status-to-text'] || (depth0 && depth0['status-to-text']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "status", options) : helperMissing.call(depth0, "status-to-text", "status", options))));
  data.buffer.push("</span></h1>\n                </div>\n                 <div class=\"actions\">\n                    <ul>\n                        ");
  stack1 = helpers.each.call(depth0, "item", "in", "actionsMeta", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </ul>\n                </div>\n                <div class=\"tabs\">\n                     <ul>\n                        ");
  stack1 = helpers.each.call(depth0, "menu", "in", "submenu", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </ul>\n                </div>\n            </div>\n        </section>\n\n        ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <div class=\"placeholder\"></div>\n    </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["details/network-info"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<section class=\"content info-simple\">\n\n    <section class=\"info-block\">\n        <h2>info</h2>\n        <dl>");
  stack1 = helpers._triageMustache.call(depth0, "ports.foo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <dt><span class=\"snf-font snf-network-full\"></span>Name</dt>\n            <dd>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n            <dt><span class=\"snf-font snf-dashboard-outline\"></span>Assigned Project</dt>\n            <dd>");
  stack1 = helpers._triageMustache.call(depth0, "project.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n            <dt><span class=\"snf-pc-full snf-font\"></span>Connected Machines</dt>\n            <dd>");
  stack1 = helpers._triageMustache.call(depth0, "vmsCnt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n        </dl>\n    </section>\n\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["details/network-vm-connected"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <section ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":item port.vm.status")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        <div class=\"what\">\n            <div class=\"img-wrap\">\n                <span class=\"snf-pc-full snf-font\"></span>\n                <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":os vm.os")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "vm.os", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n            </div>\n            <h4>");
  stack1 = helpers._triageMustache.call(depth0, "vm.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n        </div>\n        <div class=\"clearfix\">\n            <ul class=\"connections\">\n                ");
  stack1 = helpers.each.call(depth0, "port", "in", "ports", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </div>\n    </section>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <li>\n                    <a href=\"#\" class=\"act\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "dettach-network-modal", "network", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","STRING","ID"],data:data})));
  data.buffer.push(">&nbsp;</a>\n                    <div class=\"icon\"><span class=\"snf-nic-full\"></span></div>\n                    <div class=\"data\">\n                        <ul>\n                            <li>\n                            ");
  stack1 = helpers['if'].call(depth0, "port.ipv4", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  stack1 = helpers['if'].call(depth0, "port.ipv6", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.FirewallView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                            </li>\n                        </ul>\n                    </div>\n                </li>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <h5 class=\"ip-data\">IPv4</h5>\n                                <p class=\"inner\">");
  stack1 = helpers._triageMustache.call(depth0, "port.ipv4", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <h5 class=\"ip-data\">IPv4</h5>\n                                <p class=\"inner\">");
  stack1 = helpers._triageMustache.call(depth0, "port.ipv6", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                            ");
  return buffer;
  }

  data.buffer.push("<section class=\"content connected network\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "ports.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "vm", "in", "vms", {hash:{
    'itemController': ("NetworkVmPorts")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <section class=\"connect-new machine\">\n        <div class=\"img-wrap\">\n            <a href=\"\" data-reveal-id=\"connect-to-network\">\n                <span class=\"snf-pc-full snf-font\"></span>\n            </a>\n        </div>\n        <p><a href=\"\">Connect VM</a></p>\n    </section>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["details/vm-info"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				");
  stack1 = helpers['if'].call(depth0, "port.ipv4", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  stack1 = helpers['if'].call(depth0, "port.ipv6", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n			<dt><span class=\"snf-nic-full snf-font\"></span>IPv4</dt>\n			<dd>");
  stack1 = helpers._triageMustache.call(depth0, "port.ipv4", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n				");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n			<dt><span class=\"snf-nic-full snf-font\"></span>IPv6</dt>\n			<dd>");
  stack1 = helpers._triageMustache.call(depth0, "port.ipv6", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n				");
  return buffer;
  }

  data.buffer.push("<section class=\"content info-simple\">\n\n	<section class=\"info-block\">\n		<h2>info</h2>\n		<dl>\n			<dt><span class=\"snf-font snf-pc-full\"></span>Name</dt>\n			<dd>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt><span class=\"snf-font snf-dashboard-outline\"></span>Assigned Project</dt>\n			<dd>");
  stack1 = helpers._triageMustache.call(depth0, "project.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt><span class=\"snf-chip-outline snf-font\"></span>CPUs</dt>\n			<dd>4</dd>\n			<dt><span class=\"snf-ram-full snf-font\"></span>RAM</dt>\n			<dd>512 MB</dd>\n			<dt><span class=\"snf-volume-full snf-font\"></span>System Disk Size</dt>\n			<dd>4GB</dd>\n			<dt><span class=\"snf-volume-full snf-font\"></span>Storage Type</dt>\n			<dd>Archipelago</dd>\n			<dt><span class=\"snf-image-full snf-font\"></span>Image Name</dt>\n			<dd>Fedora</dd>\n			<dt><span class=\"snf-image-full snf-font\"></span>Image Size</dt>\n			<dd>3.68 GB</dd>\n			");
  stack1 = helpers.each.call(depth0, "port", "in", "ports", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</dl>\n	</section>\n\n	<section class=\"info-block\">\n		<h2>tags</h2>\n		");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.tagsListView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "add-tag", "model", options) : helperMissing.call(depth0, "render", "add-tag", "model", options))));
  data.buffer.push("\n	</section>\n\n\n\n	<section class=\"info-block charts\">\n		<div>\n			<h2>CPU utilization</h2>\n			<div class=\"graph_container\">\n				<img src=\"../images/cpu-ts.png\" alt=\"CPU utilization graph\">\n			</div>\n		</div>\n		<div>\n			<h2>Network utilization</h2>\n			<div class=\"graph_container\">\n				<img src=\"../images/net-ts.png\" alt=\"network utilization graph\">\n			</div>\n		</div>\n	</section>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["details/vm-network-connected"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <section ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":item port.network.status")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        <div class=\"what\">\n            <div class=\"img-wrap\">\n                <span class=\"snf-network-full snf-font\"></span>\n            </div>\n            <h4>");
  stack1 = helpers._triageMustache.call(depth0, "network.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n        </div>\n        <div class=\"clearfix\">\n            <ul class=\"connections\">\n                ");
  stack1 = helpers.each.call(depth0, "port", "in", "ports", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </div>\n    </section>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <li>\n                    <a href=\"#\" class=\"act\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "dettach-network-modal", "network", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","STRING","ID"],data:data})));
  data.buffer.push(">&nbsp;</a>\n                    <div class=\"icon\"><span class=\"snf-nic-full\"></span></div>\n                    <div class=\"data\">\n                        <ul>\n                            <li>\n                            ");
  stack1 = helpers['if'].call(depth0, "port.ipv4", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  stack1 = helpers['if'].call(depth0, "port.ipv6", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.FirewallView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                            </li>\n                        </ul>\n                    </div>\n                </li>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <h5 class=\"ip-data\">IPv4</h5>\n                                <p class=\"inner\">");
  stack1 = helpers._triageMustache.call(depth0, "port.ipv4", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <h5 class=\"ip-data\">IPv4</h5>\n                                <p class=\"inner\">");
  stack1 = helpers._triageMustache.call(depth0, "port.ipv6", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                            ");
  return buffer;
  }

  data.buffer.push("<section class=\"content connected network\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "ports.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "network", "in", "networks", {hash:{
    'itemController': ("VmNetworkPorts")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <section class=\"connect-new network\">\n		<div class=\"img-wrap\">\n			<a href=\"\" data-reveal-id=\"connect-to-network\">\n				<span class=\"snf-network-full snf-font\"></span>\n			</a>\n		</div>\n		<p><a href=\"\" data-reveal-id=\"connect-to-network\">Connect to Network</a></p>\n	</section>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["details/vm-volume-connected"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <section ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":item volume.status")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"what\">\n                <div class=\"img-wrap\">\n                    <span class=\"snf-volume-full snf-font\"></span>\n                </div>\n                <h4>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n            </div>\n            <div class=\"clearfix\">\n                <ul class=\"connections\">\n                    <li>\n                        <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "dettach-volume-modal", "volume", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","STRING","ID"],data:data})));
  data.buffer.push("  class=\"act\" >&nbsp;</a>\n                        <div class=\"icon\"></div>\n                        <div class=\"data\">\n                            <ul>\n                                <li>\n                                    <h5 class=\"volume-data\">Size</h5>\n                                    <p>");
  data.buffer.push(escapeExpression((helper = helpers['bytes-to-human'] || (depth0 && depth0['bytes-to-human']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "size", options) : helperMissing.call(depth0, "bytes-to-human", "size", options))));
  data.buffer.push("</p>\n                                </li>\n                                <li>\n                                    <h5 class=\"volume-data\">Storage Type</h5>\n                                    <p>");
  stack1 = helpers._triageMustache.call(depth0, "storageType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                                </li>\n                            </ul>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </section>\n    ");
  return buffer;
  }

  data.buffer.push("<section class=\"content connected volume\">\n    ");
  stack1 = helpers.each.call(depth0, "volume", "in", "volumes", {hash:{
    'itemController': ("Volume")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	<section class=\"connect-new volume\">\n		<div class=\"img-wrap\">\n			<a href=\"\" data-reveal-id=\"attach-volume\">\n				<span class=\"snf-volume-full snf-font\"></span>\n			</a>\n		</div>\n		<p><a href=\"\">Attach Volume</a></p>\n	</section>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["details/volume-info"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "vm.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

  data.buffer.push("<section class=\"content info-simple\">\n    <section class=\"info-block\">\n        <h2>info</h2>\n        <dl>\n            <dt><span class=\"snf-font snf-volume-full\"></span>Name</dt>\n            <dd>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n            <dt><span class=\"snf-font snf-image-full\"></span>Storage type</dt>\n            <dd>");
  stack1 = helpers._triageMustache.call(depth0, "storageType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n            <dt><span class=\"snf-font snf-image-full\"></span>Size</dt>\n            <dd>");
  data.buffer.push(escapeExpression((helper = helpers['bytes-to-human'] || (depth0 && depth0['bytes-to-human']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "size", options) : helperMissing.call(depth0, "bytes-to-human", "size", options))));
  data.buffer.push("</dd>\n            <dt><span class=\"snf-font snf-dashboard-outline\"></span>Assigned Project</dt>\n            <dd>");
  stack1 = helpers._triageMustache.call(depth0, "project.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n            <dt><span class=\"snf-pc-full snf-font\"></span>Attached to</dt>\n            <dd>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "vm", "vm", options) : helperMissing.call(depth0, "link-to", "vm", "vm", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n        </dl>\n    </section>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["details/volume-vm-connected"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <span class=\"snf-font snf-pc-full\"></span>\n                    <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":os vm.os")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "vm.os", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                    ");
  return buffer;
  }

  data.buffer.push("<section class=\"content connected\">\n    <section ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":item volume.status")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"what\">\n                <div class=\"img-wrap\">\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "vm", "vm", options) : helperMissing.call(depth0, "link-to", "vm", "vm", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n                <h4>");
  stack1 = helpers._triageMustache.call(depth0, "vm.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n            </div>\n            <div class=\"clearfix\">\n                <ul class=\"connections\">\n                    <li>\n                        <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "dettach-volume-modal", "volume", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","STRING","ID"],data:data})));
  data.buffer.push("  class=\"act\" >&nbsp;</a>\n                        <div class=\"icon\"></div>\n                        <div class=\"data\">\n                            <ul>\n                                <li>\n                                    <h5 class=\"volume-data\">Assigned Project</h5>\n                                    <p>");
  stack1 = helpers._triageMustache.call(depth0, "vm.project.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                                </li>\n                                <li>\n                                    <h5 class=\"volume-data\">CPUs</h5>\n                                    <p>4</p>\n                                </li>\n                                <li>\n                                    <h5 class=\"volume-data\">Image Name</h5>\n                                    <p>Fedora</p>\n                                </li>\n                                <li>\n                                    <h5 class=\"volume-data\">Image Size</h5>\n                                    <p>3.68 GB</p>\n                                </li>\n                            </ul>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </section>\n    <section class=\"connect-new vvm\">\n        <div class=\"img-wrap\">\n            <a href=\"\">\n                <span class=\"snf-pc-full snf-font\"></span>\n            </a>\n        </div>\n        <p><a href=\"\">Attach to VM</a></p>\n    </section>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["elem-content"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("i");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "item", "in", "mainActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <li class=\"more-actions\">\n                <a href=\"javascript:void(0)\" title=\"\">...</a>\n                <ul>\n                    ");
  stack1 = helpers.each.call(depth0, "item", "in", "secondaryActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </ul>\n            </li>\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n            <li>\n                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "item.act", "item.controller", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("item.title")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("><span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("item.spanCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span></a>\n            </li>\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <li>\n                        <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "item.act", "item.controller", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("item.title")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "item.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n                    </li>\n                    ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "item", "in", "actionsMeta", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n            ");
  data.buffer.push(escapeExpression((helper = helpers['sideactions-project'] || (depth0 && depth0['sideactions-project']),options={hash:{
    'reassignProject': ("reassignProject"),
    'current': ("project"),
    'projects': ("projects")
  },hashTypes:{'reassignProject': "STRING",'current': "ID",'projects': "ID"},hashContexts:{'reassignProject': depth0,'current': depth0,'projects': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sideactions-project", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":snf-font iconCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span>\n            ");
  stack1 = helpers['if'].call(depth0, "os", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":os os")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "os", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "item.act", "item.controller", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("item.title")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("><span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("item.spanCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span></a>\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.tagsListView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-status': ("status"),
    'class': ("this.status")
  },hashTypes:{'data-status': "ID",'class': "STRING"},hashContexts:{'data-status': depth0,'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    <ul class=\"side-actions\">\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "type", "", options) : helperMissing.call(depth0, "link-to", "type", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n\n        ");
  stack1 = helpers['if'].call(depth0, "actionsMany", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n        ");
  stack1 = helpers['if'].call(depth0, "os", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n\n    <div class=\"container\">\n        \n        ");
  data.buffer.push(escapeExpression((helper = helpers['checkbox-custom'] || (depth0 && depth0['checkbox-custom']),options={hash:{
    'param': (""),
    'select': ("selectItem"),
    'unselect': ("unselectItem")
  },hashTypes:{'param': "ID",'select': "STRING",'unselect': "STRING"},hashContexts:{'param': depth0,'select': depth0,'unselect': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "checkbox-custom", options))));
  data.buffer.push("\n        \n        <div class=\"img-wrap\">\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "type", "", options) : helperMissing.call(depth0, "link-to", "type", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <h4>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n        \n        <div class= \"status\">\n            <span class=\"state\">");
  data.buffer.push(escapeExpression((helper = helpers['status-to-text'] || (depth0 && depth0['status-to-text']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "status", options) : helperMissing.call(depth0, "status-to-text", "status", options))));
  data.buffer.push("</span>\n        </div>\n        <div class=\"actions\">\n            ");
  stack1 = helpers.each.call(depth0, "item", "in", "actionsMeta", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        ");
  stack1 = helpers['if'].call(depth0, "hasTags", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["elem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li")
  },hashTypes:{'tagName': "STRING"},hashContexts:{'tagName': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "type", "", options) : helperMissing.call(depth0, "link-to", "type", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "elem-content", options) : helperMissing.call(depth0, "partial", "elem-content", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <li>\n        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "elem-content", options) : helperMissing.call(depth0, "partial", "elem-content", options))));
  data.buffer.push("\n    </li>\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "view.sidebar", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["elems"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "actions-bar", options) : helperMissing.call(depth0, "partial", "actions-bar", options))));
  data.buffer.push("\n<section class=\"main row\">\n    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":entities viewCls")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.ItemsListView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.ItemsListLtBarView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["firewall"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<p>Firewall <em>");
  stack1 = helpers._triageMustache.call(depth0, "port.firewallState", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</em></p>\n<ul class=\"more\">\n    <li class=\"fully selected\">\n        <a href=\"\" class=\"radiobtn\">Fully protected mode<span class=\"snf-radio-checked\"></span></a>\n    </li>\n    <li class=\"basic\">\n        <a href=\"\" class=\"radiobtn\">Basically protected mode<span class=\"snf-radio-unchecked\"></span></a>\n    </li>\n    <li class=\"unprotected\">\n        <a href=\"\" class=\"radiobtn\">Unprotected mode<span class=\"snf-radio-unchecked\"></span></a>\n    </li>\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["items-list-lt-bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "a.act", {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("a.title")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "a.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n    ");
  return buffer;
  }

  stack1 = helpers._triageMustache.call(depth0, "controller.selectedItems", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<ul class=\"lt-actions\">\n    <li class=\"select trigger-checkbox\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleCheckboxesState", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n        <a href=\"\" class=\"check\">\n            <span class=\"snf-checkbox-unchecked checkbox\"></span>\n        </a>\n        <em>Un</em>Select all\n\n    </li>\n    ");
  stack1 = helpers.each.call(depth0, "a", "in", "actionsMeta", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("    \n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["items-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n           ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "elem", "", options) : helperMissing.call(depth0, "render", "elem", "", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("        ");
  data.buffer.push(escapeExpression((helper = helpers['add-new'] || (depth0 && depth0['add-new']),options={hash:{
    'type': ("controller.type"),
    'icon': ("controller.iconCls"),
    'action': ("openWizard")
  },hashTypes:{'type': "ID",'icon': "ID",'action': "STRING"},hashContexts:{'type': depth0,'icon': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "add-new", options))));
  data.buffer.push("\n        ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["lt-bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.toggleLtBarView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n<div class=\"lt-bar\">\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.scrollWrapView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["modals/connect-vm-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>You can connect to your ");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" VM using this stuff:</p>\n    <p><span class=\"ssh\">ssh root@okeanos.grnet.gr/123</span></p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("connect-vm-modal")
  },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/destroy-network-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>Are you sure you want to destroy the network ");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("? </p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("destroy-network-modal"),
    'hasButtons': ("true"),
    'ok': ("destroyNetwork")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/destroy-vm-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>Are you sure you want to destroy the VM <strong>");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>?</p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("destroy-vm-modal"),
    'hasButtons': ("true"),
    'ok': ("destroyVm")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/destroy-volume-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>Are you sure you want to destroy the volume ");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("? </p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("destroy-volume-modal"),
    'hasButtons': ("true"),
    'ok': ("destroyVolume")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/dettach-network-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <p>Are you sure you want to dettach this IP from your Network?</p>\n");
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("dettach-network-modal"),
    'hasButtons': ("true"),
    'ok': ("dettachIp"),
    'param': ("model")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING",'param': "ID"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0,'param': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/dettach-vm-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <p>Are you sure you want to dettach this IP from your Network?</p>\n");
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("dettach-network-modal"),
    'hasButtons': ("true"),
    'ok': ("dettachIp"),
    'param': ("model")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING",'param': "ID"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0,'param': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/dettach-volume-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <p>Are you sure you want to dettach this Volume?</p>\n");
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("dettach-volume-modal"),
    'hasButtons': ("true"),
    'ok': ("dettachVolume"),
    'param': ("model")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING",'param': "ID"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0,'param': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/reboot-vm-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>Are you sure you want to reboot the VM <strong>");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>?</p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("reboot-vm-modal"),
    'hasButtons': ("true"),
    'ok': ("rebootVm")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/shutdown-vm-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>Are you sure you want to shutdown <strong>");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>? </p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("shutdown-vm-modal"),
    'hasButtons': ("true"),
    'ok': ("shutdownVm"),
    'param': ("model")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING",'param': "ID"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0,'param': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["modals/start-vm-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <p>Are you sure you want to start the VM <strong>");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>?</p>\n");
  return buffer;
  }

  stack1 = (helper = helpers['reveal-modal'] || (depth0 && depth0['reveal-modal']),options={hash:{
    'id': ("start-vm-modal"),
    'hasButtons': ("true"),
    'ok': ("startVm")
  },hashTypes:{'id': "STRING",'hasButtons': "STRING",'ok': "STRING"},hashContexts:{'id': depth0,'hasButtons': depth0,'ok': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "reveal-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["scroll-wrap"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.ItemsListView", {hash:{
    'sidebar': (true)
  },hashTypes:{'sidebar': "BOOLEAN"},hashContexts:{'sidebar': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["tags-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['tag-el'] || (depth0 && depth0['tag-el']),options={hash:{
    'title': ("tag.name"),
    'color': ("tag.color"),
    'deleteTag': ("deleteTag"),
    'param': ("tag")
  },hashTypes:{'title': "ID",'color': "ID",'deleteTag': "STRING",'param': "ID"},hashContexts:{'title': depth0,'color': depth0,'deleteTag': depth0,'param': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "tag-el", options))));
  data.buffer.push("\n");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "tag", "in", "tags", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["toggle-lt-bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("...");
  
});

Ember.TEMPLATES["wizard/header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<em><span>");
  stack1 = helpers._triageMustache.call(depth0, "view.indexToDisplay", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></em>\n<p><strong>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong> ");
  stack1 = helpers._triageMustache.call(depth0, "subtitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>");
  return buffer;
  
});

Ember.TEMPLATES["wizard/image-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				<dt>Kernel</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "kernel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n	<div class=\"img-col\"><img src=\"\" alt=\"image\"></div>\n	<a href=\"\" class=\"name-col\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n	<div class=\"size-col\">");
  data.buffer.push(escapeExpression((helper = helpers['bytes-to-human'] || (depth0 && depth0['bytes-to-human']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "size", options) : helperMissing.call(depth0, "bytes-to-human", "size", options))));
  data.buffer.push("</div>\n	<div class=\"btn-col\">");
  data.buffer.push(escapeExpression((helper = helpers['btn-span'] || (depth0 && depth0['btn-span']),options={hash:{
    'class': ("wrap-a"),
    'content': ("details")
  },hashTypes:{'class': "STRING",'content': "STRING"},hashContexts:{'class': depth0,'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "btn-span", options))));
  data.buffer.push("</div>\n\n</div>\n<div class=\"details\">\n	<div class=\"row\">\n		<h3>Image metadata</h3>\n		<dl>\n			<dt>Description [here?]</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Owner</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "view.ownerEmail", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>OS</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.os", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>OS Family</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.osfamily", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			");
  stack1 = helpers['if'].call(depth0, "kernel", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			<dt>GUI</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.gui", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Users</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.users", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Size</dt><dd>");
  data.buffer.push(escapeExpression((helper = helpers['bytes-to-human'] || (depth0 && depth0['bytes-to-human']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "size", options) : helperMissing.call(depth0, "bytes-to-human", "size", options))));
  data.buffer.push("</dd>\n			<dt>Status</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Created at</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "created_at", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Updated at</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "updated_at", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Root partition</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.root_partition", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n			<dt>Partition table</dt><dd>");
  stack1 = helpers._triageMustache.call(depth0, "properties.partition_table", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n		</dl>\n	</div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["wizard/menu-option"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<a href=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "menuAction", "view.menuAction", "view.actionValue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>");
  return buffer;
  
});

Ember.TEMPLATES["wizard/menu"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n		");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.WizardMenuOptionView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<ul>\n	");
  stack1 = helpers.each.call(depth0, "options", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["wizard/step-1"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n		");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.WizardImageView", {hash:{
    'image': ("")
  },hashTypes:{'image': "ID"},hashContexts:{'image': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<ul class=\"os\">\n	");
  stack1 = helpers.each.call(depth0, "controllers.vmsCreate.image", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["wizard/step-2"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("\n<div class=\"row\">\n	<form class=\"custom\">\n	  <select class=\"medium\">\n	    <option class=\"el5\">Basic Project</option>\n	    <option>Project 2</option>\n	    <option>Project 3</option>\n	  </select>\n	</form>\n	<ul class=\"flavor\">\n		<li>\n			<div class=\"title\">\n				<span class=\"snf-chip-outline snf-font\"></span>\n				<h2>\n					CPU<span> (x cores)</span>\n					<em>Choose number of CPU cores</em>\n				</h2>\n				<p>HOVER EXPLANATORY TEXT Volumes residing on our custom storage layer Archipelago, supporting fast VM spawning with cloning. Will also support Volume snapshotting really soon.</p>\n			</div>\n			<div class=\"options-bar\">\n				<div class=\"bar\">\n					<div class=\"wrap\">\n						<div class=\"container\">\n							<!-- width percentages do not correspond to actual mesurements -->\n							<div class=\"total\" style=\"width:60%\">\n								<div class=\"current\" style=\"width:30%\"></div>\n								<span>60%</span>\n							</div>\n						</div>\n					</div>\n				</div>\n				<ul class=\"options with-flavor\">\n					<li><a href=\"\" class=\"small current preselected \" data-help=\"help text for 1\">1</a></li>\n					<li><a href=\"\" class=\"medium\" data-help=\"help text for 2\">2</a></li>\n					<li><a href=\"\" class=\"large disabled\" data-help=\"help text for 3\">3</a></li>\n					<li><a href=\"\" class=\"disabled\" data-help=\"help text for 4\">4</a></li>\n				</ul>\n			</div>\n		</li>\n		<li>\n			<div class=\"title\">\n				<span class=\"snf-ram-outline snf-font\"></span>\n				<h2>\n					Memory Size \n					<span> (MB)</span>\n					<em>Choose memory size</em>\n				</h2>\n				<p>HOVER EXPLANATORY TEXT Volumes residing on our custom storage layer Archipelago, supporting fast VM spawning with cloning. Will also support Volume snapshotting really soon.</p>\n			</div>\n			<div class=\"options-bar\">\n				<div class=\"bar\">\n					<div class=\"wrap\">\n						<div class=\"container\">\n							<!-- width percentages do not correspond to actual mesurements -->\n							<div class=\"total\" style=\"width:60%\">\n								<div class=\"current\" style=\"width:30%\"></div>\n								<span>60%</span>\n							</div>\n						</div>\n					</div>\n				</div>\n				<ul class=\"options with-flavor\">\n					<li><a href=\"\" class=\"small current preselected\">1024</a></li>\n					<li><a href=\"\" class=\"medium\">2048</a></li>\n					<li><a href=\"\" class=\"large\">4096</a></li>\n				</ul>\n			</div>\n		</li>\n		<li>\n			<div class=\"title\">\n				<span class=\"snf-volume-outline snf-font\"></span>\n				<h2>\n					Disk Size<span> (GB)</span>\n					<em>Choose disk size</em>\n				</h2>\n				<p>HOVER EXPLANATORY TEXT Volumes residing on our custom storage layer Archipelago, supporting fast VM spawning with cloning. Will also support Volume snapshotting really soon.</p>\n			</div>\n			<div class=\"options-bar\">\n				<div class=\"bar\">\n					<div class=\"wrap\">\n						<div class=\"container\">\n							<!-- width percentages do not correspond to actual mesurements -->\n							<div class=\"total low\" style=\"width:40%\">\n								<div class=\"current\" style=\"width:80%\"></div>\n								<span>40%</span>\n							</div>\n						</div>\n					</div>\n				</div>\n				<ul class=\"options with-flavor\">\n					<li><a href=\"\" class=\"small current preselected\">10</a></li>\n					<li><a href=\"\" class=\"medium\">20</a></li>\n					<li><a href=\"\" class=\"large\">30</a></li>\n					<li><a href=\"\">40</a></li>\n				</ul>\n			</div>\n		</li>\n		<li>\n			<div class=\"title\">\n				<span class=\"snf-volume-outline snf-font\"></span>\n				<h2>\n					Storage\n					<em>Select storage type</em>\n				</h2>\n				<p>HOVER EXPLANATORY TEXT Volumes residing on our custom storage layer Archipelago, supporting fast VM spawning with cloning. Will also support Volume snapshotting really soon.</p>\n			</div>\n			<div class=\"options-bar\">\n				<div class=\"bar\">\n					<div class=\"wrap  disabled-progress-bar\">\n						<div class=\"container\">\n							<!-- width percentages do not correspond to actual mesurements -->\n							<div class=\"total\" style=\"width:100%\">\n								<div class=\"current\" style=\"width:0%\"></div>\n								<span></span>\n							</div>\n						</div>\n					</div>\n				</div>\n				<ul class=\"options vm-storage-selection\">\n					<li><a href=\"\" class=\"current preselected\">DRBD</a></li>\n					<li><a href=\"\" data-next=\"el3\">Archipelago</a></li>\n				</ul>\n			</div>\n		</li>\n	</ul>\n</div>");
  
});

Ember.TEMPLATES["wizard/step-3"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"advanced-conf-step\">\n	<div class=\"adv-main row\">\n		<div class=\"name\">\n			<h2>Machine name</h2>\n			<span class=\"input\">\n				<input type=\"text\" placeholder=\"My Ubuntu Server\" class=\"el7\">\n			</span>\n		</div>\n		<div class=\"expand-btn\">\n			<a class=\"expand-arrow\" href=\"\">\n				Advanced Configuration\n				<span class=\"snf-arrow-down preselected\"></span>\n			</a>\n		</div>\n	</div>\n	<div class=\"advanced-conf-options\">\n		<div class=\"ssh-keys-area area\">\n			<div class=\"row\">\n				<h2>Public SSH keys</h2>\n				<p>Your account contains the following SSH public keys. Select one or more to activate in your new machine. You will then be able to ssh with the corresponding private key without a password.\"</p>\n				<ul>\n					<li class=\"trigger-checkbox\">\n						<h3>My public key long name one </h3>\n						<a href=\"\" class=\"check\">\n							<span class=\"snf-checkbox-unchecked\"></span>\n						</a>\n					</li>\n					<li class=\"trigger-checkbox\">\n						<h3>Other public key </h3>\n						<a href=\"\" class=\"check\">\n							<span class=\"snf-checkbox-unchecked\"></span>\n						</a>\n					</li>\n					<li class=\"trigger-checkbox\">\n						<h3>My public key long name one </h3>\n						<a href=\"\" class=\"check\">\n							<span class=\"snf-checkbox-unchecked\"></span>\n						</a>\n					</li>\n				</ul>\n				<div>\n					<a href=\"\" class=\"btn5 wrap-a\" data-reveal-id=\"sshkeys-wizard\" title=\"set data-reveal-id: sshkeys-wizard\">manage ssh keys</a>\n				</div>\n			</div>\n		</div>\n		<div class=\"networks-area area\">\n			<h2 class=\"row\">Networks</h2>\n			<ul>\n				<li class=\"trigger-checkbox row has-more select-net\">\n					<h3 class=\"\">\n						<span class=\"net-icons\">\n							<span class=\"temp-line line1\"></span>\n							<span class=\"snf-www\"></span>\n							<span class=\"snf-network-full\"></span>\n						</span>\n						Public Network\n					</h3>\n					<a href=\"\" class=\"check\"><span class=\"snf-checkbox-checked prechecked\"></span></a>\n				</li>\n				<li class=\"more\">\n					<div class=\"row\">\n						<div class=\"trigger-checkbox clearfix\">\n							<h3>192.168.2.3</h3>\n							<a href=\"\" class=\"check\"><span class=\"snf-checkbox-checked prechecked\"></span></a>\n						</div>\n						<div class=\"trigger-checkbox clearfix\">\n							<h3>192.168.2.3</h3>\n							<a href=\"\" class=\"check\"><span class=\"snf-checkbox-unchecked\"></span></a>\n						</div>\n						<div class=\"trigger-checkbox clearfix\">\n							<h3>192.168.2.3</h3>\n							<a href=\"\" class=\"check\"><span class=\"snf-checkbox-unchecked\"></span></a>\n						</div>\n						<div>\n							<a href=\"\" class=\"btn5 wrap-a\">allocate ip</a>\n						</div>\n					</div>\n				</li>\n				<li class=\"trigger-checkbox row select-net\">\n					<h3 class=\"net-name\">\n						<span class=\"net-icons\">\n							<span class=\"temp-line line1\"></span>\n							<span class=\"temp-line line2\"></span>\n							<span class=\"snf-www\"></span>\n							<span class=\"snf-router-outline\"></span>\n							<span class=\"snf-network-full\"></span>\n						</span>\n						Routed Network\n					</h3>\n					<a href=\"\" class=\"check\">\n						<span class=\"snf-checkbox-unchecked\"></span>\n					</a>\n				</li>\n				<li class=\"trigger-checkbox row select-net\">\n					<h3 class=\"net-name\">\n						<span class=\"net-icons\">\n							<span class=\"snf-network-full\"></span>\n						</span>\n						Private Network 1\n					</h3>\n					<a href=\"\" class=\"check\">\n						<span class=\"snf-checkbox-unchecked\"></span>\n					</a>\n				</li>\n				<li class=\"trigger-checkbox row select-net\">\n					<h3 class=\"net-name\">\n						<span class=\"net-icons\">\n							<span class=\"snf-network-full\"></span>\n						</span>\n						Private Network 2\n					</h3>\n					<a href=\"\" class=\"check\">\n						<span class=\"snf-checkbox-unchecked\"></span>\n					</a>\n				</li>\n			</ul>\n		</div>\n		<div class=\"tags-area area\">\n			<div class=\"row\">\n				<h2>Tags</h2>\n				<p>Dude use your tags like you eat your cereal.<br>You can color code them as well</p>\n				<ul>\n					<li>\n						<h3>My tags</h3>\n						<span>select</span>\n					</li>\n					<li class=\"trigger-checkbox\">\n						<h3>\n							<span class=\"tag-demo tag4\"></span>\n							Operating system\n						</h3>\n						<a href=\"\" class=\"check\"><span class=\"snf-checkbox-unchecked\"></span></a>\n					</li>\n					<li class=\"trigger-checkbox\">\n						<h3>\n							<span class=\"tag-demo tag5\"></span>\n							Pirate PC1\n						</h3>\n						<a href=\"\" class=\"check\"><span class=\"snf-checkbox-unchecked\"></span></a>\n					</li>\n					<li class=\"trigger-checkbox\">\n						<h3>\n							<span class=\"tag-demo tag6\"></span>\n							Pirate PC1\n						</h3>\n						<a href=\"\" class=\"check\"><span class=\"snf-checkbox-unchecked\"></span></a>\n					</li>\n				</ul>\n				<div ><a class=\"btn5 show-add-tag wrap-a\" href=\"\" id=\"show-add-tag\">add new Tag</a></div>\n				<div class=\"snf-color-picker\">\n					<form action=\"#\" method=\"post\">\n						<div id=\"picker-1\">\n							<div class=\"farbtastic\">\n								<div class=\"color\" style=\"background-color: rgb(255, 0, 21);\"></div>\n								<div class=\"wheel\"></div>\n								<div class=\"overlay\"></div>\n								<div class=\"h-marker marker\" style=\"left: 90px; top: 13px;\"></div>\n								<div class=\"sl-marker marker\" style=\"left: 87px; top: 114px;\"></div>\n							</div>\n						</div>\n						<div class=\"form-item\">\n							<input type=\"text\" id=\"color-1\" class=\"color-preview\" name=\"color\" value=\"#16C1E9\" disabled>\n							<span class=\"input\"><input class=\"tag_name\" type=\"text\" placeholder=\"My Tag\"></span>\n						</div>\n					</form>\n					<div class=\"btns\">\n						<a class=\"btn5 wrap-a\" href=\"\">OK</a>\n						<a class=\"btn5 hide-add-tag wrap-a\" href=\"\">CANCEL</a>\n					</div>\n					<a href=\"\" id=\"hide-add-tag-dummy\" style=\"position:relative;top:50px\">&nbsp;</a>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>");
  
});

Ember.TEMPLATES["wizard/step-4"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"summary\">\n	<div class=\"row\">\n		<div class=\"wrap\">\n			<dl>\n				<dt><span class=\"snf-pc-full snf-font\"></span>Machine name</dt>\n				<dd>handsome frank</dd>\n			</dl>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"wrap\">\n			<dl>\n				<dt>Image</dt>\n				<dd>Fedora</dd>\n				<dt>Name</dt>\n				<dd>Debian Base</dd>\n				<dt>Desciption</dt>\n				<dd>open suse description open suse description open suse description open suse description open suse description</dd>\n				<dt>os</dt>\n				<dd>Debian</dd>\n				<dt>Size</dt>\n				<dd>10.4GB</dd>\n				<dt>GUI</dt>\n				<dd>No GUI</dd>\n				<dt>Kernel</dt>\n				<dd>2.3.4</dd>\n			</dl>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"wrap\">\n			<h2>Flavor</h2>\n			<dl>\n				<dt><span class=\"snf-chip-outline snf-font\"></span>CPUs</dt>\n				<dd>4x</dd>\n				<dt><span class=\"snf-ram-outline snf-font\"></span>Memory</dt>\n				<dd>512 MB</dd>\n				<dt><span class=\"snf-volume-outline snf-font\"></span>Disk</dt>\n				<dd>4GB</dd>\n				<dt><span class=\"snf-volume-outline snf-font\"></span>Storage Type</dt>\n				<dd>DRBD</dd>\n			</dl>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"wrap\">\n			<dl>\n				<dt>Machine Tags</dt>\n				<dd>Database server</dd>\n				<dt>SSH Keys</dt>\n				<dd>\n					my public key 1<br>\n					my public key 3<br>\n				</dd>\n				<dt>IPs</dt>\n				<dd>192.168.1.3<br>192.168.1.3</dd>\n				<dt>Private networks</dt>\n				<dd>No private networks selected</dd>\n			</dl>\n		</div>\n	</div>\n</div>");
  
});

Ember.TEMPLATES["wizard/step-header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<em><span>");
  stack1 = helpers._triageMustache.call(depth0, "view.index", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></em>\n<p><strong>");
  stack1 = helpers._triageMustache.call(depth0, "view.content.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong> ");
  stack1 = helpers._triageMustache.call(depth0, "view.content.subtitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>");
  return buffer;
  
});

Ember.TEMPLATES["wizard/wizard-vm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n						");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.WizardHeaderView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n					");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.WizardMenuView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n			");
  return buffer;
  }

  data.buffer.push("<div id=\"vm-wizard\" class=\"overlay-div wizard\">\n	<div class=\"top\">\n			<div class=\"numbers\">\n				<div class=\"row\">\n					");
  data.buffer.push(escapeExpression((helper = helpers['close-wizard'] || (depth0 && depth0['close-wizard']),options={hash:{
    'action': ("resetClose")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "close-wizard", options))));
  data.buffer.push("\n					<ul class=\"nums\">\n					");
  stack1 = helpers.each.call(depth0, "headers", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					</ul>\n				</div>\n			</div>\n			<div class=\"row menus\">\n			");
  stack1 = helpers.each.call(depth0, "menus", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n		</div>\n		<div class=\"middle\">\n			<div class=\"steps\">\n				");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "WizardVmStep1", "WizardVmStep1", options) : helperMissing.call(depth0, "render", "WizardVmStep1", "WizardVmStep1", options))));
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "WizardVmStep2", "WizardVmStep2", options) : helperMissing.call(depth0, "render", "WizardVmStep2", "WizardVmStep2", options))));
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "WizardVmStep3", "WizardVmStep3", options) : helperMissing.call(depth0, "render", "WizardVmStep3", "WizardVmStep3", options))));
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "WizardVmStep4", "WizardVmStep4", options) : helperMissing.call(depth0, "render", "WizardVmStep4", "WizardVmStep4", options))));
  data.buffer.push("\n			</div>\n		</div>\n		<div class=\"bottom\">\n			<div class=\"row\">\n				");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.WizardBtnBackView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Snf.WizardBtnNextView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n			</div>\n		</div>\n</div>");
  return buffer;
  
});