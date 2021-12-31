const handleOrderPost = (req, res, db) => {
  addOrderInfo(req.body, db);
  req.body.productsIds.forEach((id) => {
    addOrderProductId(id, db);
  });
  res.send("Succes");
};

addOrderInfo = (data, db) => {
  const query = {
    text: `INSERT INTO orders ("FirstName", "LastName", "Address1", "Address2",
    "City", "State", "Zip", "Country", "Date")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [
      data.firstName,
      data.lastName,
      data.address1,
      data.address2,
      data.city,
      data.state,
      data.zip,
      data.country,
      data.date,
    ],
  };

  db.query(query).catch((e) => console.error(e.stack));
};

addOrderProductId = (data, db) => {
  const query = {
    text: `INSERT INTO orders_product ("OrderId", "ProductId") SELECT MAX("OrderId"),$1 FROM orders`,
    values: [data],
  };

  db.query(query).catch((e) => console.error(e.stack));
};

module.exports = {
  handleOrderPost,
};
