var login_button = document.querySelector("#login_button");
var account_button = document.querySelector("#account_button");
account_button.addEventListener("click", newAccount, false);
login_button.addEventListener("click", login, false);  

function login(event){
    var my_email = document.querySelector("#email");
    var my_password = document.querySelector("#password");
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
        //go to new page!
        var new_url = "spirit_animal.html";
        document.location.href = new_url;
      }
    });
}

function newAccount(event){
    var new_url = "personality_form.html";
    document.location.href = new_url;
}