exports.getLogout = (req, res, next) => {
  // protects logout route
  t = [];
  if(!req.isAuthenticated()){
    return res.render("index", { pageTitle: "Home", tasks: t, loggedIn: false });
 };
//  if logged in perform logout
    req.logout();
    res.redirect('/');
  };