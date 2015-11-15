'use strict';
var chalk = require('chalk');


/* FOR LOGGING IN GOOD MANNER
Meanjs import: var path = require('path'), phlog = require(path.resolve('./config/lib/services/phuc-server-helper.js')).logger.log;
*/
var logger = {
  log: function() {

    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * '));
    for (var i = 0; i < arguments.length; i++) {
      if (i % 2 === 0) {
        console.log(chalk.cyan(arguments[i]));
      } else {
        console.log(chalk.green(arguments[i]));
      }

    }
    return logger;
  },
  next: function(arg) {
    console.log();
    for (var i = 0; i < arguments.length; i++) {
      if (i % 2 === 0) {
        console.log(chalk.cyan(arguments[i]));
      } else {
        console.log(chalk.green(arguments[i]));
      }
    }
    return logger;
  },
  end: function() {
    console.log(chalk.magenta('---------------------------------------------------------------------------------------------'));
  },
  line: function() {
    console.log(chalk.yellow('---------------------------------------------------------------------------------------------'));
    
  },
  keys: function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(chalk.green(key));
      }
    }
    return logger;
  },
  props: function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(chalk.green('\n---' + key));
        console.log(chalk.green(obj[key]));
      }
    }
    return logger;
  }
};

module.exports = {
  logger: logger
};