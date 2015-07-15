import Ember from 'ember';
import ResetScrollMixin from 'ui-web/mixins/reset-scroll';

export default Ember.Route.extend(ResetScrollMixin,{
  model: function(params){
    // TODO: get container_id directly
    var containerID = this.modelFor('container').get('id');
    var containerName = this.modelFor('container').get('name');
    var currentPath = params.current_path ? params.current_path : '/';
    this.store.set('container_id', containerID);
    this.store.set('container_name', containerName);
    this.set('current_path', currentPath);
    var self = this;

    window.scrollTo(0,0);

    return this.store.findQueryReloadable('object', {
        path: currentPath,
        container_id: containerID
      }).then(function(objects) {

        // When the server returns an emtpy array should check if the url is valid.
        if(objects.get('length') === 0) {
            // if not direct child of container or a container

            if(currentPath.indexOf('/') !== -1 && currentPath !== '/') {

                var parentPath;
                // remove trailing slash
                if(currentPath.lastIndexOf('/') === (currentPath.length - 1)) {
                    currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
                }

                // remove the last part of the url
                parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
                return self.store.findQueryReloadable('object', {
                    path: parentPath, 
                    container_id:containerID
                  }).then(function(objList) {
                    var ObjListLength = objList.get('length');
                    var exists = false;
                    if(ObjListLength) {
                        objList.forEach(function(object) {
                            var objPath = object.get('id');
                            var objIsDir = object.get('is_dir');
                            var index = objPath.indexOf('/') + 1;
                            objPath = objPath.substring(index);
                            if(objPath === currentPath && objIsDir) {
                                exists = true;
                            }
                        });
                        // if parent dir has an object with path = current
                        if(exists) {
                            return objects;
                        }
                        else {
                            var error = {};
                            error['status'] = 404;
                            self.send('error', error);
                            return undefined;
                        }
                    }
                    // if not existing parent or empty parent dir
                    else {
                        var error = {};
                        error['status'] = 404;
                        self.send('error', error);
                        return undefined;
                    }
                });
            }
            //direct child of container (but not a container)
            else if(currentPath !== '/') {
                return self.store.find('object', {container_id:containerID}).then(function(objList) {
                    var isEmptyDir = false;
                    objList.forEach(function(object) {
                        var objPath = object.get('id');
                        var objIsDir = object.get('is_dir');
                        var index = objPath.indexOf('/') + 1;
                        objPath = objPath.substring(index);

                        if(objPath === currentPath && objIsDir) {
                          isEmptyDir = true;
                        }
                    });
                    if(!isEmptyDir) {
                    var error = {};
                    error['status'] = 404;
                    self.send('error', error);
                    return undefined;
                    }
                return objects;
                });
            }
            return objects;
        }
        // if there are items
        else {
            return objects;
        }
    });
  },
  setupController: function(controller,model){
    controller.set('model', model);
    controller.set('container_id', this.store.get('container_id'));
    controller.set('container_name', this.store.get('container_name'));
    controller.set('current_path', this.get('current_path'));
    controller.set('selectedItems', []);
  },
  actions: {
    refreshRoute: function(){
      this.refresh();
    }
  },


});

