const startBoard = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]
const startSolution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

// code to new combination of board and solution
let arr = [0, 1, 2];
let board = [];
let solution = [];
function createList(arr){
  let newArr = [];
  let count =0;
  for(let i of arr){
        newArr[count] = i;
        newArr[count+3] = i+3;
        newArr[count+6] = i+6;
        count++;
        // console.log(count);
    }
    // console.log(newArr);
    return newArr
}
function columnShuffle(colArr, str){
    let newStr = '';
    for(let i of colArr){
        newStr += str[i];
    }
    return newStr;
}
function shuffle(){
    arr.sort((a,b) => (0.5 - Math.random()));
    let rowArr = createList(arr);
    arr.sort((a,b) => (0.5 - Math.random()));
    let colArr = createList(arr);
    for(let i in rowArr){
        board[i] = columnShuffle(colArr, startBoard[rowArr[i]]);
        solution[i] = columnShuffle(colArr, startSolution[rowArr[i]]);
    }
    // console.log(board);
    // console.log(solution);
}
shuffle();

// code to make show board on browser and add event listener
let selectedNumber = null;
let err =0;
let timerId = null;
let percentage = 0;
const grid = document.querySelector('.grid');
const number = document.querySelector('.number');
const complete = document.querySelector('.complete');

let createBoard = ()=>{
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            let div = document.createElement('div');
            div.id = ''+i+","+j;
            div.addEventListener("click", clickDigit)
            if(i ==0){
                div.classList.add("topSide");
            }
            if(j ==0){
                div.classList.add("leftSide");
            }
            if(i == 2 || i == 5 || i ==8){
                div.classList.add("verti");
            }
            if(j == 2 || j == 5 || j ==8){
                div.classList.add("horz");
            }
            if(board[i][j] !== '-'){
                div.innerText = board[i][j];
                div.classList.add("wheat");
            }
            grid.append(div);
        }
    }
    for(let i=1; i<=9; i++){
        let div = document.createElement('div');
        div.innerText = i;
        div.style.cursor = "pointer";
        div.addEventListener("click", (event)=>{
            if(selectedNumber !== null){
                selectedNumber.classList.remove("aqua");
            }
            // console.log(this);
            selectedNumber = event.target;
            div.classList.add("aqua");
        })
        number.append(div);
    }
    document.querySelector('h3 > span').innerText = err;

    if(timerId)
        clearInterval(timerId);
    setTimer(new Date().getTime());

    percentage = 43;
    complete.style.width = `${percentage}%`;
}


function clickDigit(){
    // console.log(this);  
    // console.log(i, j);
    if(selectedNumber == null){
        alert("Please select a number");
        return
    }
    if(this.innerText !== ''){
        alert("Already filled");
    }
    const temp = this.id.split(",");
    const i = Number(temp[0]);
    const j = Number(temp[1]);
    if(selectedNumber.innerText === solution[i][j]){
        this.innerText = selectedNumber.innerText;

        percentage += 1.24;
        complete.style.width = `${percentage}%`;
    }else{
        err++;
        document.querySelector('h3 > span').innerText = err;
    }
}


const level = document.querySelector('select');
level.addEventListener('change', ()=>{
    newQuestion();
})


//setting timer feature
const timer = document.querySelector('.nav > h2');
const setTimer = (startTime)=>{
    timerId = setInterval(()=>{
        let time = Math.floor(((new Date().getTime()) - startTime)/1000);
        let hour = Math.floor((time/3600)%24);
        hour = (hour<10)? "0"+hour : hour;
        let minute = Math.floor((time/60)%60);
        minute = (minute < 10)? "0"+minute : minute;
        let second = Math.floor(time%60);
        second = (second < 10)? "0"+second : second;
        // console.log(hour, minute, second);
        // console.log(time)
        timer.innerText = `${hour}:${minute}:${second}`
        
    },1000)
}



function newQuestion(){
    shuffle();
    grid.innerText = "";
    number.innerText = "";
    err=0;
    createBoard();
    
}

function solutionFun(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            // console.log(`#${i},${j}`);
            document.getElementById(`${i},${j}`).innerText = solution[i][j];
        }
    }
    clearInterval(timerId);

    complete.style.width = `${100}%`;
}


createBoard();

