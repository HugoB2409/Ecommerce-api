const handlePayment = (stripe, res, req, client) => {
  const { items } = req.body;

  calculateOrderAmount(items, client).then(async (data) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data,
      currency: "cad",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};

const calculateOrderAmount = (items, client) => {
  return new Promise(function (resolve, reject) {
    const query = {
      text: `SELECT SUM("ProductPrice") AS total FROM products WHERE "ProductId" = ANY($1)`,
      values: [items],
    };

    client
      .query(query)
      .then((data) => {
        resolve(data.rows[0].total * 100);
      })
      .catch((e) => reject(e.stack));
  });
};

module.exports = {
  handlePayment,
};
