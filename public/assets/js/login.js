// // grabs url
// var currentURL = window.location.origin;

// // hides divs 
// $("#confirmation").hide();

// // sends post request with user's name and displays confirmation form
// // post sent before confirmation b/c couldn't send post request and show Auth0 widget 
// //--- simultaneously or via other methods so Login sends post and Confirm opens Auth0 widget
// $("#submitLogin").on("click", function(){
// 	var userName = $("#userName").val().trim();
//     if (userName !== "") {
//         var userInfo = {
//             name: userName
//         }
//         $("#confName").html(userName);
//         $("#userName").val("");
//         $("#userForm").hide();
//         $("#confirmation").show();
//         $.post(currentURL + "/api/user", userInfo, function(data){});
//     } 
//     return false;
// });

// // redisplays user form 
// //this leaves a lot of added unnecessary data in db
// //can't do timestamp search for last to edit because someone else may enter after before edit
// $("#reenter").on("click", function(){
//     $("#confirmation").hide();
//     $("#userForm").show();
//     return false;
// });
  

  
