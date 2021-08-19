"use strict";

var Reservation = function (reservationDate, numGuests, privateRoom, numTables, seatingPreference, comments, customerName, customerEmail, customerPhone) {
    this.reservationDate = reservationDate;
    this.numGuests = numGuests;
    this.privateRoom = privateRoom;
    this.numTables = numTables;
    this.seatingPreference = seatingPreference;
    this.comments = comments;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
};

Reservation.prototype.errors = function () {
    var rtn = [];

    var dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (this.reservationDate === "") {
        var error = [];
        error[0] = 1;
        error[1] = "This field is required.";
        rtn.push(error);
    } else if (!dateFormat.test(this.reservationDate)) {
        var error = [];
        error[0] = 1;
        error[1] = "Invalid date.";
        rtn.push(error);
    } else {
        var [month, date, year] = this.reservationDate.split("/");
        this.reservationDate = new Date(year, month - 1, date);
        if (isNaN(this.reservationDate.valueOf())) {
            var error = [];
            error[0] = 1;
            error[1] = "Invalid date format.";
            rtn.push(error);
        } else {
            if (this.reservationDate < today) {
                var error = [];
                error[0] = 1;
                error[1] = "Cannot accept a past date.";
                rtn.push(error);
            }
        }
    }

    if (isNaN(this.numGuests)) {
        var error = [];
        error[0] = 2;
        error[1] = "Invalid number.";
        rtn.push(error);
    } else if (this.numGuests === 0 || this.numGuests === "") {
        var error = [];
        error[0] = 2;
        error[1] = "This field is required.";
        rtn.push(error);
    } else if (this.numGuests > 100) {
        var error = [];
        error[0] = 2;
        error[1] = "Cannot exceed 100 guests."
        rtn.push(error);
    }

    if (this.customerName === "") {
        var error = [];
        error[0] = 3;
        error[1] = "This field is required.";
        rtn.push(error);
    }

    if (this.customerEmail === "") {
        var error = [];
        error[0] = 4;
        error[1] = "This field is required.";
        rtn.push(error);
    } else {
        var emailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailFormat.test(this.customerEmail)) {
            var error = [];
            error[0] = 4;
            error[1] = "Invalid email address."
            rtn.push(error);
        }
    }

    if (this.customerPhone === "") {
        var error = [];
        error[0] = 5;
        error[1] = "This field is required.";
        rtn.push(error);
    } else {
        var phoneFormat = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        if (!phoneFormat.test(this.customerPhone)) {
            var error = [];
            error[0] = 5;
            error[1] = "Invalid phone number.";
            rtn.push(error);
        }
    }

    return rtn;
};

Reservation.prototype.toString = function () {
    let resDate = "";
    let privRoom = "";
    let seatPref = "";
    let str = "";

    resDate = this.reservationDate.toDateString();
    privRoom = (this.privateRoom) ? "Yes" : "No";
    switch (this.seatingPreference) {
        case "noPref":
            seatPref = "No Preference";
            break;
        case "center":
            seatPref = "Center of Saloon";
            break;
        case "window":
            seatPref = "Next to Window";
            break;
        case "kitchen":
            seatPref = "Next to the Kitchen";
            break;
        default:
            seatPref = "";
            break;
    }

    str += "<p>Reservation Date: <span>" + resDate + "</span></p>" +
        "<p>Number of Guests: <span>" + this.numGuests + "</span></p>" +
        "<p>Private Room: <span>" + privRoom + "</span></p>" +
        "<p>Number of Tables: <span>" + this.numTables + "</span></p>" +
        "<p>Seating Place: <span>" + seatPref + "</span></p>" +
        "<p>Comments: <span>" + this.comments + "</span></p>" +
        "<p>Customer Name: <span>" + this.customerName + "</span></p>" +
        "<p>Customer Email: <span>" + this.customerEmail + "</span></p>" +
        "<p>Customer Phone: <span>" + this.customerPhone + "</span></p>";

    return str;
};