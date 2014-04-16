var statusActionsImage = {
    'available'      : {
        enabledActions : ['destroy'],
    },
};

var available_os_icons = ['windows', 'kubuntu', 'fedora'];

// included some properties of the received json
Snf.Image = DS.Model.extend({
    name: DS.attr(),
    status: DS.attr(),
    disk_format: DS.attr(),
    location: DS.attr(),  
    size: DS.attr('number'),
    created_at: DS.attr(),// should be date
    updated_at: DS.attr(),// should be date
    deleted_at: DS.attr(),// should be date
    is_public: DS.attr('boolean'),
    sortorder: DS.attr('number'),
    properties: DS.attr('raw'),

  /*
    properties include:
    partition_table
    kernel
    osfamily
    users // maybe more than one
    gui
    sortorder
    os
    root_partition
    description
  */

    enabledActions: function() {
        return statusActionsImage[this.get('status')].enabledActions;
    }.property('status'),

    os: function(){
        if (_.contains(available_os_icons, this.get('properties.os'))){
            return this.get('properties.os');
        } else {
            return 'unknown';
        } 
    }.property(),


});


Snf.Image.FIXTURES =
[{
    "status": "available",
    "location": "pithos://u53r-1d/images/my/path/example_image_build.diskdump",
    "name": "ubuntu",
    "disk_format": "diskdump",
    "container_format": "bare",
    "created_at": "2013-03-29 14:14:34",
    "deleted_at": "",
    "id": "5583ffe1-5273-4c84-9e32-2fbe476bd7b7",
    "size": 2622562304,
    "is_public": "True",
    "checksum": "a387aaaae583bc65daacf12d6be502bd7cfbbb254dcd452f92ca31f4c06a9208",
    "properties": {
        "partition_table": "msdos",
        "kernel": "3.8.3",
        "osfamily": "linux",
        "users": "root user",
        "gui": "GNOME 3.4.2",
        "sortorder": "5",
        "os": "fedora",
        "root_partition": "1",
        "min_ram": 512,
        "description": "Fedora release 17 (Beefy Miracle)"}
}, {
    "location": "pithos://0th3r-u53r-1d/images/ubuntu_10_04.diskdump",
    "status": "available",
    "name": "Ubuntu-10.04",
    "disk_format": "diskdump",
    "container_format": "bare",
    "id": "907ef618-c03a-4473-9914-9348e12890c1",
    "size": 761368576,
    "created_at": "2013-03-29 14:14:34",
    "deleted_at": ""
}];