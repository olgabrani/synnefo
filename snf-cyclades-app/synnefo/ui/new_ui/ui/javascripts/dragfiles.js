function bytesToSize(bytes) {
    var sizes = [ 'n/a', 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return  (bytes / Math.pow(1024, i)).toFixed( 0 ) + sizes[ isNaN( bytes ) ? 0 : i+1 ];
}

;(function( $, window, document, undefined ){

  // our constructor
  var Dragfiles = function( elem, options ){
      this.elem = elem;
      this.options = options;
    };

  // the plugin prototype
  Dragfiles.prototype = {    
    defaults: {
      dictIntroMessage: 'Drag and Drop your files here',
      dictRemoveFile: 'Remove File',
      dictFilesUploading: ' file(s) uploading'
    },
    
    files: [],
    
    init: function() {
      
      var self = this;
      // Introduce defaults that can be extended either 
      // globally or using an object literal. 
      this.config = $.extend({}, this.defaults, this.options);

      // Sample usage:
      // Set the message per instance:
      // $('#elem').dragfiles({ dictRemoveFile: 'Get it out!'});
      // or
      // var p = new Dragfiles(document.getElementById('elem'), 
      // { dictRemoveFile: 'Get it out!'}).init()
      // or, set the global default message:
      // Dragfiles.defaults.dictRemoveFile = 'Get it out!'

      console.log('this.elem',this.elem);
      
      $(this.elem).on('dragenter',function(e){
        self.dragenter(e);
      });

      $(this.elem).on('dragleave',function(e){
        self.dragleave(e);
      });

      $(this.elem).on('dragover',function(e){
        self.dragover(e);
      });

      $(this.elem).on('drop',function(e){
        self.drop(e);
      });

      $('input[type=file]').on('change',function (e) {
        window.test = e;
        self.addfiles( e.originalEvent.target.files );
        self.fileSelectHandler(e);
      });

      $('.remove a').on('click',function (e) {
        e.preventDefault();
        alert('k');
      });

      return this;

    },

    dragenter: function(e){
      console.log('Dragenter');
    },

    dragleave: function(e){
      console.log('Dragleave');
      $(this.elem).removeClass('drag');
    },

    dragover: function(e){
      e.stopPropagation();
      e.preventDefault();
      console.log('Dragover');
      $(this.elem).addClass('drag');
    },

    drop: function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this.elem).removeClass('drag');
      this.addfiles(e.originalEvent.dataTransfer.files)
      this.fileSelectHandler(e);
    },

    fileSelectHandler: function (e){
      $('.storage-progress .summary').html(this.files.length + this.config.dictFilesUploading);
      $('.storage-progress').slideDown();
      this.parseFiles(this.files);
    },

    parseFiles: function(files) {
      var txt ='';
      var self = this;
      var list = $('.storage-progress .items-list');
      list.find('li').remove();

      _.map(files, function(f, index) {
        var txt = '';
        txt += '<li>';
        txt += '<div class="img-wrap">';
        txt += '<img src="images/icon-txt.png" alt="" />';
        txt += '</div>';
        txt += '<h4>'+ f.name +'</h4>';
        txt += '<div class="size">'+ bytesToSize(f.size) +'</div>';
        txt += '<div class="progress-col"><div class="progress">';
        txt += '<span class="meter" style="width: 30%">30%</span>';
        txt += '</div></div>';
        txt += '<div class="remove"><a href="">X <em>Remove</em></a></div>';
        txt += '</li>';
        el = $(txt);
        el.find("a").on('click', _.bind(function(e) {
          e.preventDefault();
          console.log(index);
          console.log("F", f);
          this.removefile(f.name);       
        }, this));

        list.append(el);
      }, this);
      this.listFiles();
    },

    removefile: function(file) {
      console.log(file);
      var index = this.files.indexOf(file);
      if (index > -1) {
        this.files.splice(index, 1);
      }
    },

    addfile : function(file) {
      this.files.push(files);
    },

    addfiles: function(files) {
      for (var i = 0, f; f = files[i]; i++) {
        this.files.push(f);
      }
    },

    listFiles : function() {
      console.log(this.files);
    },

  }

  Dragfiles.defaults = Dragfiles.prototype.defaults;

  $.fn.dragfiles = function(options) {
    return this.each(function() {
      new Dragfiles(this, options).init();
    });
  };

})( jQuery, window , document );


$(document).ready(function(){
  $('#drop').dragfiles();
})