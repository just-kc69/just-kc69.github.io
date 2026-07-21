// navigation 
document.querySelectorAll(".ham_hidden button").forEach(btn => {
  btn.addEventListener("click", () => {
    // only respond to buttons ending with "btn"
    if(!btn.id.endsWith("Btn")) return;

    // hide all pages
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

    // show the page that matches the button id
    const section = document.getElementById(btn.id.replace("Btn",""));
    section.classList.add("active");

    // start quiz only when mini-game is opened
    if(section.id === "game"){
      resetQuiz();
    }
  });
});

// hamburger menu
const hamBtn = document.querySelector("#ham_menu");
const menuItemsList = document.querySelector(".ham_hidden");

hamBtn.addEventListener("click", toggleMenus);

function toggleMenus(){ 
  // toggle the "menushow" class to show or hide menu
  menuItemsList.classList.toggle("menuShow");

  // update button text depending on menu state
  if(menuItemsList.classList.contains("menuShow")){
    hamBtn.innerHTML = "close menu"; 
  } else {
    hamBtn.innerHTML = "open menu"; 
  }
}

document.getElementById("refreshBtn").addEventListener("click", refreshSite);

// quiz 
const questions = [
  {question: "which breed lays blue eggs?", options: ["leghorn","araucana","rhode island red"], correctIndex: 1},
  {question: "what is the scientific name of the domestic chicken?", options: ["gallus gallus domesticus","gallus gallus","gallus varius"], correctIndex: 0},
  {question: "how many eyelids does a chicken have?", options: ["one","two","three"], correctIndex: 2},
  {question: "what is a young female chicken called?", options: ["pullet","cockerel","hen"], correctIndex: 0},
  {question: "what is a castrated male chicken called?", options: ["capon","rooster","stag"], correctIndex: 0},
  {question: "how long does it take for a chicken egg to hatch?", options: ["14 days","21 days","30 days"], correctIndex: 1},
  {question: "which country has the largest chicken population?", options: ["china","usa","brazil"], correctIndex: 0},
  {question: "what is the red fleshy crown on top of a chicken’s head called?", options: ["comb","wattle","crest"], correctIndex: 0},
  {question: "can chickens fly?", options: ["yes, long distances","short distances only","no, not at all"], correctIndex: 1},
  {question: "how many toes does a typical chicken have on each foot?", options: ["three","four","five"], correctIndex: 1}

];

let current = 0, score = 0, timer;
let answered = false;
const quizContainer = document.getElementById("quiz");

// splash screen
function showSplash(){
  clearInterval(timer);
  quizContainer.innerHTML = `
    <p>welcome to the chicken quiz!</p>
    <button id="startBtn">start quiz</button>
  `;
  document.getElementById("startBtn").addEventListener("click", resetQuiz);
}

// render qn
function renderQuestion() {
  clearInterval(timer);
  answered = false;
  quizContainer.innerHTML = "";

  const q = questions[current];

  // show progress and question text
  quizContainer.innerHTML += `<p>question ${current + 1} of ${questions.length}</p>`;
  quizContainer.innerHTML += `<p>${q.question}</p>`;

  // render answer buttons
  q.options.forEach((opt,i)=>{
    quizContainer.innerHTML += `<button data-index="${i}">${opt}</button>`;
  });

  startTimer();
}

// handle answer clicks
quizContainer.addEventListener("click", e=>{
  if(e.target.tagName==="BUTTON" && e.target.dataset.index !== undefined && !answered){
    clearInterval(timer);
    answered = true;
    const idx = parseInt(e.target.dataset.index);

    // check if answer is correct
    if(idx===questions[current].correctIndex){
      score++;
      new Audio("audio/correct.mp3").play();
    } else {
      new Audio("audio/wrong.mp3").play();
    }
    nextQuestion();
  }
});

// timer 
function startTimer(){
  clearInterval(timer); // stop prev timer
  let time = 10;

  const timerSpan = document.createElement("span"); // element to show time remaining
  quizContainer.appendChild(timerSpan); // add timer to quiz

  // create progress bar
  const barContainer = document.createElement("div");
  barContainer.style.width = "100%";
  barContainer.style.height = "15px";
  barContainer.style.backgroundColor = "#ddd";
  barContainer.style.marginTop = "5px";

  const bar = document.createElement("div");
  bar.style.width = "100%";
  bar.style.height = "100%";
  bar.style.backgroundColor = "#f66";
  bar.style.transition = "width 1s linear";
  barContainer.appendChild(bar);

  quizContainer.appendChild(barContainer); //the red rectangle thing below the timer

  // update timer every second
  timer = setInterval(()=>{
    timerSpan.textContent = `time left: ${time}`;
    bar.style.width = `${(time/10)*100}%`;
    time--;
    if(time < 0){
      clearInterval(timer);
      if(!answered){
        answered = true;
        nextQuestion();
      }
    }
  }, 1000);
}

// next question
function nextQuestion(){
  clearInterval(timer);
  current++;
  if(current < questions.length){
    renderQuestion();
  } else {
    // end screen with score
    quizContainer.innerHTML = `<p>game over! score: ${score} / ${questions.length}</p>
      <button id="restartBtn">restart quiz</button>`;
    document.getElementById("restartBtn").addEventListener("click", showSplash);
  }
}

// reset quiz
function resetQuiz(){
  clearInterval(timer);
  current = 0;
  score = 0;
  answered = false;
  quizContainer.innerHTML = "";
  renderQuestion();
}

// initialize
showSplash();

// feedback form
document.getElementById("feedbackBtn").addEventListener("click", function(){
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const feedback = document.getElementById("feedbackText").value.trim();

  if(name === "" || email === "" || feedback.length < 5){
    alert("please fill in all required fields and provide at least 5 characters of feedback.");
    return;
  }

  alert(`thank you, ${name}! your feedback has been received.`);
  
  // reset all inputs
  document.querySelectorAll("#feedbackForm input, #feedbackForm textarea, #feedbackForm select")
    .forEach(el => {
      if(el.type === "checkbox" || el.type === "radio") el.checked = false;
      else el.value = "";
    });
});

// chicken animation
const chick = document.getElementById("chickIcon");
const form = document.getElementById("feedbackForm");

let x = 0, y = 0;
let dir = "right"; // start moving right
const speed = 3;

function moveChick() {
  const maxX = form.offsetWidth - chick.offsetWidth;
  const maxY = form.offsetHeight - chick.offsetHeight;

  // move chicken along rectangle path around the card
  if (dir === "right") {
    x += speed;
    if (x >= maxX) dir = "down";
  } else if (dir === "down") {
    y += speed;
    if (y >= maxY) dir = "left";
  } else if (dir === "left") {
    x -= speed;
    if (x <= 0) dir = "up";
  } else if (dir === "up") {
    y -= speed;
    if (y <= 0) dir = "right";
  }

  // apply new position
  chick.style.left = x + "px";
  chick.style.top = y + "px";
}

// run animation every 30ms
setInterval(moveChick, 30);

function refreshSite(){
  // find the section that is currently active
  const activeSection = document.querySelector(".page.active");

  // if there is an active section, save its id in localstorage
  if(activeSection){
    localStorage.setItem("lastSection", activeSection.id);
  }

  // reload the whole page
  location.reload();
}

// when the page loads again, restore the last active section
document.addEventListener("load", ()=>{
  // get the id of the last active section from localstorage
  const last = localStorage.getItem("lastSection");

  // if one is found then remove active class from all pages
  // then add active class back to the saved section
  if(last){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const section = document.getElementById(last);
    if(section) section.classList.add("active");
  }
});	