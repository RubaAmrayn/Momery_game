const cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
let shuffled_cards = [];
let opened_cards = [];
let timing;
let stars = document.querySelector('.stars')
let moves = 0, move_element = document.querySelector('span.moves');
let matches = 0, match_element = document.querySelector('span.matches')
let timer = 0, timer_element = document.querySelector('span.timer')
let Name=''

const start_game = async () => {
    const {value: Player_Name} = await Swal.fire({
        title: 'Enter your Name',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write your name!'
          }
        }
      })
      
      if (Player_Name) {
        //start Game
        Name = Player_Name 
        opened_cards = [];
        shuffled_cards = [];
        moves = 0;
        matches = 0;
        timer=0;
        Name =''

        fill_cards(shuffle(cards));
      }
   
}

const counter = () => {
    let seconds = 0
    let mintes = 0
     timing = setInterval(() => {
        
        seconds++
        if(seconds>59){
            seconds = 0
            mintes+=1
        }
     timer_element.innerText=`${mintes||0}:${seconds||0}`

      

     }, 1000/** 1000 ms */);
}
const fill_cards = async cards => {
    
    let deck = document.querySelector('.deck');
    deck.innerHTML=""
    for (card in cards) {
        deck.innerHTML += `<li class='card show open' id='card-${card}' onclick='open_card("card-${card}")'>
        <i class='fa fa-${cards[card]}'></i>
    </li>`
    }
    let wait = await delay(5000).then(()=>{

       
        for(child of deck.children)
       {
          child.className='card'
       }

    })
    counter()
}

const open_card = async Element => {
    moves++
    move_element.innerText = moves

    if(moves>20 && moves<30){
      stars.children[2].firstChild.className='fa fa-star-o'

    }
    else if(moves>30){
        console.log(stars.children[1].firstChild);
        
        stars.children[1].firstChild.className='fa fa-star-o'
    }
    let element_card = document.querySelector('#' + Element)
    element_card.classList.add('open')
    element_card.classList.add('show')
    opened_cards.push(element_card)
    
    
    if (opened_cards.length == 2) {
        if(opened_cards[0].id == opened_cards[1].id){
            moves--;
            move_element.innerText = moves
            opened_cards.pop()
        }else{
            await compare_cards()
        opened_cards = []
        }
        
    }   
    
}
const compare_cards = async () => {
    if (opened_cards[0].children[0].className == opened_cards[1].children[0].className) {
    
        matches++

        opened_cards[0].classList.add('match')
        opened_cards[1].classList.add('match')
        match_element.innerText = matches
        if (matches == 8) {
            finish_game()
        }
    }
    else {
        let wait = await delay(500).then(() => {
            opened_cards[0].className = 'card'
            opened_cards[1].className = 'card'
        });

    }
}
const delay = async time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex); //get random index between 0 - array.length => 16
        currentIndex -= 1; // decrement the array length to finish loop
        temporaryValue = array[currentIndex]; // get the last item in array
        array[currentIndex] = array[randomIndex]; // set last index to the random index
        array[randomIndex] = temporaryValue; // set the last index to the random index
    }
    return array;
}
const finish_game= async ()=>{
    clearInterval(timing)

    const {value: accept} = await Swal.fire({
        title: 'You Win',
        html:`<div class="winner-stars">${stars.innerHTML}</div><br>${Name} You took ${moves} to win`,
        confirmButtonText:
          'Play Again <i class="fa fa-repeat></i>',
        inputValidator: (result) => {
          return !result && 'You need to agree with T&C'
        }
      })
      
      if (accept) {
        start_game()
      }

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
start_game()
document.querySelector('.restart').addEventListener('click',()=>{
    start_game()
})