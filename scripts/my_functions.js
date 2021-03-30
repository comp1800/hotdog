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

