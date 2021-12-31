require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const client = require("./connections/db_connection");
const stripe = require("./connections/stripe_connection");
const products = require("./controllers/getProducts");
const getProduct = require("./controllers/getProductData");
const addProduct = require("./controllers/postProduct");
const addOrder = require("./controllers/postOrder");
const getOrders = require("./controllers/getOrders");
const getCustomers = require("./controllers/getCustomers");
const getOrderData = require("./controllers/getOrderData");
const getCustomerData = require("./controllers/getCustomerData");
const updateProduct = require("./controllers/updateProduct");
const deleteProduct = require("./controllers/deleteProduct");
const checkToken = require("./controllers/checkToken");
const handlePayment = require("./controllers/handlePayment");
const login = require("./controllers/login");
const upload = require("./controllers/upload");
const jwt = require("./controllers/jwt");
const searchProduct = require("./controllers/searchProduct");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log("running on port " + port);
});

app.post("/login", (req, res) => {
  login.handleLogin(req, res, client, jwt);
});

app.post("/upload", upload.array("file", 1), (req, res) => {
  res.send(req.files[0].location);
});

app.post("/newItem", (req, res) => {
  addProduct.handleProductPost(req, res, client);
});

app.post("/newOrder", (req, res) => {
  addOrder.handleOrderPost(req, res, client);
});

app.post("/updateItem/:id", (req, res) => {
  updateProduct.handleProductUpdate(req, req.params.id, res, client);
});

app.get("/search/:query", (req, res) => {
  searchProduct.handleProductSearch(req.params.query, res, client);
});

app.get("/images", (req, res) => {
  if (checkToken.checkToken(req, jwt)) {
    products.handleProductsGet(req, res, client);
  } else {
    res.send("bad token");
  }
});

app.get("/productImage", (req, res) => {
  products.handleProductsGet(req, res, client);
});

app.get("/orders", (req, res) => {
  getOrders.handleOrdersGet(req, res, client);
});

app.get("/customers", (req, res) => {
  getCustomers.handleCustomersGet(req, res, client);
});

app.get("/product/:id", (req, res) => {
  getProduct.handleProductGet(req.params.id, res, client);
});

app.get("/order/:id", (req, res) => {
  getOrderData.handleOrderGet(req.params.id, res, client);
});

app.get("/customers/:id", (req, res) => {
  getCustomerData.handleCustomerGet(req.params.id, res, client);
});

app.post("/delete/product/:id", (req, res) => {
  deleteProduct.deleteProduct(req.params.id, res, client);
});

app.post("/create-payment-intent", async (req, res) => {
  handlePayment.handlePayment(stripe, res, req, client);
});
