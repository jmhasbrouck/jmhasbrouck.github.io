var my_email = document.querySelector("#email");
var my_password = document.querySelector("#password");
var submit_var = document.querySelector("#submit_button");

submit_var.addEventListener("click", submit, false);
//**********************************************************
//this whole section is just for fun stuff
var ssn = document.querySelector("#ssn");
ssn.addEventListener("click", clearSsn, false);
var drivers_license = document.querySelector("#drivers_license");
drivers_license.addEventListener("click", dRVL, false);
var integration = document.querySelector("#integration");
integration.addEventListener("click", intMethod,"false");
function dRVL(event){
    var this_div = document.querySelector("#DL_div");
    this_div.innerHTML = "<img src=\"https://pbs.twimg.com/media/B2-4j-kCIAAAqPm.png:large\"/>";
}
function intMethod(event){
    var this_div = document.querySelector("#integration_div");
    this_div.innerHTML = "<h1><span style=\"color:black\">W</span><span style=\"color:red\">r</span><span style=\"color:green\">o</span><span style=\"color:blue\">n</span><span style=\"color:yellow\">g</span></h1>";
}
function clearSsn(event){
    var this_div = document.querySelector("#ssn_div");
    this_div.innerHTML = "<p><span style=\"color:red\">lol</span> jk</p>"
}
//end of fun
//*****************************************************************
var user = function(email, animal){
    this.email = email;
    this.animal = animal;
}//user class

function submit(event){
    var this_email = my_email.value;
    if(this_email === ""){
        alert("No email address was entered");
        return;
    }
    var this_password = my_password.value;
    if(this_password === ""){
        alert("No password was entered");
        return;
    }
    var your_number = Math.floor((Math.random()*9) + 0); //random number 0 to 9
    var myDataRef = new Firebase('https://jhasbrouckwdevp1.firebaseio.com/');
    //verifying that the email is not taken
    /*var taken_emails = [];
    myDataRef.orderByChild("email").on("child_added", function(snapshot) {
        taken_emails.push(snapshot.val().email);//getting emails
    });
    for (i = 0; i < taken_emails.length;i++){
        if (taken_emails[i] == this_email){
            alert("That email address has already been taken, please change the email address and press submit again :)");
            return;
        }
    }*/
    var this_user = 0;
    myDataRef.createUser({
        email    : this_email,
        password : this_password
        }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            alert(error);
            return;
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            login(your_number);
        }
    });
    /*myDataRef.onAuth(function(authData) {
            if (authData) {
                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                myDataRef.child("users").child(authData.uid).set({
                animal:your_number
            });
                var new_url = "spirit_animal.html";
                document.location.href = new_url;
            }
            });*/
    
}
function login(your_number){
    var ref = new Firebase('https://jhasbrouckwdevp1.firebaseio.com/');
    ref.authWithPassword({
      email    : my_email.value,
      password : my_password.value
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert(error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        remember: "sessiononly";
        
        ref.child("users").child(authData.uid).set({
                animal:your_number,
                name: document.querySelector("#name").value
            });
        var new_url = "spirit_animal.html";
        document.location.href = new_url;
      }
    });
}
