// grabs url
var currentURL = window.location.origin;

// hides divs 
$("#confirmation").hide();

// sends post request with user data and displays confirmation form
// post sent before confirmation b/c couldn't send post request and show Auth0 widget 
//--- simultaneously or via other methods so submitLogin sends post and Confirm opens Auth0 widget
$("#submitLogin").on("click", function(){
	var userName = $("#userName").val().trim();
    var userPhone = $("#userPhone").val().trim();
    if (userPhone === "") {
        userPhone = "Not Provided";
    }
    console.log(userPhone);
    if (userName !== "") {
        var userInfo = {
            name: userName,
            phone: userPhone
        }
        $("#confName").html(userName);
        if (userPhone !== "") {
            $("#confPhone").html(userPhone);
        } else {
            $("#confPhone").html("Not Provided");
        }
        $("#userName").val("");
        $("#userPhone").val("");
        $("#userForm").hide();
        $("#confirmation").show();
        $.post("/api/user", userInfo, function(data){});
    } 
    return false;
});

// redisplays user form 
$("#reenter").on("click", function(){
    $("#confirmation").hide();
    $("#userForm").show();
    return false;
});
  

  
