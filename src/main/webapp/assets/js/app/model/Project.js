Ext.define('TD.model.Project', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'name'],
    validations: [{
        type: 'length',
        field: 'name',
        min: 1
    }]
});