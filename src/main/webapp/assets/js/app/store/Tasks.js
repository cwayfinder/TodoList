Ext.define('TD.store.Tasks', {
	extend: 'Ext.data.Store',

	pageSize: 50,
	model: 'TD.model.Task',
	proxy: Ext.create('TD.data.TaskProxy'),
	sorters: [{
		property: 'priority',
		direction: 'ASC'
	}],

	changeItemPriority: function(index, priority) {
		console.log('-----------------------------------------------------');
		var task = this.getAt(index);
		console.log(task.get('text') + ': ' + task.get('priority') + ' > ' + priority);
		console.log('---');

		this.each(function(item, index, count) {
			console.log(item.get('text') + ': ' + item.get('priority'));
		}, this);

		if (task.get('priority') < priority) {
			this.each(function(item, index, count) {
				if (item.get('priority') > task.get('priority') && item.get('priority') <= priority) {
					item.set('priority', item.get('priority') - 1)
					console.log(item.get('text') + ' <<');
				}
			}, this);
		} else if (task.get('priority') > priority) {
			this.each(function(item, index, count) {
				if (item.get('priority') < task.get('priority') && item.get('priority') >= priority) {
					item.set('priority', item.get('priority') + 1)
					console.log(item.get('text') + ' >>');
				}
			}, this);
		}


		task.set('priority', priority);

		console.log('---');

		this.each(function(item, index, count) {
			console.log(item.get('text') + ': ' + item.get('priority'));
		}, this);

		this.sync();
	}
});