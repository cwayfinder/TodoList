Ext.define('TD.store.Projects', {
	extend: 'Ext.data.Store',

	pageSize: 50,
	model: 'TD.model.Project',
	proxy: Ext.create('TD.data.ProjectProxy')
});