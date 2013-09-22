Ext.define('TD.controller.Auth', {
	extend: 'Ext.app.Controller',

	refs: [ {
		ref: 'viewport',
		selector: 'viewport'
	}, {
		ref: 'topPanel',
		selector: '#topPanel'
	}, {
		ref: 'mainPanel',
		selector: '#mainPanel'
	}, {
		ref: 'footerPanel',
		selector: '#footerPanel'
	}, {
		ref: 'registrationLink',
		selector: 'box[action=goToRegistration]'
	} ],

	init: function () {
		'use strict';
		this.control({
			'button[action=signIn]': {
				click: function (btn) {
					var viewport = this.getViewport();

					var basic = btn.up('form').getForm();
					if (basic.isValid()) {
						basic.submit({
							success: function(form, action) {
								var text = action.response.responseText;
								var json = Ext.decode(text);

								user = Ext.create('TD.model.User', json.user);

								viewport.down('panel').removeAll();
								viewport.add(Ext.create('TD.view.TopPanel'));
								viewport.add(Ext.create('TD.view.FooterPanel'));

								viewport.down('#topPanel').setUserName(user.get('email'));

								Ext.data.StoreManager.lookup('projectsStore').loadPage(1);
							},
							failure: function(form, action) {
								var emailErrors = basic.owner.down('fieldset[name=emailErrors]');
								emailErrors.removeAll();
								basic.findField('email').getActiveErrors().forEach(function(msg) {
									emailErrors.add({
										value: '<span style="color:#D94E37;">' + msg + '</span>'
									});
								});

								var passwordErrors = basic.owner.down('fieldset[name=passwordErrors]');
								passwordErrors.removeAll();
								basic.findField('password').getActiveErrors().forEach(function(msg) {
									passwordErrors.add({
										value: '<span style="color:#D94E37;">' + msg + '</span>'
									});
								});
							}
						});
					}
				}
			},
			'button[action=signUp]': {
				click: function (btn) {
					var viewport = this.getViewport();
					var basic = btn.up('form').getForm();
					if (basic.isValid()) {
						basic.submit({
							success: function(form, action) {
								var text = action.response.responseText;
								var json = Ext.decode(text);

								user = Ext.create('TD.model.User', json.user);

								viewport.down('panel').removeAll();
								viewport.add(Ext.create('TD.view.TopPanel'));
								viewport.add(Ext.create('TD.view.FooterPanel'));

								viewport.down('#topPanel').setUserName(user.get('email'));

								Ext.data.StoreManager.lookup('projectsStore').loadPage(1);
							},
							failure: function(form, action) {
								var emailErrors = basic.owner.down('fieldset[name=emailErrors]');
								emailErrors.removeAll();
								basic.findField('email').getActiveErrors().forEach(function(msg) {
									emailErrors.add({
										value: '<span style="color:#D94E37;">' + msg + '</span>'
									});
								});

								var passwordErrors = basic.owner.down('fieldset[name=passwordErrors]');
								passwordErrors.removeAll();
								basic.findField('password').getActiveErrors().forEach(function(msg) {
									passwordErrors.add({
										value: '<span style="color:#D94E37;">' + msg + '</span>'
									});
								});
							}
						});
					}
				}
			},
			'button[action=logout]': {
				click: function (btn) {
					var controller = this;
					Ext.Ajax.request({
						url: 'logout.json',
						success: function (response) {
							var text = response.responseText;
							var json = Ext.decode(text);

							if (json.success) {
								user = null;

								controller.getViewport().remove(controller.getTopPanel());
								controller.getViewport().remove(controller.getFooterPanel());
								controller.getMainPanel().removeAll();
								controller.getMainPanel().add(Ext.create('TD.form.LoginPanel'));
							}
						}
					});
				}
			},
			'button[action=showRegistrationPanel]': {
				click: function (btn) {
					this.getViewport().remove(this.getTopPanel());
					this.getViewport().remove(this.getFooterPanel());
					this.getMainPanel().removeAll();
					this.getMainPanel().add(Ext.create('TD.form.RegistrationPanel'));
				}
			},
			'button[action=showLoginPanel]': {
				click: function (btn) {
					this.getViewport().remove(this.getTopPanel());
					this.getViewport().remove(this.getFooterPanel());
					this.getMainPanel().removeAll();
					this.getMainPanel().add(Ext.create('TD.form.LoginPanel'));
				}
			}
		});
	}
});