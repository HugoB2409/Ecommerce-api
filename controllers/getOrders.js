const handleOrdersGet = (req, res, db) => {
  const query = {
    text: `SELECT o."OrderId", o."FirstName", o."LastName", COUNT(op."ProductId") FROM orders o JOIN orders_product op ON o."OrderId" = op."OrderId" GROUP BY o."OrderId"`,
  };

  db.query(query)
    .then((data) => res.send(data.rows))
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleOrdersGet,
};
