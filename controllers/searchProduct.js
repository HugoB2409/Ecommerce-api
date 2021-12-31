const handleProductSearch = (input, res, db) => {
  const query = {
    text: `SELECT "ProductId", "ProductName", "ProductShortDescription", "ProductPrice", "ProductThumbnail" from products WHERE "ProductName" LIKE $1`,
    values: ["%" + input + "%"],
  };

  db.query(query)
    .then((data) => res.send(data.rows))
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleProductSearch,
};
