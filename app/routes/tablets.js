'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var tabletLog = require('../../app/controllers/tabletLog');



    app.route('/schools/get_all.json').get(tabletLog.getSchool);

    app.route('/machines/sign_in.json').post(tabletLog.tabletLogin);

    app.route('/machines/check_token').get(tabletLog.checkToken);






};
