Snf.Router.map(function() {

    this.resource('servers', { path: '/vms/:view_cls' });
    this.resource('serversCreate', { path: '/vms/create' });
    this.resource('serverinit', { path: '/vm'});
    this.resource('server', { path: '/vm/:server_id' }, function () {
        this.route('info');
        this.route('volume-connected');
        this.route('network-connected');
    });

    this.resource('networks', {path: '/networks/:view_cls'});
    this.resource('networksCreate', { path: '/networks/create' });
    this.resource('networkinit', { path: '/network'});
    this.resource('network', { path: '/network/:network_id' }, function () {
        this.route('info');
        this.route('server-connected');
    });

    this.resource('volumes', {path: '/volumes/:view_cls'});
    this.resource('volumesCreate', { path: '/volumes/create' });
    this.resource('volumeinit', { path: '/volume'});
    this.resource('volume', { path: '/volume/:volume_id' }, function () {
       this.route('info');
       this.route('server-connected', { path: '/server-connected'});
    });

    this.resource('images', { path: '/images/:view_cls' });
    this.resource('imageinit', { path: '/image'});
    this.resource('image', { path: '/image/:image_id' }, function () {
        this.route('info');
    });

    this.resource('snapshots', { path: '/snapshots/:view_cls' });

    this.resource('storage');
    this.resource('container', {path: 'container/:node_id'});
});