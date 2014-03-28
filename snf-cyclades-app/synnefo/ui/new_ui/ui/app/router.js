Snf.Router.map(function() {

    this.resource('vms', { path: '/vms/:view_cls' });
    this.resource('vmsCreate', { path: '/vms/create' });
    this.resource('vminit', { path: '/vm'});
    this.resource('vm', { path: '/vm/:vm_id' }, function () {
        this.route('info');
        this.route('volume-connected');
        this.route('network-connected');
    });

    this.resource('networks', {path: '/networks/:view_cls'});
    this.resource('networksCreate', { path: '/networks/create' });
    this.resource('networkinit', { path: '/network'});
    this.resource('network', { path: '/network/:network_id' }, function () {
        this.route('info');
        this.route('vm-connected');
    });

    this.resource('volumes', {path: '/volumes/:view_cls'});
    this.resource('volumesCreate', { path: '/volumes/create' });
    this.resource('volumeinit', { path: '/volume'});
    this.resource('volume', { path: '/volume/:volume_id' }, function () {
       this.route('info');
       this.route('vm-connected');
    });

});