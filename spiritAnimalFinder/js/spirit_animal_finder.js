var myDataRef = new Firebase('https://jhasbrouckwdevp1.firebaseio.com/');
var my_text = 0;
var my_name = "";
//*****************************
var animal = function(name, url, accompany_paragraph){
    this.name = name;
    this.url = url;
    this.paragraph = accompany_paragraph;
}
var possibilites = [];
my_text = "Thom Yorke;http://images.intouchweekly.com/uploads/posts/image/67084/thom-yorke.jpg;Congrats! You got the lead singer, guitarist and songwriter of Radiohead!|The Color Blue;http://all4desktop.com/data_images/1680%20x%201050/4229161-blue-squares.jpg;Congrats! People said you were looking a little blue and you never knew why, but now you do!|Mark Mahoney, PhD.;https://www.carthage.edu/live/image/gid/46/width/800/9377_14_appdevelopment_jh_3.jpg;Congradulations! Your spirit animal is the chair of the Computer Science department at Carthage College! He has a cat named Juan Pablo|The European Red Fox;http://7-themes.com/data_images/out/69/7006775-red-fox-hd.jpg;Your spirit animal is a fox! Proud of you|Joel;http://img10.deviantart.net/af92/i/2013/202/8/7/joel___the_last_of_us_by_darkanimapro-d6ejmff.png;Your spirit animal is a video game character who made questionable ethical choices|Stegosaurus;https://lotusjourneys.files.wordpress.com/2013/07/stegosaurus-3.gif;Stegosaurus (meaning \"roof lizard\" or \"covered lizard\" in reference to its bony plates) is a genus of armored dinosaur. They lived during the Late Jurassic period (Kimmeridgian to early Tithonian), some 155 to 150 million years ago in what is now the western United States and Portugal. Due to its distinctive tail spikes and plates, Stegosaurus is one of the most recognizable dinosaurs. Several species have been identified in the upper Morrison Formation, represented by the remains of about 80 individuals|Polar Bear;http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/H-P/polar-bear-cub-on-mom.jpg;<a href=\"https://www.youtube.com/watch?v=g7rZTZBOrqQ\">Your spirit animal is like a big dog</a>|A$AP Ferg;http://thesource.com/wp-content/uploads/2013/08/ferg-stream.png;Your spirit animal is the popular rapper A$AP Ferg|A T-Rex With Lazers;http://www.adamtglass.com/wp-content/uploads/2011/05/230977_10150202293787801_580537800_7021375_4336907_n.jpg;T-Rex + Lzrs = Killing Machine|A cat riding a roomba, wearing a shark costume;https://i.ytimg.com/vi/YCv9o7qteko/maxresdefault.jpg;<a href=\"https://www.youtube.com/watch?v=Of2HU3LGdbo\">Watch</a>";
var unparsed_objects = my_text.split('|');
var num_animals = unparsed_objects.length;
for (i = 0; i < num_animals; i++){
    var obj_arr = unparsed_objects[i].split(';');
    possibilites.push(new animal(obj_arr[0],obj_arr[1],obj_arr[2]));
}
//********************************
myDataRef.onAuth(function(authData) {
            if (authData) {
                var my_child = myDataRef.child("users").child(authData.uid);
                var animal = 0;
                my_child.once("value", function(data){
                    animal = data.val().animal;
                    my_name = data.val().name;
                    //**********
                    changeDOM(animal);//we don't want to change our dom until we know for sure that we have an animal to choose
                    //**********
                })
                
                 
                
            }
            else{
                alert("error getting your account data, sorry");
            }
        }
);
function changeDOM(my_animal){
    var output = "";
    output = output + "<h1>" + possibilites[my_animal].name + "</h1><br>";
    output = output + "<img src = \"" + possibilites[my_animal].url + "\"/><br>";
    output = output + "<p>" + possibilites[my_animal].paragraph + "</p><br>";
    var output_div = document.querySelector("#output_div");
    var my_child = myDataRef.child("users");
    var matched_names = [];
    my_child.orderByValue().once("value", function(snapshot){
        snapshot.forEach(function(data){
            if (data.val().animal == my_animal){
                matched_names.push(data.val().name);
            }
            
        });
        if(matched_names.length != 0){
        output = output + "<p>People that share your spirit animal:</p>";
        for (i = 0; i< matched_names.length;i++){
            if (matched_names[i] != my_name){
            output = output + "<p>" + matched_names[i] + "</p>";
            }
        } 
    } 
    else{
        output=output +"<p>No one else has your spirit animal...</p>";
    }
        output_div.innerHTML = output;
    });
    
    output_div.innerHTML = output;
}

//*******************************************************
//delete functionality
//*******************************************************
var delete_var = document.querySelector("#delete_button");
delete_var.addEventListener("click",deleteMyAccount, false);
function deleteMyAccount(event){
    var del_div = document.querySelector("#delete_div");
    del_div.innerHTML = "<br><input type=\"text\" id=\"email\" class=\"form-control input-sm chat-input\" placeholder=\"email@example.com\" /></br><input type=\"text\" id=\"password\" class=\"form-control input-sm chat-input\" placeholder=\"password\" /></br><div class=\"wrapper\">                          <span class=\"group-btn\"><button type=\"button\" id=\"delete_button2\" class=\"btn btn-danger\"><span class=\"glyphicons glyphicons-temperature-low\">Delete</span></button></span></div>";
    var delete_var2 = document.querySelector("#delete_button2");
    delete_var2.addEventListener("click",deleteMyAccountHelper, false);
}
function deleteMyAccountHelper(event){
    var ref = new Firebase('https://jhasbrouckwdevp1.firebaseio.com/');
    var my_email = document.querySelector("#email").value;
    var my_password = document.querySelector("#password").value;
    ref.removeUser({
      email    : my_email,
      password : my_password
    }, function(error) {
      if (error === null) {
        console.log("User removed successfully");
        document.body.innerHTML = "<h1>Delete Successful.</h1>";
      } else {
        console.log("Error removing user:", error);
        alert(error);
      }
    });
}

