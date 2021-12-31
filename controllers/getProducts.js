const handleProductsGet = (req, res, db) => {
  const query = {
    text: `SELECT "ProductId", "ProductName", "ProductShortDescription", "ProductPrice", "ProductThumbnail", "ProductStock", to_char("ProductUpdateDate", 'DD Mon YYYY') "ProductUpdateDate" from products`,
  };

  db.query(query)
    .then((data) => res.send(data.rows))
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleProductsGet,
};
