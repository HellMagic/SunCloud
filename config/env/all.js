'use strict';

module.exports = {
	app: {
		title: '阳光书屋|信息化教育平台',
		description: '阳光书屋',
		keywords: '阳光书屋'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/angular-ui-grid/ui-grid.min.css',
				'public/lib/ng-grid/ng-grid.css',
				'public/lib/sweetalert/sweet-alert.css'
			],
			js: [
				//'public/lib/ng-file-upload/angular-file-upload-shim.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/underscore/underscore-min.js',
				//'cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js',
				'public/lib/angular-ui-grid/ui-grid.min.js',
				'public/lib/ng-grid/ng-grid-2.0.13.min.js',
				'public/lib/moment/moment.js',
				'public/lib/bootstrap/dist/js/bootstrap.min.js',
				'public/lib/sweetalert/sweet-alert.min.js',
				'public/lib/angular-file-upload/angular-file-upload.js'
				//'public/lib/ng-file-upload/angular-file-upload.js'




			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
