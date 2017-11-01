$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyBSK3IDLRbs9fSQ9fmpwoJwVDBLsRR5Ylw",
        authDomain: "trainscheduler-cb331.firebaseapp.com",
        databaseURL: "https://trainscheduler-cb331.firebaseio.com",
        projectId: "trainscheduler-cb331",
        storageBucket: "trainscheduler-cb331.appspot.com",
        messagingSenderId: "53625154793"
    };
        
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function() {
    	event.preventDefault();

    	var name = $("#name").val().trim();
    	var destination = $("#destination").val().trim();
    	var firstTime = $("#firstTime").val().trim();
    	var frequency = $("#frequency").val().trim();

    	database.ref().push({
    		name: name,
    		destination: destination,
    		firstTime: firstTime,
    		frequency: frequency
    	});
    });

    database.ref().on("child_added", function(snapshot) {
    	console.log(snapshot.val())
    	var destination = snapshot.val().destination;
    	var name = snapshot.val().name;
    	var firstTime = snapshot.val().firstTime;
    	var frequency = snapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextArrival));

    	$("#tbody").append("<tr> <td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>" );
    });


});

