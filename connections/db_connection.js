const { Client } = require("pg");

const client = new Client(process.env.DB_CONNECTION_STRING);

client.connect();

module.exports = client;
