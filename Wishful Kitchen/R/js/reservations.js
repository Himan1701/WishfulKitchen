/*jslint browser: true, devel: true */
/*global $*/
/*eslint-env browser, jquery*/

"use strict";

$(document).ready(function () {

    var today = new Date();
    $("#reservationDate").datepicker();
    $("#reservationDate").datepicker("option", "minDate", 0);
    $("#reservationDate").datepicker("setDate", today);

    $("#detailsDialog").dialog({
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 200
        },
        hide: {
            effect: "fade",
            duration: 200
        },
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }, 
        minWidth: 500
    });

    $("#confirmationDialog").dialog({
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 200
        },
        hide: {
            effect: "fade",
            duration: 200
        },
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    function cleanError() {
        this.nextElementSibling.innerHTML = "";
    }

    var classErrorArray = document.getElementsByClassName('error');
    for (var err = 0; err < classErrorArray.length; err++) {
        classErrorArray[err].previousElementSibling.onchange = cleanError;
    }

    $("#reservations_form").submit(function (e) {

        e.preventDefault();

        console.log('$("#reservationDate"):', $("#reservationDate"));

        var newReservation = new Reservation(
            $("#reservationDate").val(),
            $("#numGuests").val().trim(),
            $("#privateRoom").prop("checked"),
            $("#numTables").val(),
            $("input[name='seatingPreference']:checked").val(),
            $("#comments").val().trim(),
            $("#customerName").val().trim(),
            $("#customerEmail").val().trim(),
            $("#customerPhone").val().trim()
        );

        var errorsArray = newReservation.errors();
        if (errorsArray.length !== 0) {
            var i = 0;
            var firstErrorId = "";
            do {
                switch (errorsArray[i][0]) {
                    case 1:
                        $("#reservationDate").next().text(errorsArray[i][1]);
                        if (firstErrorId === "")
                            firstErrorId = "#reservationDate";
                        break;
                    case 2:
                        $("#numGuests").next().text(errorsArray[i][1]);
                        if (firstErrorId === "")
                            firstErrorId = "#numGuests";
                        break;
                    case 3:
                        $("#customerName").next().text(errorsArray[i][1]);
                        if (firstErrorId === "")
                            firstErrorId = "#customerName";
                        break;
                    case 4:
                        $("#customerEmail").next().text(errorsArray[i][1]);
                        if (firstErrorId === "")
                            firstErrorId = "#customerEmail";
                        break;
                    case 5:
                        $("#customerPhone").next().text(errorsArray[i][1]);
                        if (firstErrorId === "")
                            firstErrorId = "#customerPhone";
                        break;
                    default:
                        break;
                }
                i++;
            } while (i < errorsArray.length);

            $(firstErrorId).select();

        } else {

            reservationList.load();
            reservationList.add(newReservation);
            reservationList.save();
            reservationList.display($("#reservations_list"));

            $("#reservationDate").datepicker("setDate", today);
            $("#numGuests").val("");
            $("#privateRoom").prop("checked", false);
            $("#numTables").val("1");
            $("#noPref").prop("checked", true);
            $("#comments").val("");
            $("#customerName").val("");
            $("#customerEmail").val("");
            $("#customerPhone").val("");

            var classErrorArray = document.getElementsByClassName('error');
            for (var err = 0; err < classErrorArray.length; err++) {
                classErrorArray[err].innerHTML = "*";
            }
            
            var confirmationText = "<p>Your reservation is done.</p><p>Thank you.</p>"
            $("#confirmationDialog").html(confirmationText);

            $("#confirmationDialog").dialog("open");

        }

        console.log('newReservation:', newReservation);
    });

    reservationList.load();
    reservationList.display($("#reservations_list"));
    //$("#numGuests").focus();

});


function openDetails(txt) {
//    var html = "<p>" + txt + "</p>";
    var html = txt;
    $("#detailsDialog").html(html);
    $("#detailsDialog").dialog("open");
}