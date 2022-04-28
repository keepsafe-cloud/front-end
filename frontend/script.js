const URL = "http://localhost:8080";

window.addEventListener("load", getData);

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

function submitRentPost() {
  let timestamp = getCurrentDateTime();
  var rentEuroInput = document.getElementById("rent-euro-input").value;
  var rentYearInput = document.getElementById("rent-year-input").value;

  console.log(timestamp, rentEuroInput, rentYearInput);
  postData(timestamp, rentEuroInput, rentYearInput, 0);
  location.reload();
}

function submitMonthPost() {
  let timestamp = getCurrentDateTime();
  var monthEuroInput = document.getElementById("month-euro-input").value;
  var monthYearInput = document.getElementById("month-year-input").value;

  console.log(timestamp, monthEuroInput, monthYearInput);
  postData(timestamp, monthEuroInput, monthYearInput, 1);
  location.reload();
}

function getCurrentDateTime() { 
  var today = new Date();
  var date = today.getDate() + '-'+ (today.getMonth()+1) +'-'+ today.getFullYear();
  var min = today.getMinutes();
  if (min.lenght == 1) { min = '0' + min; }
  var time = today.getHours() + ":" + min + ":" + today.getSeconds();
 
  return date + ' , ' + time;
}

function showHistory(userItems) {

  userItems.reverse().forEach(item => {

    var wrap = document.createElement("div");
    var parTime = document.createElement("p");
    var parCalc = document.createElement("p");
    if (item.isMonthly == 1) {
      var payment = "Your monthly payment:";
    } else if (item.isMonthly == 0) {
      var payment = "Your rent is:";
    } else {
      var payment = "Bliep bloep bliep bliep oei je bent gehacked ";
    }

    historyRoot.append(wrap);
    wrap.append(parTime);
    wrap.append(parCalc);
    wrap.classList.add("his-item");

    parTime.innerText = item.timestamp;
    parCalc.innerText = `${payment} ${item.calculation} `;

  });
}

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if ( this.readyState === 4 && this.status === 200 ) {
      showHistory(JSON.parse(xhttp.responseText).result);
      console.log(JSON.parse(xhttp.responseText).result);
    }
  }
  xhttp.open('GET', `${URL}/history?uid=0`, true);
  xhttp.send();
}

function postData(time, rent, year, isMonthly) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if ( this.readyState === 4 && this.status === 200 ) {
      // historyRoot.innerText = xhttp.responseText;
      console.log(JSON.parse(xhttp.responseText));
    }
  }
  xhttp.open('POST', `${URL}/insertDatabase`);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhttp.send(`userID=0&timestamp=${time}&calculation=${rent}&filename=0&isMonthly=${isMonthly}`);
}