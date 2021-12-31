const handleOrderGet = (id, res, db) => {
  const query = {
    text: `SELECT o."OrderId", o."FirstName", o."LastName", o."Address1", o."Address2", o."City",
     o."State",o."Zip", o."Country", json_agg(json_build_object('ID',op."ProductId", 'Name',p."ProductName")) productId
     FROM orders o 
     LEFT JOIN orders_product op 
     ON o."OrderId" = op."OrderId" 
     
     JOIN products p ON op."ProductId" = p."ProductId" WHERE o."OrderId" = $1 GROUP BY o."OrderId"`,
    values: [id],
  };

  db.query(query)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleOrderGet,
};
