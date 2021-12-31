const handleCustomersGet = (req, res, db) => {
  const query = {
    text: `WITH total as (SELECT COUNT(*) FROM orders GROUP BY CONCAT("FirstName", ' ', "LastName")) 
    SELECT DISTINCT ON(CONCAT("FirstName", ' ', "LastName"))  "FirstName", "LastName", "State", "Country", "total" FROM orders, total GROUP BY "OrderId", "total"`,
  };

  db.query(query)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleCustomersGet,
};
