const handleLogin = (req, res, db, jwt) => {
  const { username, password } = req.body;

  const query = {
    text: `SELECT "UserId", "Username", "Password" from users WHERE "Username" = $1`,
    values: [username],
  };

  db.query(query)
    .then((data) => {
      if (password === data.rows[0].Password) {
        var payload = {
          data1: "Data 1",
          data2: "Data 2",
          data3: "Data 3",
          data4: "Data 4",
        };

        sOptions = {
          issuer: "Authorization/Resource/This server",
          subject: "iam@user.me",
          audience: "Client_Identity", // Devrait etre fournit par le client
        };

        const token = jwt.sign(payload, sOptions);

        res.send(token);
      } else {
        res.status(400).json("wrong credential");
      }
    })
    .catch((e) => console.log(e));
};

module.exports = {
  handleLogin,
};
