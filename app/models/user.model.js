const sql = require("./db.js");
const tb_name = 'users';

// Constructor
const User = function(user) {
  this.title = user.title;
  this.surname = user.surname;
  this.lastname = user.lastname;
  this.phoneNumber = user.phoneNumber;
  this.email = user.email;
  this.rankNum = user.rankNum;
  this.pmKey = user.pmKey;
  this.token = user.token;
  this.other = user.other;
};

User.create = (user, result) => {
  let stmt = "INSERT INTO " + tb_name + "(title,surname,lastname,phoneNumber,email,rankNum,pmKey) VALUES(?,?,?,?,?,?,?)";
  let todo = [user.title, user.surname, user.lastname, user.phoneNumber, user.email, user.rankNum, user.pmKey];
  sql.query(stmt, todo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { userId: res.insertId, ...user });
    result(null, { userId: res.insertId, ...user });
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM " + tb_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.getAllWithSurname = (surname, result) => {
  let query = "SELECT * FROM " + tb_name;
  if (surname) {
    query += " WHERE surname LIKE '%" + surname + "%'";
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.findById = (userId, result) => {
  sql.query("SELECT * FROM " + tb_name + " WHERE userId = '" + userId + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the userId
    result({ kind: "not_found" }, null);
  });
};

User.findByPmKeyAndSurname = (pmKey, surname, result) => {
  sql.query("SELECT * FROM " + tb_name + " WHERE pmKey = '" + pmKey + "' AND surname = '" + surname + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the surname
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (userId, user, result) => {
  sql.query(
    "UPDATE " + tb_name + " SET title = ?, surname = ?, lastname = ?, phoneNumber = ?, email = ?, rankNum = ?, pmKey = ? WHERE userId = ?",
    [user.title, user.surname, user.lastname, user.phoneNumber, user.email, user.rankNum, user.pmKey, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { userId: userId, ...user });
      result(null, { userId: userId, ...user });
    }
  );
};

User.remove = (userId, result) => {
  sql.query("DELETE FROM " + tb_name + " WHERE userId = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with userId: ", userId);
    result(null, res);
  });
};

module.exports = User;
