Ember.Handlebars.helper('status-to-text', function(value) {
  return statusText[value];
}, 'value');


Ember.Handlebars.helper('bytes-to-human',function (bytes) {
  function humanSize(bytes, si) {
      var thresh = si ? 1000 : 1024;
      if(bytes < thresh) return bytes + ' B';
      var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
      var u = -1;
      do {
          bytes /= thresh;
          ++u;
      } while(bytes >= thresh);
      return bytes.toFixed(1)+' '+units[u];
  }
  return humanSize(bytes,true);
}, 'bytes');


Ember.Handlebars.registerHelper('tolower', function(str) {
    return str.toLowerCase();
});
