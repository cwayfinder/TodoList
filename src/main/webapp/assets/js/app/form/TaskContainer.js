Ext.define('TD.form.TaskContainer', {
    extend: 'Ext.form.FieldContainer',

    cls: "white-background",
    overCls: "over-background",
    fieldBodyCls: 'task-container',
    frame: true,
    hideLabel: true,
    combineErrors: true,
    layout: 'hbox',
    defaults: {
        margin: 5
    },
    items: [ {
        xtype: 'checkbox',
        width: 30,
        baseCls: 'task-checkbox-wrapper',
        fieldCls: 'task-checkbox',
        action: 'changeTaskStatus'
    }, {
        xtype: 'displayfield',
        entityType: 'task',
        flex: 1
    }, {
        xtype: 'button',
        width: 50,
        name: 'edit',
        text: 'Edit',
        action: 'editTask'
    }, {
        xtype: 'button',
        width: 50,
        name: 'delete',
        text: 'Delete',
        action: 'deleteTask'
    }, {
		xtype: 'datefield',
		cls: 'datefield',
		name: 'deadline',
		width: 100
	} ],

	initComponent: function(){
		this.callParent(arguments)
		this.addEvents({
			'draganddrop' : true
		});
	},

	listeners: {
//		'draganddrop': function() {
//			console.log(arguments);
//		},
		render: function (v) {
			v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

				//      On receipt of a mousedown event, see if it is within a draggable element.
				//      Return a drag data object if so. The data object can contain arbitrary application
				//      data, but it should also contain a DOM element in the ddel property to provide
				//      a proxy to drag.
				getDragData: function (e) {
//					var sourceEl = e.getTarget(v.itemSelector, 10), d;
					var sourceEl = this.getEl();
					if (sourceEl) {
//						d = sourceEl.cloneNode(true);
//						d.id = Ext.id();
						return this.dragData = {
							sourceEl: sourceEl,
							repairXY: Ext.fly(sourceEl).getXY(),
//							ddel: d
							ddel: sourceEl
						};
//						return this.dragData;
					}
				},

				//      Provide coordinates for the proxy to slide back to on failed drag.
				//      This is the original XY coordinates of the draggable element.
				getRepairXY: function () {
					return this.dragData.repairXY;
				}
			});





			v.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

//      If the mouse is over a target node, return that node. This is
//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
				getTargetFromEvent: function(e) {
//					return e.getTarget('.hospital-target');
//					return e.currentTarget;
					return this.getEl();
				},

//      On entry into a target node, highlight that node.
				onNodeEnter : function(target, dd, e, data){
					Ext.fly(target).addCls('hospital-target-hover');
				},

//      On exit from a target node, unhighlight that node.
				onNodeOut : function(target, dd, e, data){
					Ext.fly(target).removeCls('hospital-target-hover');
				},

//      While over a target node, return the default drop allowed class which
//      places a "tick" icon into the drag proxy.
				onNodeOver : function(target, dd, e, data){
					return Ext.dd.DropZone.prototype.dropAllowed;
				},

//      On node drop, we can interrogate the target node to find the underlying
//      application object that is the real target of the dragged data.
//      In this case, it is a Record in the GridPanel's Store.
//      We can use the data set up by the DragZone's getDragData method to read
//      any data we decided to attach.
				onNodeDrop : function(target, dd, e, data){
//					var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
//						mainRow = rowBody.previousSibling,
//						h = gridView.getRecord(mainRow),
//						targetEl = Ext.get(target);
//
//					targetEl.update(data.patientData.name + ', ' + targetEl.dom.innerHTML);
//					Ext.Msg.alert('Drop gesture', 'Dropped patient');

					var source = Ext.getCmp(data.sourceEl.id);
					var dest = Ext.getCmp(this.getEl().id);

					var form = dest.up('form');



					var sourceIndex = form.items.indexOf(source);
					var destIndex = form.items.indexOf(dest);

//					var swap = form.items.items[sourceIndex];
//					form.items.items[sourceIndex] = form.items.items[destIndex];
//					form.items.items[destIndex] = swap;

//					form.remove(sourceIndex, false);
//
//					form.insert(destIndex, source);
//
//					form.doLayout();
//					source.doLayout();
//					dest.doLayout();

					source.fireEvent('draganddrop', {cmp: source, sourceIndex: sourceIndex - 2, destIndex: destIndex - 2});
//					source.fireEvent('draganddrop');

					return true;
				},

				onDragDrop: function() {
		console.log('onDragDrop');
				}
			});
		}
	}

});