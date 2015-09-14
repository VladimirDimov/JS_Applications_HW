var cookiesControler = (function () {
	function getAll(context) {
		services.cookies.getAll()
			.then(function (res) {
				var allCookies = res.result;
				return showCookies(allCookies, context);
			})
			.then(function () {

				$('.btn-like').on('click', function () {
					var $this = $(this);
					var cookieId = $this.attr('data-id');

					services.cookies.vote(cookieId, 'like')
						.then(function (res) {
							toastr.success('Cookie liked!');
						})
						.catch(function () {
							toastr.success('Error while trying to like cookie!');
						});
				});

				$('.btn-dislike').on('click', function () {
					var $this = $(this);
					var cookieId = $this.attr('data-id');

					services.cookies.vote(cookieId, 'dislike')
						.then(function (res) {
							toastr.success('Cookie disliked!');
						})
						.catch(function () {
							toastr.success('Error while trying to dislike cookie!');
						})
				});

				$('.btn-reshare').on('click', function () {
					var id = $(this).attr('data-id');
					services.cookies.getAll()
						.then(function (res) {
							var selectedCookie = res.result.filter(function (item) {
								return item.id === id;
							})[0];

							templates.get('reshare')
								.then(function (template) {
									context.$element().html(template(selectedCookie));

									$('.btn-reshare').on('click', function () {
										var cookie = {
											text: selectedCookie.text,
											category: selectedCookie.category,
											img: selectedCookie.img
										}

										services.cookies.share(cookie)
											.then(function (res) {
												toastr.success('Cookie reshared!');
											})
									});
								});
						})

				});
			});
	}

	function add(context) {
		templates.get('cookie-add')
			.then(function (template) {
				context.$element().html(template());


				$('#btn-share').on('click', function () {
					var cookie = {
						text: $('#tb-text').val(),
						category: $('#tb-category').val(),
						img: $('#tb-img-url').val()
					}

					validator.validateStringLength(cookie.text, 6, 30, 'Cookie text');
					validator.validateStringLength(cookie.category, 6, 30, 'Cookie category');


					services.cookies.share(cookie)
						.then(function (res) {
							toastr.success('Cookie successfully shared!');
						})
						.catch(function (err) {
							toastr.error('Error while sharing cookie!');
						})
				});
			});
	}

	function getFortune(context) {
		services.cookies.getFortune()
			.then(function (res) {
				var fortuneCookies = res;
				showCookies(fortuneCookies, context);
			})
	}

	function showCookies(cookiesCollection, context) {
		for (var i in cookiesCollection) {
			cookiesCollection[i].shareDateFormatted = helpers.formatDate(cookiesCollection[i].shareDate);
		}

		var promise = new Promise(function (resolve, reject) {
			templates.get('cookies-view')
				.then(function (template) {
					resolve(context.$element().html(template(cookiesCollection)));

					var currentUser = services.user.getCurrent();
					if (!currentUser) {
						$('#pannel-user-options').hide();
						$('.btn-like').hide();
						$('.btn-dislike').hide();
						$('.btn-reshare').hide();
					}

					$('#btn-sort-by-likes').on('click', function () {
						var sortedCookies = cookiesCollection.sort(function (a, b) {
							var likesA = Number(a.likes);
							var likesB = Number(b.likes);
							return likesA - likesB;
						});

						showCookies(sortedCookies, context);
					});

					$('#btn-sort-by-date').on('click', function () {
						var sortedCookies = cookiesCollection.sort(function (a, b) {
							dateA = new Date(a.shareDate);
							dateB = new Date(b.shareDate);

							return dateA - dateB;
						});

						showCookies(sortedCookies, context);
					});

					$('#btn-filter-by-category').on('click', function () {

						context.redirect('#/home?category=' + $('#tb-filter-category').val().toLowerCase());
						// services.cookies.getAll()
						// 	.then(function (res) {
						// 		var allCookies = res.result;

						// 		var searchedCategory = $('#tb-filter-category').val().toLowerCase();

						// 		var filteredCookies = allCookies.filter(function (item) {
						// 			if (searchedCategory === '') {
						// 				cookiesControler.getAll(context);
						// 				return;
						// 			}
						// 			return item.category.toLowerCase() === searchedCategory;
						// 		});

						// 		showCookies(filteredCookies, context);
						// 	});
					});

					$('.btn-like').on('click', function () {
						var $this = $(this);
						var cookieId = $this.attr('data-id');

						services.cookies.vote(cookieId, 'like')
							.then(function (res) {
								toastr.success('Cookie liked!');
							})
							.catch(function () {
								toastr.success('Error while trying to like cookie!');
							});
					});

					$('.btn-dislike').on('click', function () {
						var $this = $(this);
						var cookieId = $this.attr('data-id');

						services.cookies.vote(cookieId, 'dislike')
							.then(function (res) {
								toastr.success('Cookie disliked!');
							})
							.catch(function () {
								toastr.success('Error while trying to dislike cookie!');
							})
					});

					$('.btn-reshare').on('click', function () {
						var id = $(this).attr('data-id');
						services.cookies.getAll()
							.then(function (res) {
								var selectedCookie = res.result.filter(function (item) {
									return item.id === id;
								})[0];

								templates.get('reshare')
									.then(function (template) {
										context.$element().html(template(selectedCookie));

										$('.btn-reshare').on('click', function () {
											var cookie = {
												text: selectedCookie.text,
												category: selectedCookie.category,
												img: selectedCookie.img
											}

											services.cookies.share(cookie)
												.then(function (res) {
													toastr.success('Cookie reshared!');
												})
										});
									});
							})

					});
				});
		});

		return promise;
	}

	return {
		getAll: getAll,
		add: add,
		getFortune: getFortune,
		showCookies: showCookies
	}
} ());