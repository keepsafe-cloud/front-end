const URL = "http://localhost:80/history?uid=0";

var loginForm = document.getElementById("form-login");
var registerForm = document.getElementById("form-register");

var loginBtn = document.getElementById("login-btn");
var registerBtn = document.getElementById("register-btn");

var historyRoot = document.getElementById("history-root");


if(loginBtn && registerBtn){
loginBtn.addEventListener("click", toggleLoginForm);
registerBtn.addEventListener("click", toggleRegisterForm);
}

function toggleLoginForm() {
  let visibility = loginForm.getAttribute("data-visible");
  if (visibility === "false") {
    loginForm.setAttribute("data-visible", true);
    loginBtn.innerText = "Cancel";
    registerBtn.style.display = "none";
  } else if (visibility === "true") {
    loginForm.setAttribute("data-visible", false);
    loginBtn.innerText = "Login";
    registerBtn.style.display = "block";
  }
}

function toggleRegisterForm() {
  let visibility = registerForm.getAttribute("data-visible");
  if (visibility === "false") {
    registerForm.setAttribute("data-visible", true);
    registerBtn.innerText = "Cancel";
    loginBtn.style.display = "none";
  } else if (visibility === "true") {
    registerForm.setAttribute("data-visible", false);
    registerBtn.innerText = "Register";
    loginBtn.style.display = "block";
  }
}


function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if ( this.readyState === 4 && this.status === 200 ) {
      historyRoot.innerText = xhttp.responseText;
      showHistory(JSON.parse(xhttp.responseText));
    }
  }
  xhttp.open('GET', `${URL}`, true);
  xhttp.send();
}

function showHistory(input) {
  console.log(inputArray);

  inputArray.forEach(item => {
    var wrap = document.createElement("div");
    var par = document.createElement("p");

    historyRoot.append(wrap);
    wrap.append(par);
    wrap.classList.add("his-item");

    par.innerText = `${item.timestamp} Your calculation: ${item.calc} `;
  });
}

var rentEuroInput = document.getElementById("rent-euro-input");
var rentYearInput = document.getElementById("rent-year-input");
var monthEuroInput = document.getElementById("month-euro-input");
var monthYearInput = document.getElementById("month-year-input");

function postData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if ( this.readyState === 4 && this.status === 200 ) {
      historyRoot.innerText = xhttp.responseText;
    }
  }
  xhttp.open('POST', `${URL}`);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({
    // TBD TBD TBD
    "euro" : rentEuroInput.value,
    "year" : rentYearInput.value
  }));
}
 