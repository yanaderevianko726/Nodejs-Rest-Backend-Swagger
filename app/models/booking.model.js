const sql = require("./db.js");
const tb_name = 'bookings';

// Constructor
const Booking = function(booking) {
  this.bookingId = booking.bookingId;
  this.userId = booking.userId;
  this.guestName = booking.guestName;
  this.qrCode = booking.qrCode;
  this.guests = booking.guests;
  this.roomKey = booking.roomKey;
  this.roomNum = booking.roomNum;
  this.roomType = booking.roomType;
  this.bookingType = booking.bookingType;
  this.dateFrom = booking.dateFrom;
  this.dateTo = booking.dateTo;
  this.createdAt = booking.createdAt;
};

Booking.create = (booking, result) => {

  sql.query("SELECT * FROM " + tb_name + " WHERE userId = '" + booking.userId + "' AND createdAt = '" + booking.createdAt +  "'", 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      sql.query(
        "UPDATE " + tb_name + " SET userId = ?, guestName = ?, guests = ?, roomKey = ?, roomNum = ?, roomType = ?, bookingType = ?, dateFrom = ?, dateTo = ?, createdAt = ? WHERE bookingId = ?",
        [booking.userId, booking.guestName, booking.guests, booking.roomKey, booking.roomNum, booking.roomType, booking.bookingType, booking.dateFrom, booking.dateTo, booking.createdAt, res[0].bookingId],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          console.log("updated booking: ", { bookingId: res[0].bookingId, ...booking });
          result(null, { bookingId: res[0].bookingId, ...booking });
          return;
        }
      );
    }

    let stmt = "INSERT INTO " + tb_name + "(userId,guestName,guests,roomKey,roomNum,roomType,bookingType,dateFrom,dateTo,createdAt) VALUES(?,?,?,?,?,?,?,?,?,?)";
    let todo = [booking.userId, booking.guestName, booking.guests, booking.roomKey, booking.roomNum, booking.roomType, booking.bookingType, booking.dateFrom, booking.dateTo, booking.createdAt];
    sql.query(stmt, todo, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created booking: ", { bookingId: res.insertId, ...booking });
      result(null, { bookingId: res.insertId, ...booking });
      return;
    });
  });  
};

Booking.getAll = result => {
  sql.query("SELECT * FROM " + tb_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};

Booking.getByBookingId = (bookingId, result) => {
  sql.query("SELECT * FROM " + tb_name + " WHERE bookingId = '" + bookingId + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Booking with the bookingId
    result({ kind: "not_found" }, null);
  });
};

Booking.getAllWithUserId = (userId, result) => {
  let query = "SELECT * FROM " + tb_name + " WHERE userId = '" + userId + "'";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};

Booking.updateByBookingId = (bookingId, booking, result) => {
  sql.query(
    "UPDATE " + tb_name + " SET userId = ?, guestName = ?, qrCode = ?, guests = ?, roomKey = ?, roomNum = ?, roomType = ?, bookingType = ?, dateFrom = ?, dateTo = ?, createdAt = ? WHERE bookingId = ?",
    [booking.userId, booking.guestName, booking.qrCode, booking.guests, booking.roomKey, booking.roomNum, booking.roomType, booking.bookingType, booking.dateFrom, booking.dateTo, booking.createdAt, bookingId],
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

      console.log("updated booking: ", { bookingId: bookingId, ...booking });
      result(null, { bookingId: bookingId, ...booking });
    }
  );
};

Booking.remove = (bookingId, result) => {
  sql.query("DELETE FROM " + tb_name + " WHERE bookingId = ?", bookingId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with bookingId: ", bookingId);
    result(null, res);
  });
};

module.exports = Booking;
