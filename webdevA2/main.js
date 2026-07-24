// pages settings
document.addEventListener('DOMContentLoaded', () => {

    const hamMenuBtn = document.querySelector('#ham_menu');
    const hamHiddenDiv = document.querySelector('.ham_mobile');
    const navList = document.querySelector('nav ul');
    const pages = document.querySelectorAll('.page');

    // set home page as the first page users see
    document.querySelector('#homePage').classList.add('active');

    // toggle hamburger menu on mobile
    hamMenuBtn.addEventListener('click', () => {
        hamHiddenDiv.classList.toggle('show');
    });

    // event delegation for clicks
    navList.addEventListener('click', (event) => {
        // make sure only buttons click trigger pages
        if (event.target.tagName === 'BUTTON') {
            const buttonId = event.target.id;

            // hide all other pages except current page
            pages.forEach((page) => {
                page.classList.remove('active');
            });

            // show the page based on clicked button
            if (buttonId === 'homeBtn') {
                document.querySelector('#homePage').classList.add('active');
            } else if (buttonId === 'historyBtn') {
                document.querySelector('#historyPage').classList.add('active');
            } else if (buttonId === 'typesBtn') {
                document.querySelector('#typesPage').classList.add('active');
            } else if (buttonId === 'dishesBtn') {
                document.querySelector('#dishesPage').classList.add('active');
            } else if (buttonId === 'gameBtn') {
                document.querySelector('#gamePage').classList.add('active');
            }
        }
    });
});

// slideShow images settings
const slideshowTrack = document.getElementById('slideshowTrack');
const leftBtn = document.getElementById('slideLeft');
const rightBtn = document.getElementById('slideRight');

// Helper function to calculate scroll distance dynamically
const getScrollAmount = () => {
  const firstImg = slideshowTrack.querySelector('img');
  const gap = 20; 
  
  // check that image exists, scroll its width + gap; else default to track width
  return firstImg ? firstImg.clientWidth + gap : slideshowTrack.clientWidth;
};

leftBtn.addEventListener('click', () => {
  slideshowTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  slideshowTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

// chicken clicker game
const pixelChicken = document.getElementById("pixelChicken");

function getRandom(min, max) {
	return Math.round(Math.random() * (max - min)) + min; // select no. between max and min
}

const gameArea = document.querySelector(".gameArea");

function MovepixelChicken() {
    if (!gameArea) return;

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const maxLeft = areaWidth - pixelChicken.offsetWidth;
    const maxTop = areaHeight - pixelChicken.offsetHeight;

    pixelChicken.style.left = getRandom(0, Math.max(0, maxLeft)) + "px";
    pixelChicken.style.top = getRandom(0, Math.max(0, maxTop)) + "px";
}

var MovepixelChickenItv = setInterval(MovepixelChicken, 900);

const scoreBox = document.getElementById("scoreBox");

const clickAudio = new Audio("audio/clickedsound.mp3"); // create audio object

var score = 0;
var frameIndex = 1;
const maxFrames = 4;

function chickenClicker() {
	score++; //	increase score after every click 
	scoreBox.innerHTML = "Caught Chickens: " + score;
	clickAudio.play();
	
	if (score >= 1000) {
        clearInterval(MovepixelChickenItv);
		scoreBox.innerHTML = "Congrats! You Caught: " + score + " chickens!";
    }
	//sprite settings
	frameIndex = (frameIndex  % maxFrames) + 1; //	moving of the css sprite from frame to frame
	pixelChicken.className = "sprite-" + frameIndex; // change the class to display the next sprite frame 
}
pixelChicken.addEventListener("click", chickenClicker); //	link my chicken to chickenclicker function
// Chicken quiz 
const quizData = [
    { 
        question: "How many distinct vocalizations can chickens use to communicate?", 
        options: ["5", "12", "Over 30", "100+"], 
        correct: "Over 30" 
    },
    { 
        question: "Which wild bird is considered the main ancestor of modern chickens?", 
        options: ["Red Junglefowl", "Dodo Bird", "Wild Turkey", "Golden Pheasant"], 
        correct: "Red Junglefowl" 
    },
    { 
        question: "Which chicken breed is famous for its completely black feathers, skin, and bones?", 
        options: ["Silkie", "Ayam Cemani", "Leghorn", "Orpington"], 
        correct: "Ayam Cemani" 
    },
    { 
        question: "What style is chicken traditionally cooked for Hainanese Chicken Rice?", 
        options: ["Deep-fried", "Poached or roasted", "Grilled", "Smoked"], 
        correct: "Poached or roasted" 
    }
];

const quizContainer = document.querySelector("#quizContainer");
const btnSubmit = document.querySelector("#btnSubmit");
const quizScorebox = document.querySelector("#quizScorebox");

function renderQuiz() {
    quizContainer.innerHTML = ""; // Clear existing content
    
    quizData.forEach((item, index) => {
        const fieldset = document.createElement("fieldset");
        fieldset.className = "quizFieldset";
        
        let html = `<legend class="quizLegend">${index + 1}. ${item.question}</legend>`;
        
        item.options.forEach(opt => {
            html += `
                <label class="quizOption">
                    <input type="radio" name="q${index}" value="${opt}">
                    ${opt}
                </label>`;
        });
        
        fieldset.innerHTML = html;
        quizContainer.appendChild(fieldset);
    });
}

function checkQuizAns() {
    let score = 0;
    
    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name='q${index}']:checked`);
        if (selected && selected.value === item.correct) {
            score++;
        }
    });
    
    quizScorebox.innerHTML = `Score: ${score} / ${quizData.length}`;
}

renderQuiz();
btnSubmit.addEventListener("click", checkQuizAns);