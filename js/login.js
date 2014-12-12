var ref = new Firebase('https://tgame.firebaseio.com/');



$("#iscriviti").click(function () {
    var mailVal = $('#mail').val();
    var pswVal = $('#psw').val();
    ref.createUser({
        email    : mailVal,
        password : pswVal
    }, function(error) {
        if (error === null) {
        console.log("User created successfully");
    } else {
        console.log("Error creating user:", error);
    }
    });
});



// faccio il login con i dati che inserisco negli input
$("#login").click(function () {
    var mailVal = $('#mail').val();
    var pswVal = $('#psw').val();

    ref.authWithPassword({
      email    : mailVal,
      password : pswVal
    }, function(error, authData) {
      if (error === null) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.password);
      } else {
        console.log("Error authenticating user:", error);
      }
    });

});


// faccio il listening dello stato dell'utente
ref.onAuth(function(authData) {
  if (authData) {
    // user authenticated with Firebase
    console.log("User ID: " + authData.uid + ", email: " + authData.password.email);
    // se loggato mostro il gioco, se no lo nascondo
    $('.universo').slideDown();
    $('.pannello').css('display','none');
  } else {
    // user is logged out
  }
});


$("#logout").click(function () {
    ref.unauth();
});




























