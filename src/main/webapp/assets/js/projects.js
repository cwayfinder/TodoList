Ext.Loader.setConfig({
	enabled: true,         // Allow dynamic loading of JavaScript files
	disableCaching: true,  // Disable random parameter in the URL's path
	paths: {
		'Ext': '.',
		'TD': '/TodoList/assets/js/app'
	}
});

Ext.require([
	'TD.model.User',
	'TD.model.Task',
	'TD.model.Project',
	'TD.data.ProjectProxy'
]);

var user;

Ext.onReady(function () {
	var viewport = Ext.create('TD.container.Viewport');

	Ext.create('TD.store.Projects', {
		storeId: 'projectsStore'
	});


	var authController = Ext.create('TD.controller.Auth');
	authController.init();

	var projectController = Ext.create('TD.controller.Project');
	projectController.init();


	Ext.Ajax.request({
		url: 'user.json',
		success: function (response) {
			var text = response.responseText;
			var json = Ext.decode(text);

			if (json.success) {
				user = Ext.create('TD.model.User', json.data);

				viewport.down('panel').removeAll();
				viewport.add(Ext.create('TD.view.TopPanel'));
				viewport.add(Ext.create('TD.view.FooterPanel'));

				viewport.down('#topPanel').setUserName(user.get('email'));

				Ext.data.StoreManager.lookup('projectsStore').loadPage(1);
			} else {
				viewport.down('panel').add(Ext.create('TD.form.LoginPanel'));
			}
		}
	});
});