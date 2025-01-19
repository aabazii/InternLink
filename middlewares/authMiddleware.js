// protect the routes middleware function
const protectedRoute = (req, res, next) => {
    if (!req.session.user && !req.session.company) {
        return res.redirect('/login');
    }
    next();
}

// guest routes middleware function
const guestRoute = (req, res, next) =>{
    if (req.session.user ){
        return res.redirect('/profile');
    }
    if (req.session.company){
        return res.redirect('/company/dashboard');
    }
    next();
}

module.exports = {
    protectedRoute,
    guestRoute
};
