/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //_____ph_old '/': {    view: 'homepage'  }
  'GET /': {    view: 'login'  },//GET: decide to turn to another URL here
  'GET /signup': {    view: 'signup'  },
  'GET /dashboard': 'DashController.checkUser', //GET: decide to turn to another URL at server
  'POST /signup': 'UserController.signup',// POST: send parameter from client to server to update database. Server doesn't decide to return  another URL or value to controller at client in this case
  'PUT /login': 'UserController.login', // PUT: send parameter from client to server and server handles these values . Server doesn't decide to return  another URL or value to controller at client in this case
  'GET /getuser': 'DashController.getUser', // GET: server return a result for client handle such as USER_INFO, or it decide to turn to other view
  'GET /logout': 'UserController.logout'
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
