// protect the routes middleware function
const protectedRoute = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

// guest routes middleware function
const guestRoute = (req, res, next) =>{
    if (req.session.user){
        return res.redirect('/profile');
    }
    next();
}

module.exports = {
    protectedRoute,
    guestRoute
};
