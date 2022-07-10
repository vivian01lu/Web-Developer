module.exports.isLoggedIn = (req, res, next) => {
    console.log("REQ.USER...", req.user);
    //passport起作用：it is going to be automatically filled in with the deserialized info from the session

    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to be signed in!');
        return res.redirect('/login');
    }
    next();
}