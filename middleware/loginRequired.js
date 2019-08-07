function loginRequired(req, res, next){
    if(!req.session.userID){
        req.session.message = "You are not logged in. Please log in to add a new venue."
        res.redirect('/users/login')
    }
    else{
        next();
    }
}

module.exports = loginRequired;