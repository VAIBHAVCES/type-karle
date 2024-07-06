const resetButton = document.querySelector("#reset")
const inputElement = document.querySelector("#inp")
const clock = document.querySelector("#clock")
const textBox = document.querySelector(".text-box")


// gameStatus = 0 => not running
// gameStatus = 1 => running
const gameData = {
    correct : 0,
    gamePointer: 0,
    totalWords : 50,
    time : 60,
    gameStatus: 0,
    totalTime: 60,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit Esse dolore cupiditate culpa quam eius eligendi aut recusandae eveniet reiciendis ipsa, voluptates fuga rerum nostrum Voluptate fugit nam ad deserunt enim in nisi aperiam asperiores necessitatibus mollitia at dolore nesciunt, porro delectus sapiente eius saepe amet laborum? Fugit aliquam quisquam laboriosam?"
}

inputElement.addEventListener('input', function() {
    // console.log('Input event triggered:', this.value);
    const words = document.querySelectorAll(".word")

    if(gameData.gameStatus==0){
        gameData.gameStatus = 1;
        startGame()
    }

    let inputValue = inputElement.value
    let lastChar= inputValue.charAt(inputValue.length-1);
    let content = inputValue.substring(0, inputValue.length-1)
    if(lastChar==' '){
        const nthWord = document.querySelectorAll(".word")[gameData.gamePointer]
        if(nthWord.textContent===content){
            nthWord.style.color="#45b345"
            gameData.correct++;
        }else{
            nthWord.style.color="red"
        }
        gameData.gamePointer++;
        inputElement.value = ""
    }

    
    // Call your method or perform actions here
});


function startGame(){
    if(gameData.time==0){
        finishGame();
        return;
    }
    if(gameData.gameStatus==0){
        resetPage();
        return;
    }
    gameData.time--;
    document.querySelector("#clock").innerHTML = gameData.time+"sec"
    setTimeout(startGame, 1000);
}



resetButton.addEventListener("click", ()=>{
    // console.log("button click")
    gameData.gameStatus = 0
})

function finishGame(){
    console.log("Game ended")
    const totalWords= gameData.gamePointer+1
    const speedPerMinute = parseFloat((totalWords/gameData.totalTime)*60.0).toFixed(0)
    
    const accuracy = parseFloat(( (gameData.correct+1)/totalWords)*100.0).toFixed(2)
    alert(
`
Thanks for playing.
You attempted : ${totalWords} words
out of which ${gameData.correct+1} were correct
You speed is : ${speedPerMinute} wps
Your accuracy is  : ${accuracy}% 

`)
location.reload()
}

function resetPage(){
    gameData.time = 60
    gameData.gameStatus= 0
    clock.innerHTML = gameData.time+"sec"
    inputElement.value = ""

}

function renderPage(){


    fetch("https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1")
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
        gameData.text = data[0]
        let words = gameData.text.split(" ").filter(itr=>itr!='')
        gameData.totalWords = words.length
        for(let i=0; i<words.length; i++){
            const word = words[i];
            const span = document.createElement('span')
            span.className = 'word'
            span.textContent = word
            textBox.appendChild(span)
        }
    
    })
    .catch(error => {
        console.error('Error:', error);  // Handle any errors
    });
}
renderPage()