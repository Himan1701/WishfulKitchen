"use strict";

var reservationList = {
    reservations: [],

    storage: getReservationStorage("customer_reservations"),

    load: function () {
        this.reservations = this.storage.retrieveReservations();
        return this;
    },

    save: function () {
        this.storage.storeReservations(this.reservations);
        return this;
    },

    sort: function () {
        this.reservations.sort(function (reservation1, reservation2) {
            if (reservation1.reservationDate < reservation2.reservationDate) {
                return -1;
            } else if (reservation1.reservationDate > reservation2.reservationDate) {
                return 1;
            } else {
                return 0;
            }
        });
        return this;
    },

    add: function (reservation) {
        this.reservations.push(reservation);
        return this;
    },

    delete: function (reservation) {
        this.sort();
        this.reservations.splice(reservation, 1);
        return this;
    },

    display: function (div) {
        
        if (this.reservations.length === 0) {
            $("#reservations_list").hide();
            return this;
        } else {
            $("#reservations_list").show();
        }
        
        this.sort();

        var resDate = "";
        var privRoom = "";
        var seatPref = "";

        var html = "<table>" +
            "<caption>Your Reservations</caption>" +
            "<thead>" +
            "<tr>" +
            "<th>Date</th>" +
            "<th>No. Guests</th>" +
            "<th>Private Room</th>" +
            "<th>No. Tables</th>" +
            "<th>Seating Preference</th>" +
            "<th>Actions</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
        
        for (var res in this.reservations) {

            resDate = this.reservations[res].reservationDate.toDateString();
            privRoom = (this.reservations[res].privateRoom) ? "Yes" : "No";
            switch (this.reservations[res].seatingPreference) {
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

            html += "<tr>" +
                "<td class='center'>" + resDate + "</td>" +
                "<td class='center'>" + this.reservations[res].numGuests + "</td>" +
                "<td class='center'>" + privRoom + "</td>" +
                "<td class='center'>" + this.reservations[res].numTables + "</td>" +
                "<td class='center'>" + seatPref + "</td>" +
                "<td class='center'>" +
                "<button type='button' class='details' onclick='openDetails(\"" + this.reservations[res].toString() + "\")' name='" + res + "'>More Details</button>&nbsp;" +
                "<button type='button' class='delete' name='" + res + "'>X</button>" +
                "</td>" +
                "</tr>";
        }

        html += "</tbody>" +
            "</table>";

        div.html(html);

        div.find("button").each(function () {
            if ($(this).hasClass("delete")) {
                $(this).mousedown(function (e) {
                    e.preventDefault();
                    reservationList.load();
                    reservationList.delete(this.name);
                    reservationList.save();
                    reservationList.display(div);
                });
            }

            if ($(this).hasClass("details")) {
                $(this).mousedown(function (e) {
                    e.preventDefault();
                });
            }
        });
        return this;
    },

    clear: function () {
        this.storage.clear();
        return this;
    }
};