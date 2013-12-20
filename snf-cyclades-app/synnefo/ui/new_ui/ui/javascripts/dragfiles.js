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
      dictremoveFile: 'Remove File',
      dictFilesUploading: ' file(s) uploading',
      dictLastUpdated: 'Last updated: ',
      dictAllFilesUploaded: 'No more files to upload!',
    },
    
    files: [],
    
    init: function() {
      var self = this;
      // Introduce defaults that can be extended either 
      // globally or using an object literal. 
      this.config = $.extend({}, this.defaults, this.options);

      // Sample usage:
      // Set the message per instance:
      // $('#elem').dragfiles({ dictremoveFile: 'Get it out!'});
      // or
      // var p = new Dragfiles(document.getElementById('elem'), 
      // { dictremoveFile: 'Get it out!'}).init()
      // or, set the global default message:
      // Dragfiles.defaults.dictremoveFile = 'Get it out!'

      // temporary
      folders = new Array();
      for(var i=0; i<$(this.elem).find('.storage.entities>.items-list>li').length ; i++) {
        folders[i] = [];
      }
      
      $(this.elem).on('dragenter',function(e){
        self.dragEnter(e);
      });

      $(this.elem).on('dragleave',function(e){
        self.dragLeave(e);
      });

      $(this.elem).on('dragover',function(e){
        self.dragOver(e);
      });

      $(this.elem).on('drop',function(e){
        self.drop(e);
      });

      // folder specific events
      $(this.elem).find('.folder').on('dragover', function(e){
        $(this).addClass('draghover');
      });

      $(this.elem).find('.folder').on('dragleave', function(e){
        $(this).removeClass('draghover');
      });

      $(this.elem).find('.folder').on('drop',function(e){
        console.log($(this).data('path'), 'path');
        $(this).removeClass('draghover');
        var index = $(this).index();
        if($(this).hasClass('updated')) {
          if(folders[index].length > 1) {
            clearTimeout(folders[index][1]);
          }
          clearTimeout(folders[index][0]);
        }
        else if($(this).hasClass('updating')) {
          if(folders[index].length > 1) {
            clearTimeout(folders[index][1]);
          }
          clearTimeout(folders[index][0]);
        }
        self.resetFolder(this);
        self.updateFolder(this);
      });

      $('input[type=file]').on('change',function (e) {
        window.test = e;
        self.addFiles( e.originalEvent.target.files );
        self.fileSelectHandler(e);
      });

      $('.remove a').on('click',function (e) {
        e.preventDefault();
        alert('k');
      });

      return this;

    },
    // temporary
    updateFolder: function(folder) {
      var folderIndex = $(folder).index();
      $(folder).find('.img-wrap span').hide();
      $(folder).addClass('updating');
      folders[folderIndex][0] = setTimeout(function() {
        $(folder).removeClass('updating');
        $(folder).addClass('updated');
        folders[folderIndex][1] = setTimeout(function() {
          $(folder).removeClass('updated');
          $(folder).find('.img-wrap span').show();
        }, 500);
      }, 1000);
    },
    // temporary
    resetFolder : function(folder) {
      $(folder).find('.img-wrap span').hide();
      $(folder).removeClass('updated');
      $(folder).removeClass('updating');
    },

    dragEnter: function(e){
      console.log('Dragenter');
    },

    dragLeave: function(e){
      console.log('Dragleave');
      $(this.elem).find('#drop').removeClass('drag');
    },

    dragOver: function(e){
      e.stopPropagation();
      e.preventDefault();
      // console.log('Dragover');
      $(this.elem).find('#drop').addClass('drag');
    },

    drop: function(e){
      e.stopPropagation();
      e.preventDefault();
      var self = this;
      $(this.elem).find('#drop').removeClass('drag');
      this.addFiles(e.originalEvent.dataTransfer.files)
      this.fileSelectHandler(e);
      setTimeout( function(){
        self.fileUploaded(self.files[0])
        self.removeFileFromFiles(self.files[0], $('.storage-progress .items-list li').last());
      } ,1000);
    },

    fileSelectHandler: function (e){
      $('.storage-progress').slideDown();
      this.parseFiles(this.files);
    },

    parseFiles: function(files) {
      var txt ='';
      var self = this;
      var list = $('.storage-progress .items-list');
      var summary = $('.storage-progress .summary');
      list.find('li').remove();
      if (this.files.length> 0 ) {
        summary.html('<span>'+this.files.length +'</span>'+ this.config.dictFilesUploading);
      } else {
        summary.html(this.config.dictAllFilesUploaded);
      }
      summary.find('span').addClass('animated');
      setTimeout(function(){
        summary.find('span').removeClass('animated');
      }, 500)
      _.map(files, function(f, index) {
        var txt = '';
        txt += '<li>';
        txt += '<div class="img-wrap">';
        txt += '<span class="'+ ui.mimeToExt(f.type) +'"></span>';
        txt += '</div>';
        txt += '<h4>'+ f.name +'</h4>';
        txt += '<div class="size">'+ bytesToSize(f.size) +'</div>';
        txt += '<div class="progress-col"><div class="progress">';
        txt += '<span class="meter" style="width: 30%">30%</span>';
        txt += '</div></div>';
        txt += '<div class="remove"><a href="" title="'+this.config.dictremoveFile+'">x</a></div>';
        txt += '</li>';
        el = $(txt);
        el.find("a").on('click', _.bind(function(e) {
          e.preventDefault();
          el.fadeOut('slow');
          var li = $(e.target).parents('li');
          this.removeFileFromFiles(f, li);
        }, this));
        list.append(el);
      }, this);

      if (this.files.length <= 0){
        setTimeout( this.removeArea(), 1000);
      }
    },

    removeArea: function(){
      var el = $('.storage-progress');
      el.addClass('ready');
      setTimeout( function(){
        el.fadeOut('slow', function(){
          el.removeClass('ready');
        });

      } ,4000);
    },

    removeFileFromFiles: function(file, li) {
      var self = this;
      li.fadeOut('slow', function(){
        self.parseFiles(self.files);
      });
      var index = this.files.indexOf(file);
      if (index > -1) {
        this.files.splice(index, 1);
      }
    },

    addFile : function(file) {
      this.files.push(files);
    },

    addFiles: function(files) {
      for (var i = 0, f; f = files[i]; i++) {
        this.files.push(f);
      }
    },

    listFiles : function() {
      console.log(this.files);
    },

    fileUploaded: function(file) {
      var txt = '';
      txt += '<li class="with-checkbox">';
      txt += '<div class="check"><span class="snf-checkbox-unchecked"></span></div>';
      txt += '<div class="img-wrap">';
      txt += '<span class='+ ui.mimeToExt(file.type) +'></span>';
      txt += '</div>';
      txt += '<h4>'+ file.name +'</h4>';
      txt += '<div class="size">'+ bytesToSize(file.size) +'</div>';
      txt += '<div class="info">'+ this.config.dictLastUpdated + date_ddmmmyytime(file.lastModifiedDate) +'</div>';
      txt += '<div class="actions-col"></div>';
      txt += '</li>';
      el = $(txt);
      $(this.elem).find('#drop').append(el);
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
  $('.body-wrapper').dragfiles();
})