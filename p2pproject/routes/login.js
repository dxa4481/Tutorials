/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 7/6/13
 * Time: 11:52 PM
 * To change this template use File | Settings | File Templates.
 */





// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};