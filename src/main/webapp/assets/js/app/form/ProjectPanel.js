Ext.define('TD.form.ProjectPanel', {
    extend: 'Ext.form.Panel',

    width: 700,
    margin: 20,
    bodyCls: "project-container",
    layout: 'form',
    items: [ {
        xtype: 'fieldcontainer',
        hideLabel: true,
        combineErrors: true,
        cls: "plain-background",
        layout: 'hbox',
        defaults: {
            margin: '10 5 10 5'
        },
        items: [ {
            xtype: 'displayfield',
            entityType: 'project',
            flex: 1,
            fieldStyle : 'color: white; font-size: 20px;',
            allowBlank: false
        }, {
            xtype: 'button',
            width: 50,
            text: 'Edit',
            action: 'editProject'
        }, {
            xtype: 'button',
            width: 50,
            text: 'Delete',
            action: 'deleteProject'
        } ]
    }, {
        xtype: 'fieldcontainer',
        hideLabel: true,
        combineErrors: true,
        layout: 'hbox',
        cls: "action-bar-background",
        defaults: {
            margin: 5
        },
        items: [ {
            xtype: 'textfield',
            name: "newTaskText",
            value: "",
            flex: 1,
            allowBlank: false,
            margin: '4 0 5 5'
        }, {
            xtype: 'button',
            width: 70,
            margin: '5 5 5 0',
            cls: 'add-task-button',
            text: 'Add Task',
            action: 'addTask'
        } ]
    }]
});