const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const database = require("./Connect-MySQL/mysql");

app.get("/api/v1/customers", (req, res) => {
  const query = "select * from khachhang";

  database.query(query, (err, result) => {
    if (err) {
      console.log("loi truy van ", err);
      res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      res.status(200).json({
        status: "Success",
        data: result,
      });
    }
  });
});

app.post("/api/v1/customers", (req, res) => {
  const {
    userMAKH,
    userHOTEN,
    userDCHI,
    userSODT,
    userNGSINH,
    userNGDK,
    userDOANHSO,
    typeCustomer,
  } = req.body;
  const values = [
    userMAKH,
    userHOTEN,
    userDCHI,
    userSODT,
    userNGSINH,
    userNGDK,
    userDOANHSO,
    typeCustomer,
  ];
  const query =
    "insert into khachhang(userMAKH,userHOTEN,userDCHI,userSODT,userNGSINH,userNGDK,userDOANHSO,typeCustomer) values(?,?,?,?,?,?,?,?)";

  //kiem tra ket noi va lay du lieu
  database.query(query, values, (err, result) => {
    if (err) {
      console.log("loi truy van ", err);
      res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      res.status(200).json({
        status: "Success",
        data: result,
      });
    }
  });
});

app.put("/api/v1/customers/:id", (req, res) => {
  let { userMAKH } = req.params;
  let { userHOTEN, userDCHI, userSODT, userDOANHSO } = req.body;

  console.log(userMAKH, userHOTEN, userDCHI, userSODT, userDOANHSO);

  const query =
    "UPDATE khachhang SET userHOTEN=?, userDCHI=?, userSODT=?, userDOANHSO=? WHERE userMAKH=?";
  // Pass the values from req.body to the query parameters
  database.query(
    query,
    [userHOTEN, userDCHI, userSODT, userDOANHSO, userMAKH],
    (err, result) => {
      if (err) {
        console.log("loi truy van ", err);
        res.status(500).json({
          status: "Failed",
          error: err,
        });
      } else {
        res.status(200).json({
          status: "Success",
          data: result,
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`port http://localhost:${port}`);
});
