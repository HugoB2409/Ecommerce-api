const checkToken = (req, jwt) => {
  vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me",
    audience: "Client_Identity", // Devrait etre fournit par le client
  };

  if (jwt.verify(req.header("authorization"), vOption)) {
    console.log("bon token");
    return true;
  } else {
    console.log("mauvais token");
    return false;
  }
};

module.exports = {
  checkToken,
};
