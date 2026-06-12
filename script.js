const questions = [
{
question:"HTML stands for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"High Text Machine Language",
"None"
],
answer:0
},
{
question:"CSS is used for?",
options:[
"Styling",
"Backend",
"Database",
"Operating System"
],
answer:0
},
{
question:"JavaScript is?",
options:[
"Programming Language",
"Database",
"Server",
"Framework"
],
answer:0
},
{
question:"Which tag creates a link?",
options:[
"<a>",
"<link>",
"<href>",
"<url>"
],
answer:0
},
{
question:"Which company created JavaScript?",
options:[
"Netscape",
"Google",
"Microsoft",
"Apple"
],
answer:0
}
];

let timer;
let timeLeft = 60;

function hideAllPages(){

document.getElementById("registerPage").classList.add("hidden");
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("dashboardPage").classList.add("hidden");
document.getElementById("quizPage").classList.add("hidden");
document.getElementById("leaderboardPage").classList.add("hidden");
document.getElementById("resultPage").classList.add("hidden");

}

function showRegister(){
hideAllPages();
document.getElementById("registerPage").classList.remove("hidden");
}

function showLogin(){
hideAllPages();
document.getElementById("loginPage").classList.remove("hidden");
}

function register(){

let username =
document.getElementById("regUsername").value;

let password =
document.getElementById("regPassword").value;

if(!username || !password){
alert("Fill all fields");
return;
}

let users =
JSON.parse(localStorage.getItem("users")) || [];

let exists =
users.find(u => u.username === username);

if(exists){
alert("User already exists");
return;
}

users.push({
username,
password,
score:0
});

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Registered Successfully");

showLogin();
}

function login(){

let username =
document.getElementById("loginUsername").value;

let password =
document.getElementById("loginPassword").value;

let users =
JSON.parse(localStorage.getItem("users")) || [];

let user =
users.find(
u =>
u.username === username &&
u.password === password
);

if(!user){
alert("Invalid Login");
return;
}

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

loadDashboard();
}

function loadDashboard(){

hideAllPages();

document
.getElementById("dashboardPage")
.classList.remove("hidden");

let user =
JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("welcome")
.innerText =
"Welcome " + user.username;
}

function startQuiz(){

hideAllPages();

document
.getElementById("quizPage")
.classList.remove("hidden");

renderQuiz();

timeLeft = 60;

document.getElementById("time")
.innerText = timeLeft;

timer = setInterval(() => {

timeLeft--;

document.getElementById("time")
.innerText = timeLeft;

if(timeLeft <= 0){

clearInterval(timer);

submitQuiz();

}

},1000);

}

function renderQuiz(){

let container =
document.getElementById("quizContainer");

container.innerHTML = "";

questions.forEach((q,index)=>{

container.innerHTML += `

<div class="question">

<h4>${index+1}. ${q.question}</h4>

${q.options.map((opt,i)=>`

<label class="option">

<input
type="radio"
name="q${index}"
value="${i}">

${opt}

</label>

`).join("")}

</div>

`;

});

}

function submitQuiz(){

clearInterval(timer);

let score = 0;

questions.forEach((q,index)=>{

let selected =
document.querySelector(
`input[name="q${index}"]:checked`
);

if(
selected &&
parseInt(selected.value)
=== q.answer
){
score++;
}

});

let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

let users =
JSON.parse(
localStorage.getItem("users")
);

users.forEach(user=>{

if(
user.username ===
currentUser.username
){
user.score = score;
}

});

localStorage.setItem(
"users",
JSON.stringify(users)
);

hideAllPages();

document
.getElementById("resultPage")
.classList.remove("hidden");

document
.getElementById("scoreText")
.innerText =
`Your Score: ${score}/${questions.length}`;

}

function showLeaderboard(){

hideAllPages();

document
.getElementById("leaderboardPage")
.classList.remove("hidden");

let users =
JSON.parse(
localStorage.getItem("users")
) || [];

users.sort(
(a,b)=>b.score-a.score
);

let tbody =
document.getElementById(
"leaderboardBody"
);

tbody.innerHTML = "";

users.forEach((user,index)=>{

tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${user.username}</td>

<td>${user.score}</td>

</tr>

`;

});

}

function goDashboard(){
loadDashboard();
}

function logout(){

localStorage.removeItem(
"currentUser"
);

showLogin();

}

window.onload = () => {

let currentUser =
localStorage.getItem(
"currentUser"
);

if(currentUser){
loadDashboard();
}else{
showRegister();
}

};