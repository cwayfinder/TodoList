Ext.define('TD.view.FooterPanel', {
	extend: 'Ext.panel.Panel',

	itemId: 'footerPanel',

	region: 'south',
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
	items: [{
		xtype: 'button',
		text: 'Add TODO list',
		margin: 20,
		action: 'addProject'
	}]
});