"use strict";

var getLocalStorage = function (key) {
    var prototype = {
        get: function () {
            return localStorage.getItem(this.key) || "";
        },
        set: function (str) {
            localStorage.setItem(this.key, str);
        },
        clear: function () {
            localStorage.setItem(this.key, "");
        }
    };

    var storage = Object.create(prototype);
    storage.key = key;
    return storage;
};

var getReservationStorage = function (key) {
    var prototype = getLocalStorage(key);

    prototype.retrieveReservations = function () {
        var str = this.get();
        if (str.length === 0) {
            return [];
        } else {
            var reservationData = str.split("|");
            return reservationData.map(function (current) {
                var t = current.split("~~");
                var resDate = new Date(t[0]);
                return new Reservation(resDate, t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
            });
        }
    };

    prototype.storeReservations = function (reservations) {
        if (!Array.isArray(reservations)) {
            this.set("");
        } else {
            var reservationData = reservations.map(function (current) {
                return current.reservationDate + "~~" +
                    current.numGuests + "~~" +
                    current.privateRoom + "~~" +
                    current.numTables + "~~" +
                    current.seatingPreference + "~~" +
                    current.comments + "~~" +
                    current.customerName + "~~" +
                    current.customerEmail + "~~" +
                    current.customerPhone;
            });
            this.set(reservationData.join("|"));
        }
    };

    var storage = Object.create(prototype);
    storage.key = key;
    return storage;
};