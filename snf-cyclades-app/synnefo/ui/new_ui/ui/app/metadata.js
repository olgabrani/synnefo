var statusText ={
    'BUILD'    : 'BUILDING',
    'ACTIVE'   : 'RUNNING',
    'STOPPED'  : 'STOPPED',
    'SHUTOFF'  : 'STOPPED',
    'ERROR'    : 'ERROR',
    'UNKNOWN'  : 'Αn unexpected error has occured',
    'REBOOT'   : 'REBOOTING',
    'REBUILD'  : 'REBUILDING VM',
};

/* Wizards */

Snf.wizards = Ember.Object.create({
  vm: Ember.Object.create({
    // each step must have a headline
    stepsHeaders: [
        {
            title:'Select an OS',
            subtitle:'Choose your preferred image'
        },
        {
            title:'Select CPUs, RAM and Disk Size',
            subtitle:'Available options are filtered based on the selected image'
        },
        {
            title:'Virtual machine custom options',
            subtitle:'tba'
        },
        {
            title:'Confirm your settings',
            subtitle:'Confirm that the options you have selected are correct'
        },
    ],
    stepsMenus: [
        {
            actionName: 'showImageCategory',
            options:['System', 'My images', 'Shared with me', 'Public'] // Snaphots could be in this list
        },
        {
            actionName: 'pickFlavor',
            options: ['Small', 'Medium', 'large']
        }
    ],
    stepsLength: 4
  }),

  network: Ember.Object.create({
    stepsHeaders: [
        {
            title: 'Create new private network',
            subtitle: ''
        }
    ],
    stepsMenus: [],
    stepsLength: 1
  }),
});

Snf.SystemUUIDs = ['5e06c85e-166f-4dec-a5ff-f3931e80a48d'];
