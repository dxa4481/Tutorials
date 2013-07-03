// handler for homepage
exports.home = function(req, res) {
    // if user is not logged in, ask them to login
    if (typeof req.session.username == 'undefined') res.render('home', { title: 'Ninja Store'});
    // if user is logged in already, take them straight to the items list
    else res.redirect('/items');
};

exports.poo = function(req, res){
    res.render('home', {title: 'poo'})
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};
