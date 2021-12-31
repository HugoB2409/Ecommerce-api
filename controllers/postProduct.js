const handleProductPost = (req, res, db) => {
  addProductInfo(req.body, db);
  req.body.images.forEach((element) => {
    addProductImaget(element, db);
  });
  res.send("Succes");
};

addProductInfo = (data, db) => {
  const query = {
    text: `INSERT INTO products ("ProductName", "ProductShortDescription", "ProductDescription", "ProductPrice",
    "ProductStock", "ProductWeight", "ProductDimension", "ProductThumbnail")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [
      data.ProductName,
      data.ProductShortDescription,
      data.ProductLongDescription,
      data.ProductPrice,
      data.ProductStock,
      data.ProductWeight,
      data.ProductDimension,
      data.thumbnail,
    ],
  };

  db.query(query).catch((e) => console.error(e.stack));
};

addProductImaget = (data, db) => {
  const query = {
    text: `INSERT INTO products_image ("ProductID", "ImageURL") SELECT MAX("ProductId"),$1 FROM products`,
    values: [data],
  };

  db.query(query).catch((e) => console.error(e.stack));
};

module.exports = {
  handleProductPost,
};
