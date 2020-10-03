var express = require("express");
var app = express();
const mysql = require("mysql");

app.get("/", function (req, res) {
  res.send("health set go");
});

// const {
//   User,
// } = require("./main-file-imports/index");
// const User = require('./models/User/user')
// app.use("/api/v1/users", User);

app.use(express.json());

//create database connection
app.use(function (req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mahimagupta",
    database: "digital_nurse_room_operation",
    port: 3306,
  });
  res.locals.connection.connect();
  next();
});

// USER CRUD OPERATIONS
//get all users
app.get("/api/v1/users", (req, res) => {
  let sql = `CALL getAllUsers()`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//get user details
app.get("/api/v1/users/:id", (req, res) => {
  let sql = `CALL getUserDetails(${req.params.id})`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//add new user
app.post("/api/v1/users", (req, res) => {

  let data = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone_number: req.body.phone_number,
    date_created: new Date(),
  };
  let sql = "INSERT INTO users SET ?";
  // let sql = `CALL insertUserRecords(${req.body.name}, ${req.body.age}, ${req.body.email}, ${req.body.phone_number}, ${date}); `;

  res.locals.connection.query(sql, data, (err, results) => {
    if (err) {
      console.log("Error occured:", err);
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 201, error: null, response: results }));
    }
  });
});

//update user details
app.put("/api/v1/users/:id", (req, res) => {
  let sql = "UPDATE users SET email='" + req.body.email;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//Delete a user
app.delete("/api/v1/users/:id", (req, res) => {
  /**
   *  setting inactive flag instead deleting a user's record, in this case, this record should not be visible in get users record, so will improve get users logic as well.
   */

  let sql = "UPDATE users SET inactive= true WHERE id=" + req.params.id;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      // can handle 404 cases separately
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

// Health record CRUD OPERATIONS
//get all health records
app.get("/api/v1/health_records", (req, res) => {
  let sql = `CALL getAllHealthRecords()`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//get health record
app.get("/api/v1/health_records/:id", (req, res) => {
  let sql = `CALL getHealthRecord(${req.params.id})`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//add new health record
app.post("/api/v1/health_records/:episode_id", (req, res) => {
  let data = {
    episode_id: req.params["episode_id"],
    consulation_reason: req.body.consulation_reason,
    visited_date: new Date(),
    prescription_qty: req.body.prescription_qty,
    health_condition: req.body.health_condition,
    medicatation: req.body.medicatation,
    nurse_id: req.body.nurse_id,
    nurse_name: req.body.nurse_name,
  };
  let sql = "INSERT INTO health_records SET ?";
  let query = res.locals.connection.query(sql, data, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//update episode might not needed

//Delete a health record - Might not needed
app.delete("/api/v1/health_records/:id", (req, res) => {
  // let sql = "DELETE FROM health_records WHERE id=" + req.params.id + "";

  let sql = `CALL deleteHealthRecord(${req.params.id})`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

// EPISODE CRUD OPERATIONS
//get all episodes
app.get("/api/v1/episodes", (req, res) => {
  let sql = `CALL getAllEpisodes()`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//get episode by id
app.get("/api/v1/episodes/:id", (req, res) => {
  let sql = `CALL getEpisode(${req.params.id})`;
  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//add new episode
app.post("/api/v1/episodes/:user_id", (req, res) => {
  let data = {
    user_id: req.params["user_id"],
    date_created: new Date(),
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    s3_url: req.body.s3_url,
  };
  let sql = "INSERT INTO episodes SET ?";
  console.log(sql);
  let query = res.locals.connection.query(sql, data, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

//update episode might not needed

//Delete an episodes - Might not needed, should not delete user medical history
// Note: Before deleting an episode, need to remove health record of that episode

app.delete("/api/v1/episodes/:id", (req, res) => {
  let sql = `CALL deleteEpisode(${req.params.id})`;

  let query = res.locals.connection.query(sql, (err, results) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  });
});

// server is running on port 5001
app.listen(5001, function () {
  console.log("Server is up on port 5001!");
});

/**
 * Reporting queries:
 *
 * 1. Number of episodes per user on weekly/monthly basis-
 *
 * Query - select COUNT(id) as user_count from episodes where user_id = 8 and EXTRACT(MONTH FROM date_created) = 10 (Calculated monthly basis)
 *
 *
 *
 * 2. Daily/Weekly/monthly visit to the nurse room.
 *
 * Query - select COUNT(id) as monthly_nurse_room from health_records where nurse_id = 5 and EXTRACT(MONTH FROM visited_date) = 10
 * (Calculating how many users visit to the nurse room Monthly)
 */
