import 'bower_components/jquery/dist/jquery.min.js';
import Sammy from 'bower_components/sammy/lib/sammy.js';
import {templates} from 'js/templates.js';
import {services} from 'js/services.js';

var app = (function () {
	var sammyApp = new Sammy('#content', function () {
		this.get('#/', function (context) {
			context.redirect('#/home');
		});

		this.get('#/home', function (context) {
			templates.get('home')
				.then(function (template) {
					replaceContent(template());
				})
		});

		this.get('#/register', function (context) {
			templates.get('register')
				.then(function (template) {
					replaceContent(template());

					$('#btn-register').click(function () {
						var user = {
							username: $('#tb-username').val(),
							passHash: $('#tb-password').val()
						};

						services.user.register(user)
							.then(function (res) {
								context.redirect('#/home');
							})
					})

				})
		});

		this.get('#/login', function (context) {
			templates.get('login')
				.then(function (template) {
					replaceContent(template());
				})
				.then(function () {
					$('#btn-submit').click(function () {
						var user = {
							username: $('#tb-username').val(),
							passHash: $('#tb-password').val()
						};

						services.user.login(user)
							.then(function (res) {
								var user = res;
								services.user.setCurrent(user);
								context.redirect('#/home');
							});
					})

				})
		});
	});

	function replaceContent(newHtml) {
		$('#content').empty();
		$('#content').append(newHtml);
	}

	sammyApp.run('#/');
} ());

export {
app
}