'use strict';

angular.module('phApp.version', [
  'phApp.version.interpolate-filter',
  'phApp.version.version-directive'
])

.value('version', '0.1');
