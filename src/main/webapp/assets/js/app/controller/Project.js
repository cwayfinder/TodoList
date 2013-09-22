Ext.define('TD.controller.Project', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'mainPanel',
        selector: 'viewport > panel'
    }],

    init: function() {
        'use strict';

		var projectNameEditor = Ext.create('TD.LabelEditor', {
			name: 'projectNameEditor'
		});

		var taskTextEditor = Ext.create('TD.LabelEditor', {
			name: 'taskTextEditor'
		});

		var store = Ext.data.StoreManager.lookup('projectsStore');
		store.addListener('load', function(store, records) {
				records.forEach(function(item, index, array) {
					var form = this.createProjectForm(item);

					var panel = this.getMainPanel();
					panel.add(form);
					panel.scrollBy(0, panel.getHeight());

					var projectId = item.get('id');

					form.projectId = projectId;
					form.store.getProxy().url = 'projects/' + projectId + '/tasks';
					form.store.load();
					form.store.getProxy().url = 'tasks';
				}, this);
		}, this);


        this.control({
            'button[action=addTask]': {
                click: function(btn) {
                    var field = btn.up('form').down('textfield');
                    this.addTaskHandler(field);
                }
            },
            'button[action=editTask]': {
                click: function(btn) {
                    var field = btn.up('fieldcontainer').down('displayfield');
                    taskTextEditor.startEdit(field.getEl().down('.x-form-display-field'));
                }
            },
            'button[action=deleteTask]': {
                click: function(btn) {
                    var cont = btn.up('fieldcontainer');
                    var id = cont.taskId;

                    var form = btn.up('form');
                    if (id !== 'null') {
						var index = form.store.find('id', id);
						var task = form.store.getAt(index);
						var priority = task.get('priority');
						form.store.removeAt(index);
                        form.store.sync();

						form.store.each(function(item, index, count) {
							if (item.get('priority') >= priority) {
								item.set('priority', item.get('priority') - 1)
							}
						}, this);
                    }

                    form.remove(cont, true);
                }
            },
            'checkbox[action=changeTaskStatus]': {
                change: function(checkbox, newValue, oldValue, eOpts) {
                    var tasksStore = checkbox.up('form').store;
                    var id = checkbox.up('fieldcontainer').taskId;

                    var task = tasksStore.findRecord('id', id);
                    task.set('done', newValue);

                    tasksStore.sync();
                }
            },
            'datefield[name=deadline]': {
                change: function(datefield, newValue, oldValue, eOpts) {
                    var tasksStore = datefield.up('form').store;
                    var id = datefield.up('fieldcontainer').taskId;

                    var task = tasksStore.findRecord('id', id);
                    task.set('deadline', newValue);

                    tasksStore.sync();

					datefield.removeCls('blank-datefield');
                }
            },
            'button[action=addProject]': {
                click: function(btn) {
                    var form = this.createProjectForm();

                    var panel = this.getMainPanel();
                    panel.add(form);
                    panel.scrollBy(0, panel.getHeight());

                    var field = form.down('displayfield');
                    projectNameEditor.startEdit(field.getEl().down('.x-form-display-field'));
                }
            },
            'button[action=editProject]': {
                click: function(btn) {
                    var cont = btn.up('fieldcontainer');
                    var field = cont.down('displayfield');

                    projectNameEditor.startEdit(field.getEl().down('.x-form-display-field'));
                }
            },
            'button[action=deleteProject]': {
                click: function(btn) {
                    var cont = btn.up('form');
                    var id = cont.projectId;

                    if (id !== 'null') {
                        store.removeAt(store.find('id', id));
                        store.sync();
                    }

					this.getMainPanel().remove(cont, true);
                }
            },
            'textfield[name=newTaskText]': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER) {
                        this.addTaskHandler(field);
                    }
                }
            },
            'editor[name=projectNameEditor]': {
                complete: function(editor, value) {
                    var cmp = Ext.getCmp(editor.boundEl.up('.x-field').id);
                    var form = cmp.up('form');
                    var id = form.projectId;

                    var project;
                    if (id === 'null') {
                        project = Ext.create('TD.model.Project');
                        project.addListener('idchanged', function(model, oldId, newId) {
                            form.projectId = newId;
                        });
                        store.add(project);
                    } else {
                        project = store.findRecord('id', id);
                    }

                    project.set('name', value);
                    store.sync();
                }
            },
            'editor[name=taskTextEditor]': {
                complete: function(editor, value) {
                    var cmp = Ext.getCmp(editor.boundEl.up('.x-field').id);
                    var form = cmp.up('form');
                    var id = cmp.up('container').taskId;
                    var tasksStore = form.store;

                    var task;
                    if (id === 'null') {
                        task = Ext.create('TD.model.Task');
                        task.set('projectId', form.projectId);
                        task.addListener('idchanged', function(model, oldId, newId) {
                            cmp.up('container').taskId = newId;
                        });
                        tasksStore.add(task);
                    } else {
                        task = tasksStore.findRecord('id', id);
                    }

                    task.set('text', value);
                    tasksStore.sync();
                }
            },
			'fieldcontainer': {
				'draganddrop': function(e) {
					var form = e.cmp.up('form');

					var oldPriority = (form.store.count() - e.sourceIndex - 1);
					var newPriority = (form.store.count() - e.destIndex - 1);

					var itemIndex = form.store.find('priority', oldPriority);
					form.store.changeItemPriority(itemIndex, newPriority);

					form.remove(e.cmp);
					var task = form.store.getAt(itemIndex);
					this.addTask(form, task, e.destIndex);
				}
			}
        });
    },

    createProjectForm: function(project) {
        var form = Ext.create('TD.form.ProjectPanel', {

            projectId: (project && project.get('id')) || "null",

            store: Ext.create('TD.store.Tasks')
        });

        form.store.addListener('load', function(store, records) {
            var controller = this;
            store.each(function(item, index, array) {
                controller.addTask(form, item);
            });
        }, this);

        form.down('displayfield').setValue((project && project.get('name')) || "Unnamed");

        return form;
    },

    addTaskHandler: function (field) {
        if (field.isValid()) {
            var task = Ext.create('TD.model.Task');
            task.set('text', field.getValue());

            var cont = field.up('form');

            this.addTask(cont, task);


            task.set('projectId', cont.projectId);
            var tasksStore = cont.store;
            tasksStore.add(task);
            tasksStore.sync();


            field.reset();
        }
        field.focus();
    },

    addTask: function(form, task, index) {
		index = index || 0;

        var taskContainer = Ext.create('TD.form.TaskContainer');

//        form.insert(2 + (form.store.count() - task.get('priority') - 1), taskContainer);
        form.insert(2 + index, taskContainer);

        taskContainer.taskId = (task && task.get('id')) ||"null";

        taskContainer.down('displayfield').setValue((task && task.get('text')) || "");
        taskContainer.down('checkbox').setValue(task && task.get('done'));

		var datefield = taskContainer.down('datefield');
		datefield.setValue(task && task.get('deadline'));

		if (task && task.get('deadline')) {
			datefield.removeCls('blank-datefield');
		} else {
			datefield.addCls('blank-datefield');
		}

        task.addListener('idchanged', function(model, oldId, newId) {
            taskContainer.taskId = newId;
        });
    }
});