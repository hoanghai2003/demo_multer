const mysql = require("mysql");
// create connection to database
const conectionMySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "lists",
  password: "12345678",
});
// tao ket noi va kiem tra

conectionMySQL.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("ket noi thanh cong");
  }
});
module.exports = conectionMySQL;
