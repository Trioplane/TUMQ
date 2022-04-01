const startBtn = document.getElementById('start-btn')
const resBtn = document.getElementById('res-btn')
const questionContainer = document.getElementById('question-container')
const questionElem = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const alertContainer = document.querySelector("[data-alert-container]");
const p = document.getElementById('p')
const score = document.getElementById('score')




let shuffledQs, currentQI

resBtn.addEventListener('click', () => {
    window.location.reload()
})
startBtn.addEventListener('click', startGame)
function nextQAfter3S() {
    currentQI++
    setNextQuestion()
}

function showAlert(message, duration = 500) {
    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");
    alertContainer.prepend(alert);
    if (duration == null) return;
    setTimeout(() => {
      alert.classList.add("hide");
      alert.addEventListener("transitionend", () => {
        alert.remove();
      });
    }, duration);
  }
    
function startGame() {
    startBtn.classList.add('hide')
    shuffledQs = questions.sort(() => Math.random - .5)
    currentQI = 0
    questionContainer.classList.remove('hide')
    p.classList.add('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetRemButState()
    showQuestion(shuffledQs[currentQI])
}

function showQuestion(question) {
    questionElem.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

function resetRemButState() {
    clearStatusClass(document.body)
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    if (correct) {
        score.innerText = parseInt(score.innerText) + 1
    } else {
        score.innerText = parseInt(score.innerText) - 1
    }
    setStatusClass(document.body, correct)
    corWro(correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQs.length > currentQI + 1) {
        setTimeout(nextQAfter3S, 1000)
    } else {
        resBtn.classList.remove('hide')
        const scoreWas = document.getElementById('scoreWas')
        scoreWas.innerText = `Your score was ${score.innerText}, Wanna try again? Click this`
    }

}

function setStatusClass(elem, cor) {
    clearStatusClass(elem)
    if (cor) {
        elem.classList.add('correct')
    } else {
        elem.classList.add('wrong')
    }
}

function corWro(cor) {
    if (cor) {
        showAlert('Correct!')
    } else {
        showAlert('Wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Easy | How do you get a piece of wood?',
        answers: [
            { text: 'By punching it with your fist', correct: true },
            { text: 'By getting a stone axe and choppping a tree', correct: false },
            { text: 'By killing a zombie to get punching level points to be able to hit and break a tree', correct: false }
        ]
    },
    {
        question: 'Medium | What happens if flowing water touches a lava source?',
        answers: [
            { text: 'It will make stone', correct: false },
            { text: 'It will make glowstone', correct: false },
            { text: 'It will make obsidian', correct: true },
            { text: 'It will make diamonds, However a zombie and a witch will spawn', correct: false }
        ]
    },
    {
        question: 'Hard | How do you make an End Crystal?',
        answers: [
            { text: '1 Ghast Tear, 3 Obsidian, 5 Glass', correct: true },
            { text: '1 Beacon, 2 Nether Stars, 3 Diamonds, 3 Glass', correct: false },
            { text: "1 Dragon's Breath, 2 Shulker Shells, 2 Diamonds, 4 Glass", correct: false }
        ]
    },
     {
         question: 'Easy | How do you kill a mob?',
         answers: [
             { text: 'By crafting an iron knife and stabbing it', correct: false },
             { text: 'By punching it to death with a sword, bow or just your hand', correct: true },
             { text: 'By using elemental energy you crafted using lava and water to make a magic knife to kill the mob', correct: false }
         ]
     },
     {
         question: 'Medium | What height does deepslate spawn?',
         answers: [
             { text: 'Y -150', correct: false },
             { text: 'Y 7', correct: true },
             { text: 'Y -263', correct: false },
             { text: 'Y -358', correct: false },
             { text: 'Y -500', correct: false }
         ]
     },
 {
     question: 'Easy | If you make a 5 by 2 Glowstone rectangle and put water inside, What will happen?',
     answers: [
         { text: 'Nothing', correct: true },
         { text: 'It will make a portal that takes you to the Aether Dimension', correct: false },
         { text: 'It will summon the Aether Dragon that you can ride', correct: false }
     ]
 },
 {
     question: 'Medium | In the Nether, every block you travel is equal to _ in the Overworld',
     answers: [
         { text: '0', correct: false },
         { text: '8', correct: true },
         { text: '2', correct: false }
     ]
 },
 {
     question: 'Hard | Translate this into word form : 1.12, 1.19, 1.15, 1.11, 1.13, 1.16',
     answers: [
         { text: 'The Wild Update, World of Color, Buzzy Bees, Aquatic Update, The Nether Update, The Exploration Update', correct: false },
         { text: 'The Wild Update, World of Color, Aquatic Update, The Nether Update, Aquatic Update, The Exploration Update', correct: false },
         { text: 'The Exploration Update, The Wild Update, Aquatic Update, Buzzy Bees, The Nether Update, World of Color', correct: false },
         { text: 'World of Color, The Wild Update, Buzzy Bees, The Exploration Update, Aquatic Update, The Nether Update', correct: true },
     ]
 },
 {
     question: 'Medium | What was the first blocks in Minecraft?',
     answers: [
         { text: 'Grass and Wood', correct: false },
         { text: 'Cobblestone and Grass', correct: true },
         { text: 'Dirt and Planks', correct: false }
     ]
 },
 {
     question: 'Extreme | What snapshot version did the Basalt Delta get added?',
     answers: [
         { text: '17w13a', correct: false },
         { text: '20w15a', correct: true },
         { text: '63w382q', correct: false }
     ]
 },
 {
     question: 'Hard | How do you read snapshot names?',
     answers: [
         { text: 'Update Number w Year a letter (16w20a, UUwYYa)', correct: false },
         { text: 'Year w Week a letter (22w10a, YYwWWa)', correct: true },
         { text: 'A random number w 1 to 20 b (69w13b, ??w1-20b)', correct: false }
     ]
 },
 {
     question: 'Medium | What is the strongest mob in Minecraft?',
     answers: [
         { text: 'The Warden', correct: true },
         { text: 'The Ender Dragon', correct: false },
         { text: 'Iron Golem', correct: false },
         { text: 'The Wither', correct: false }
     ]
 },
 {
     question: 'Medium | Which is a feature',
     answers: [
         { text: 'You can mine a mob spawner and change the mob inside it in your inventory', correct: false },
         { text: 'A frog can eat magma cubes', correct: true },
         { text: 'Any entity can fast travel using Waypoints', correct: false }
     ]
 },
 {
     question: 'Easy | How can you tell the difference between Java and Bedrock Graphics?',
     answers: [
         { text: 'You can see a Bedrock Edition watermark on the top left', correct: false },
         { text: 'When hovering on an inventory slot you will see green and the lighting is a bit different', correct: true },
         { text: 'The blocks on java edition are more rounded while bedrock is triangles', correct: false }
     ]
 },
 {
     question: 'Easy | Java _ Bedrock?',
     answers: [
         { text: 'Java < Bedrock, Bedrock is the best!', correct: false },
         { text: 'Java > Bedrock, We all know that Java is better', correct: false },
         { text: 'Java != Bedrock, None are good fOrTnItE iS bEtTeR', correct: false },
         { text: 'Java = Bedrock, They are both not perfect, They are both Minecraft, Theyre all the same', correct: true }
     ]
 },
 {
     question: 'Easy | Is Herobrine real?',
     answers: [
         { text: 'Yes', correct: false },
         { text: 'No', correct: true },
     ]
 },
 {
     question: 'Hard | How many Minecraft Editions are there?',
     answers: [
         { text: '10', correct: false },
         { text: '17', correct: true },
         { text: '26', correct: false }
     ]
 },
 {
     question: 'Medium | Which of these are not in Minecraft: "Bundle, Candle, Nether Chest, Diamond Crystals, Dripstone"',
     answers: [
         { text: 'Bundle and Dripstone', correct: false },
         { text: 'Nether Chest and Diamond crystals', correct: true },
         { text: 'Dripstone and Candle', correct: false },
         { text: 'Nether Chest and Dripstone', correct: false },
         { text: 'Bundle and Diamond Crystals', correct: false },
     ]
 },
 {
     question: 'Medium | What happens if you kill a player named "Notch"',
     answers: [
         { text: 'You will be given creative mode', correct: false },
         { text: 'It will drop an apple', correct: true },
         { text: 'Nothing', correct: false },
     ]
 },
 {
     question: 'Medium | When did Minecraft ALPHA Release?',
     answers: [
         { text: 'June 30 2010', correct: true },
         { text: 'November 18 2011', correct: false },
         { text: 'December 16 2020', correct: false }
     ]
 },
 {
     question: 'Medium | How many Development Versions are there',
     answers: [
         { text: '10', correct: false },
         { text: '6', correct: true },
         { text: '7', correct: false }
     ]
 },
 {
     question: 'Hard | What happens when you spawn a cat on a witch hut?',
     answers: [
         { text: 'It will become a cat witch', correct: false },
         { text: 'Nothing', correct: false },
         { text: 'It will become a black cat', correct: true },
     ]
 },
 {
     question: 'Easy | Can you bounce off of slimes?',
     answers: [
         { text: 'True', correct: false },
         { text: 'False', correct: true },
         { text: 'Uhh, i dont know', correct: false }
     ]
 },
 {
     question: 'Medium | Which one of these Minecraft Update names is real?',
     answers: [
         { text: 'The Last Update', correct: false },
         { text: 'The Combat Update', correct: true },
         { text: 'The Forest Update', correct: false }
     ]
 },
 {
     question: 'Hard | How many Minecraft Editions are there?',
     answers: [
         { text: '10', correct: false },
         { text: '17', correct: true },
         { text: '26', correct: false }
     ]
 },
 {
     question: 'Hard | What is the rarest ore in the overworld?',
     answers: [
         { text: 'Emerald Ore', correct: false },
         { text: 'Deepslate Coal Ore', correct: true },
         { text: 'Deepslate Diamond Ore', correct: false },
         { text: 'Copper Ore', correct: false },
         { text: 'Deepslate Netherite Ore', correct: false }
     ]
 },
 {
     question: 'Easy | What is the correct way to beat Minecraft?',
     answers: [
         { text: 'Spawn > Nether > Deepther > End', correct: false },
         { text: 'Spawn > Aether > Overworld > End > Nether', correct: false },
         { text: 'Spawn > Overworld > Nether > End', correct: true },
     ]
 },
 {
     question: 'Hard | What happens if you use a tool but use it for a different purpose',
     answers: [
         { text: 'It will break instantly', correct: false },
         { text: 'Nothing', correct: false },
         { text: 'It will take 2 Durabilty away each time', correct: true },
     ]
 },
 {
     question: 'Easy | What is the alphabet used in the Enchanting Table',
     answers: [
         { text: 'Mojangles', correct: false },
         { text: 'Standard Galactic', correct: true },
         { text: 'Chinese', correct: false },
     ]
 },
]