// ^ HTML elements
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");

var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");

// * App variables
var userList = JSON.parse(localStorage.getItem("users")) || [];
var homeUserName = localStorage.getItem("userUsername");
if (homeUserName) {
  document.querySelector("#userName").innerHTML = `Welcome ${homeUserName}`;
}

// & functions
function isSignUpInputEmpty() {
  if (
    signupName.value === "" ||
    signupEmail.value === "" ||
    signupPassword.value === ""
  ) {
    return false;
  } else {
    return true;
  }
}

function signUp() {
  if (isSignUpInputEmpty() === false) {
    document.getElementById("signup-verify").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  if (doesEmailExist() === false) {
    document.getElementById("signup-verify").innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
  } else {
    userList.push(signUp);
    localStorage.setItem("users", JSON.stringify(userList));
    clearInput();
    document.getElementById("signup-verify").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
}

function doesEmailExist() {
  for (var i = 0; i < userList.length; i++) {
    if (userList[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function clearInput() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

function logIn() {
  var email = loginEmail.value;
  var password = loginPassword.value;

  for (var i = 0; i < userList.length; i++) {
    if (
      userList[i].email.toLowerCase() === email.toLowerCase() &&
      userList[i].password.toLowerCase() === password.toLowerCase()
    ) {
      localStorage.setItem("userUsername", userList[i].name);
      location.replace("/route-js-smart-login/home.html");
      return true;
    } else {
      document.getElementById("login-verify").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

function logOut() {
  localStorage.removeItem("userUsername");
}
