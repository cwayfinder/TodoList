Ext.define('TD.model.Task', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'text', 'projectId', {
        name: 'done',
        type: 'boolean',
        defaultValue: false
    }, {
		name: 'priority',
		type: 'int',
		useNull: true
	}, {
        name: 'deadline',
        type: 'date',
		dateFormat: 'time'
    }],
    validations: [{
        type: 'length',
        field: 'text',
        min: 1
    }]
});