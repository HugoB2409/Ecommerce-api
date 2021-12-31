const deleteProduct = (id, res, db) => {
  const query = {
    text: `DELETE from products WHERE "ProductId" = $1`,
    values: [id],
  };

  db.query(query)
    .then((data) => res.send(data.rows))
    .catch((e) => console.error(e.stack));
};

module.exports = {
  deleteProduct,
};
