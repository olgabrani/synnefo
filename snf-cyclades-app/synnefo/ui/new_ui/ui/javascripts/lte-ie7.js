/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'snf-font\'">' + entity + '</span>' + html;
	}
	var icons = {
			'snf-trash' : '&#x24;',
			'snf-eye' : '&#x41;',
			'snf-radio-checked' : '&#x42;',
			'snf-radio-unchecked' : '&#x43;',
			'snf-close' : '&#x44;',
			'snf-www' : '&#x49;',
			'snf-arrow-up' : '&#x4c;',
			'snf-arrow-down' : '&#x4d;',
			'snf-checkbox-unchecked' : '&#x61;',
			'snf-checkbox-checked' : '&#x62;',
			'snf-cancel-circled' : '&#x63;',
			'snf-search' : '&#x64;',
			'snf-twitter-logo' : '&#x67;',
			'snf-ok' : '&#x68;',
			'snf-switch' : '&#x69;',
			'snf-ban-circle' : '&#x6a;',
			'snf-ok-sign' : '&#x6c;',
			'snf-minus-sign' : '&#x6e;',
			'snf-edit' : '&#x71;',
			'snf-listview' : '&#x73;',
			'snf-gridview' : '&#x74;',
			'snf-dashboard-outline' : '&#x7a;',
			'snf-pithos-outline' : '&#x79;',
			'snf-info-full' : '&#x70;',
			'snf-volume-create-full' : '&#x36;',
			'snf-image-full' : '&#x51;',
			'snf-pc-create-full' : '&#x53;',
			'snf-network-create-outline' : '&#x54;',
			'snf-network-create-full' : '&#x55;',
			'snf-ram-outline' : '&#x4a;',
			'snf-nic-outline' : '&#x50;',
			'snf-ram-full' : '&#x52;',
			'snf-nic-full' : '&#x72;',
			'snf-network-broken-1-full' : '&#x56;',
			'snf-network-broken-2-full' : '&#x57;',
			'snf-pc-broken-full' : '&#x58;',
			'snf-pc-reboot-full' : '&#x59;',
			'snf-pc-switch-full' : '&#x5a;',
			'snf-key-full' : '&#x31;',
			'snf-router-full' : '&#x32;',
			'snf-chip-full' : '&#x33;',
			'snf-plus-full' : '&#x34;',
			'snf-snapshot-full' : '&#x4e;',
			'snf-pithos-full' : '&#x35;',
			'snf-volume-full' : '&#x4f;',
			'snf-network-full' : '&#x4b;',
			'snf-pc-full' : '&#x78;',
			'snf-network-broken-1-outline' : '&#x37;',
			'snf-network-broken-2-outline' : '&#x38;',
			'snf-pc-broken-outline' : '&#x39;',
			'snf-volume-broken-outline' : '&#x30;',
			'snf-pc-reboot-outline' : '&#x21;',
			'snf-pc-switch-outline' : '&#x40;',
			'snf-key-outline' : '&#x23;',
			'snf-router-outline' : '&#x48;',
			'snf-chip-outline' : '&#x45;',
			'snf-image-outline' : '&#x66;',
			'snf-plus-outilne' : '&#x6d;',
			'snf-snapshot-outline' : '&#x65;',
			'snf-volume-outline' : '&#x75;',
			'snf-network-outline' : '&#x76;',
			'snf-pc-outline' : '&#x77;',
			'snf-info-outline' : '&#x6f;',
			'snf-thunder-full' : '&#x6b;',
			'snf-lock-closed-full' : '&#x46;',
			'snf-lock-open-full' : '&#x47;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/snf-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};