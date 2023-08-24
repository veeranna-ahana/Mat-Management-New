var mysql = require("mysql2");

var misConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "magodmis",
});

var setupConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "magod_setup",
});

var qtnConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "magodqtn",
});

var mchConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "machine_data",
});

var slsConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "magod_sales",
});

var mtrlConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "magod_mtrl",
});

let misQuery = async (q, callback) => {
  misConn.connect();
  misConn.query(q, (err, res, fields) => {
    if (err) throw err;
    callback(res);
  });
};

let misQueryMod = async (q, callback) => {
  misConn.connect();
  misConn.query(q, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
  });
};

let mtrlQueryMod = async (m, callback) => {
  mtrlConn.connect();
  mtrlConn.query(m, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
  });
};

let setupQuery = (q, callback) => {
  setupConn.connect();
  setupConn.query(q, (err, res, fields) => {
    if (err) throw err;
    callback(res);
  });
};

let setupQueryMod = async (q, callback) => {
  setupConn.connect();
  setupConn.query(q, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
  });
};

let qtnQuery = (q, callback) => {
  // console.log(q);
  qtnConn.connect();
  qtnConn.query(q, (err, res, fields) => {
    if (err) throw err;
    callback(res);
    // return res[0].solution;
  });
};

let qtnQueryMod = (q, callback) => {
  // console.log(q);
  qtnConn.connect();
  qtnConn.query(q, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
    // return res[0].solution;
  });
};

let qtnQueryModv2 = (q, values, callback) => {
  // console.log(q);
  qtnConn.connect();
  qtnConn.query(q, values, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
    // return res[0].solution;
  });
};

let slsQueryMod = (s, callback) => {
  slsConn.connect();
  slsConn.query(s, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
  });
};

let mchQueryMod = (m, callback) => {
  mchConn.connect();
  mchConn.query(m, (err, res, fields) => {
    if (err) callback(err, null);
    else callback(null, res);
  });
};

module.exports = {
  misQuery,
  setupQuery,
  qtnQuery,
  misQueryMod,
  qtnQueryMod,
  qtnQueryModv2,
  slsQueryMod,
  mchQueryMod,
  mtrlQueryMod,
  setupQueryMod,
};
