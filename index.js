var config = {
	apiKey: "AIzaSyB7GyXDFZNrg-LGUGIE6RyXwHmvtB3ipoQ",
	authDomain: "mhacksproject.firebaseapp.com",
	databaseURL: "https://mhacksproject.firebaseio.com",
	projectId: "mhacksproject",
	storageBucket: "mhacksproject.appspot.com",
	messagingSenderId: "294027637255"
};
firebase.initializeApp(config);

$(document).ready(function () {
	$(".close").click(function () {
		$("#sucsessfully").alert("close");
	});
});

function updateTable(n){
	var database = firebase.database().ref().child("USERHIST/" + n + "/CurrentCredit/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
				var ColumnNum = data.val().ColumnNum;
				var AmountPaid = data.val().AmountPaid;
				var DateLoaned = data.val().DateLoaned;
				var DatePaid = data.val().DatePaid;
				var LoanAMT = data.val().LoanAMT;
				var Notes = data.val().Notes;
        snapshot.forEach(function(data){

            content += '<tr>';
            content += '<th>' + ColumnNum + '</th>';
            content += '<th>' + AmountPaid + '</th>';
			content += '<th>' + DateLoaned + '</th>';
			content += '<th>' + DatePaid + '</th>';
			content += '<th>' + LoanAMT + '</th>';
			content += '<th>' + Notes + '</th>';
            content += '</tr>';
        });

        $('#bodytable').append(content);
    }
});
}

function pageLoad() {

	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid, emailVerified;
	if (user != null) {
	  name = user.displayName;
	  email = user.email;
	  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
	                   // this value to authenticate with your backend server, if
	                   // you have one. Use User.getToken() instead.
	}

	changeData(name);
}

function changeData(b){

	var refrenceBalence = firebase.database().ref().child("USERDATA/" + b + "/CurrentCredit/");
	var refrenceDebt = firebase.database().ref().child("USERDATA/" + b + "/CurrentDebt/");
	if (refrenceBalence !== null && refrenceDebt !== null){
		document.getElementById("currentBAL").value =  refrenceBalence;
		document.getElementById("currentDEBT").value =  refrenceDebt;
		updateTable(b);
	}

	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		//changeData(user);
  		} else {
    		// No user is signed in.
  		}
	});
}

function signout(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		location.assign("index.html");
	}).catch(function(error) {
		alert("An error happened.");
	});
}

function clearSignup() {
	document.getElementById("signUpName").value = "";
	document.getElementById("signUpEmail").value = "";
	document.getElementById("signUpPassword").value = "";
}


function clearLogin() {
	document.getElementById("LoginInputEmail").value = "";
	document.getElementById("LoginInputPassword").value = "";
}

function eval() {
/*
	var email = document.getElementById("LoginInputEmail").value;
	var password = document.getElementById("LoginInputPassword").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		clearLogin();
		document.getElementById("wronglogin").innerHTML = "Incorrect name or password!"
	});*/
}

function createUSER(name, mail, pass) {

	firebase.database().ref('USERINFO/' + name).set({
		Name: name,
		Email: mail,
		Password: pass
	});

	firebase.database().ref('USERDATA/' + name).set({
		CreditScore: 0,
		CurrentCredit: 0.00,
		CurrentDebt: 0.00
	});

	firebase.database().ref('USERHIST/' + name).set({
		ColumnNum: [""],
		AmountPaid: [""],
		DateLoaned: [""],
		DatePaid: [""],
		LoanAMT: [""],
		Notes: [""]
	});


	var email = mail;
	var password = pass;

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  // ...
	  console.log(errorCode);
	  console.log(errorMessage);
	});

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			location.assign("transhist.html");

		} else {
			// No user is signed in.
			if (error.code !== null && error.message !== null) {
				console.log(error.code);
				console.log(error.message);
			} else {
				console.log("error.code");
				console.log("error.message");
			}
		}
	});
};

function login() {
	var email = document.getElementById("LoginInputEmail").value;
	var password = document.getElementById("LoginInputPassword").value;
	if (email == "" || password == "") {
		document.getElementById("filloutlog").innerHTML = "Please fill out all the fields.";
	} else {
		//eval(email, password);

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		  console.log(errorCode);
		  console.log(errorMessage);
		});

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
			location.assign("transhist.html");
		  } else {
		    // No user is signed in.
			//console.log(error.code);
			//console.log(error.message);
		  }
		});
	}
}

function signup() {
	var name = document.getElementById("signUpName").value;
	var email = document.getElementById("signUpEmail").value;
	var password = document.getElementById("signUpPassword").value;
	if (name == "" || email == "" || password == "") {
		document.getElementById("fillout").innerHTML = "Please fill out all the fields.";
	} else {
		createUSER(name, email, password);

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		  console.log(errorCode);
		  console.log(errorMessage);
		});

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
		  	// User is signed in.
			console.log("User signed in");
			//location.assign("transhist.html");
			} else {
		  	// No user is signed in.
			console.log("ERROR: No user signed in");
			}
		});
	}
}
