Ext.define('TD.LabelEditor', {
    extend: 'Ext.Editor',

    autoSize: {
        width: 'field'
    },
    height: 24,
    offsets: [0, 0],
    alignment: 'l-l',
    field: {
        width: 500,
        name: 'displayfield',
        allowBlank: false,
        xtype: 'textfield',
        selectOnFocus: true
//            maxLength: 20,
//            enforceMaxLength: true
    },

    shadow: false,
    completeOnEnter: true,
    cancelOnEsc: true,
    updateEl: true,
    ignoreNoChange: false
});