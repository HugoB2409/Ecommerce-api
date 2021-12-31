const handleProductGet = (id, res, db) => {
  const query = {
    text: `SELECT p."ProductId", p."ProductName", p."ProductShortDescription", p."ProductDescription", p."ProductPrice", p."ProductStock", p."ProductWeight",
     p."ProductDimension", p."ProductThumbnail", array_agg(pi."ImageURL") images
     FROM products p LEFT JOIN products_image pi ON p."ProductId" = pi."ProductID" WHERE p."ProductId" = $1 GROUP BY p."ProductId"`,
    values: [id],
  };

  db.query(query)
    .then((data) => res.send(data.rows[0]))
    .catch((e) => console.error(e.stack));
};

module.exports = {
  handleProductGet,
};
