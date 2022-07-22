const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
    //we will render some template that doestn't exist
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registerUser = await User.register(user, password);

        //加入了之后可以直接register后登录
        req.login(registerUser, err => {//Passport exposes a login method,can be automatically log in the nearly registered user 
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');

}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
}