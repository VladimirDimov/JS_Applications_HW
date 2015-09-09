var todosControler = (function() {
	return {
		get: {
			all: function(context) {
				services.todos.getAll()
					.then(function(res) {
						var todos = res.result;

						templates.get('todos')
							.then(function(template) {
								context.$element().html(template(todos));

								$('.chb-state').on('click', function() {
									var updatedTodo = {
										id: $(this).attr('data'),
										state: this.checked
									}

									services.todos.update(updatedTodo)
										.then(function(res) {
											//TODO
										});
								});
							})
					});
			}
		},
		add: function(context) {
			templates.get('todos-add')
				.then(function(template) {
					context.$element().html(template());

					$('#btn-add').on('click', function() {
						var todo = {
							text: $('#tb-text').val(),
							category: $('#tb-category').val()
						}

						services.todos.add(todo)
							.then(function(res) {
								toastr.success('New todo added in category: ' + todo.category);
							})
							.catch(function(err) {
								toastr.success('Error adding todo in category: ' + todo.category);
							})
					});
				});
		}
	}
})();