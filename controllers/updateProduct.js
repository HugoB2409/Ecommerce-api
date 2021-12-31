const handleProductUpdate = (req, id, res, db) => {
  deleteImage(id, db);
  updateProductInfo(req.body, id, db);
  req.body.images.forEach((element) => {
    addProductImage(element, id, db);
  });
};

addProductImage = (data, id, db) => {
  const query = {
    text: `INSERT INTO products_image ("ProductID", "ImageURL") VALUES ($1, $2)`,
    values: [id, data],
  };
  db.query(query).catch((e) => console.error(e.stack));
};

const deleteImage = (id, db) => {
  const query = {
    text: `DELETE FROM products_image WHERE "ProductID" = $1`,
    values: [id],
  };
  db.query(query).catch((e) => console.error(e.stack));
};

const updateProductInfo = (info, id, db) => {
  const query = {
    text: `UPDATE products SET "ProductName" = $1, "ProductShortDescription" = $2, "ProductDescription" = $3, "ProductPrice" = $4,
    "ProductStock" = $5, "ProductWeight" = $6, "ProductDimension" = $7, "ProductThumbnail" = $8 
    WHERE "ProductId" = $9`,
    values: [
      info.ProductName,
      info.ProductShortDescription,
      info.ProductLongDescription,
      info.ProductPrice,
      info.ProductStock,
      info.ProductWeight,
      info.ProductDimension,
      info.thumbnail,
      id,
    ],
  };
  db.query(query).catch((e) => console.error(e.stack));
};

module.exports = {
  handleProductUpdate,
};
