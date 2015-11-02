'use strict';

app.factory('Dashboard', function(FURL, $firebase, $q) {
	var ref = new Firebase(FURL);

	var Dashboard = {
		
		getTasksForUser: function(uid) {
			var defer = $q.defer();
			var taskForUser = $firebase(ref.child('user_tasks').child(uid))
				.$asArray();
			
			taskForUser.$loaded()
				.then(function(tasks) {	
					console.log("__dashboard.js_getTasksForUser")
					console.log("$asArray() === tasks" + (taskForUser === tasks));				
					defer.resolve(tasks);
				}, function(err) {
					defer.reject();
				});

			return defer.promise;
		}
	};

	return Dashboard;
});