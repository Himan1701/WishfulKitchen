$(document).ready(function(){

	var emailPattern = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}\b/;
  console.log(emailPattern);  
$("#registration").submit(function (e) {
        var isValid = true,

	    name = $("#username").val().trim(),
        email = $("#email").val().trim();
    
    if (name === "") {
            alert("This field is required.");
            isValid = false;
        } 
        $("#name").val(name);

    
     if (email === "") {
            alert("This field is required.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            alert("Must be a valid email address.");
            isValid = false;
        }
        $("#email").val(email);
    
      if (!isValid) {
            e.preventDefault();
        }
    
    
});
					
});