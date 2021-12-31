const handleCustomerGet = (id, res, db) => {
  const query = {
    text: `SELECT o."OrderId", o."FirstName", o."LastName", o."Address1", o."Address2", o."City",
     o."State",o."Zip", o."Country"
      FROM orders o WHERE CONCAT("FirstName", "LastName") = $1 GROUP BY o."OrderId"`,
    values: [id],
  };

  db.query(query)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleCustomerGet,
};
