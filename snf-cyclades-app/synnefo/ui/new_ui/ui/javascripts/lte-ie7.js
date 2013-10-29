/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'snf-font\'">' + entity + '</span>' + html;
	}
	var icons = {
			'snf-twitter-off-black' : '&#x67;',
			'snf-cancel-circled' : '&#x63;',
			'snf-checkbox-checked' : '&#x62;',
			'snf-checkbox-unchecked' : '&#x61;',
			'snf-ok' : '&#x68;',
			'snf-ban-circle' : '&#x6a;',
			'snf-ok-sign' : '&#x6c;',
			'snf-minus-sign' : '&#x6e;',
			'snf-edit-1' : '&#x71;',
			'snf-HDD' : '&#x75;',
			'snf-network' : '&#x76;',
			'snf-PC' : '&#x77;',
			'snf-PC_fill' : '&#x78;',
			'snf-Pithos' : '&#x79;',
			'snf-DASHboard' : '&#x7a;',
			'snf-eye' : '&#x41;',
			'snf-radio-checked' : '&#x42;',
			'snf-radio-unchecked' : '&#x43;',
			'snf-close' : '&#x44;',
			'snf-cpu' : '&#x45;',
			'snf-lock_closed' : '&#x46;',
			'snf-lock_open' : '&#x47;',
			'snf-modem' : '&#x48;',
			'snf-www' : '&#x49;',
			'snf-ram' : '&#x4a;',
			'snf-network_full' : '&#x4b;'
			'snf-arrow-up' : '&#x4c;',
			'snf-arrow-down' : '&#x4d;' /* rename of snf-arrow-right */
			'snf-list' : '&#x51;',
			'snf-layout' : '&#x52;',
			'snf-search' : '&#x50;'
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