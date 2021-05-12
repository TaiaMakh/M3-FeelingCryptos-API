//Used to check if user is logged in or logged out. Allows navigations to private views
module.exports = {
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
            return res.status(403).json({ message: 'Forbidden'});
		}
	},
	isLoggedOut: (req, res, next) => {
		if (req.isAuthenticated()) {
            return res.status(403).json({ message: 'Forbidden'});
		} else {
			next();
		}
	},
};
