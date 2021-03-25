function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
                    //$("#username").text(n);
                    document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}
sayHello();

function writeCities() {
    var citiesRef = db.collection("cities");
    citiesRef.add({
        code: "YVR",
        name: "Vancouver",
        hemisphere: "north",
        population: 675218,
        picture: "yvr.jpg"
    });
    citiesRef.add({
        code: "MB",
        name: "Mumbai",
        hemisphere: "south",
        picture: "mumbai.jpg",
        population: 18410000
    });
    citiesRef.add({
        code: "SEL",
        name: "Seoul",
        hemisphere: "north",
        picture: "seoul.jpg",
        population: 9776000
    });
    citiesRef.add({
        code: "CAPE",
        name: "Cape Town",
        hemisphere: "south",
        population: 433688,
        picture: "capetown.jpg"
    });
    citiesRef.add({
        code: "BJ",
        name: "Beijing",
        hemisphere: "north",
        population: 21540000,
        picture: "beijing.jpg"
    });
}
//writeCities();

function citiesQuery(){
    db.collection("cities")
    .where("population", ">", 1000000)
    //.where("hemisphere", "==", "south")
    //.limit(2)
    //.orderBy("population")
    //.orderBy("population", "desc")
    .get()
    .then(function(snap){
        snap.forEach(function(doc){
            var n = doc.data().name;
            var pop = doc.data().population;
            console.log(n);
            var newdom = "<p> " + n + " " + pop + "</p>";
            $("#cities-go-here").append(newdom);
            //document.getElementById("cities-go-here").innerHTML = newdom;
        })
    })
}
//scitiesQuery();

function showCarousel(){
    db.collection("cities")
    .get()
    .then(function(snap){

        for (var i = 1; i <= snap.size; i++) {
            var n = snap[i];
            console.log(n);
        }

        snap.forEach(function(doc){
            var n = doc.data().name;
            var pop = doc.data().population;
            var img = doc.data().picture;
            console.log(n);

            var newdom = "<div class='carousel-item'>" +
                "<img src='images/" + img + "' d-block w=100 >" +
                "</div> ";
            $("#carousel-pics-go-here").append(newdom);
            //document.getElementById("cities-go-here").innerHTML = newdom;
        })
    })
}
showCarousel();


function getFormInputs() {
    document.getElementById("finish").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {

            // get various values from the form
            var name = document.getElementById("event-name").value;

            // Either true or false
            var mon = document.getElementById("monday").checked;
            var tue = document.getElementById("tuesday").checked;

            db.collection("users")
                .doc(user.uid)
                .collection("items")
                .add({
                    "name": name,
                    "mon": mon,
                    "tue": tue
                })
        })
    })
}
getFormInputs();

// Get ALL the items associated with this current user
function showAllHabits() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid) //get this from user.uid
            .collection("items")
            .get()
            .then(function (snap) { //collection of ALL habits
                snap.forEach(function (item) {
                    var itemname = item.data().name;
                    //console.log(habitname);
                    //$("#items-go-here").append("<p>" + itemname + "</p");
                })
            })
    })
}
showAllHabits();

// Get All "day" habits for this current user
function showDayHabits(day) {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(day);
        db.collection("users")
            .doc(user.uid)
            .collection("items")
            .where(day, "==", true)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    var itemname = doc.data().name;
                    console.log(itemname);
                    $("#" + day + "-goes-here") //eg.  "mon-goes-here"
                        .append("<p> " + day + ": " + itemname + "</p");
                })
            })
    })
}
showDayItems("mon");
showDayItems("tue");
