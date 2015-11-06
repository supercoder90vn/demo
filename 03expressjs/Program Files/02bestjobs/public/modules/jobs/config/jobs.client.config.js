'use strict';

// Configuring the Articles module
angular.module('jobs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Create Job', 'jobs/create');
		
	}
]);