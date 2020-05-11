const showBtn=document.getElementById('show');
const cardsContainer=document.getElementById('cards-container');
const prevBtn=document.getElementById('prev');
const currentEl=document.getElementById('current');
const nextBtn=document.getElementById('next');
const hideBtn=document.getElementById('hide');
const questionEl=document.getElementById('question');
const answerEl=document.getElementById('answer');
const addCardBtn=document.getElementById('add-card');
const clearBtn=document.getElementById('clear');
const addContainer=document.getElementById('add-container');

//Keep track of current card
let currentActiveCard=0;

//Store DOM cards we need 2 arr
const cardsEl=[];

// //Store card data
const cardsData=getCardsData();



// const cardsData=[
//     {
//         question:'What must be a variable begin with?',
//         answer:'A letter , $ or _'
//     },
//     {
//         question:'What is a variable?',
//         answer:'Container for a piece of data'
//     },
//     {
//         question:'Example of Case Sensitive Variable',
//         answer:'thisIsAVariable'
//     }
// ];

//Create all cards cardsData arr'in icinde dolasiyoruz
function createCards() {
    cardsData.forEach((data,index)=>createCard(data,index));
}

//Crate a single card in DOM kartın ön yüzünü gerçekliyoruz 'active' triggerlanıyor
function createCard(data,index) {
    const card=document.createElement('div');
    card.classList.add('card');

    if (index===0) {
        card.classList.add('active');
    }
    card.innerHTML=`
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
       ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
    `;
//css deki class'ı kullandık
    card.addEventListener('click',()=>card.classList.toggle('show-answer'));


    //Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);


    updateCurrentText();
}
//Show number of cards
function updateCurrentText() {
    currentEl.innerText=`${currentActiveCard+1}/${cardsEl.length}`;
}


//Get Cards from local storage
function getCardsData() {
    const cards=JSON.parse(localStorage.getItem('cards'));
    return cards===null?[]:cards;
}

//Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
}

createCards();

//Event Listeners cardsEl is the dom arr element

nextBtn.addEventListener('click',()=>{
cardsEl[currentActiveCard].className='card left';
currentActiveCard=currentActiveCard+1;

//arr.length'ten ileri gitmesini engeller
if (currentActiveCard>cardsEl.length-1) {
    currentActiveCard=cardsEl.length-1;
}

cardsEl[currentActiveCard].className='card active';

updateCurrentText();

});
//Event Listeners cardsEl is the dom arr element

prevBtn.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className='card right';
    currentActiveCard=currentActiveCard-1;
    //0 dan geri gitmesini engeller
    if (currentActiveCard<0) {
        currentActiveCard=0;
    }
    
    cardsEl[currentActiveCard].className='card active';
    
    updateCurrentText();
    
    });

    //show add container css 'show' aktivite eder
    showBtn.addEventListener('click',() => addContainer.classList.add('show'));

//hide add container
    hideBtn.addEventListener('click',() => addContainer.classList.remove('show'));


    //Add new card
    addCardBtn.addEventListener('click',()=>{
        const question=questionEl.value;
        const answer=answerEl.value;
        // console.log(question,answer)

        if (question.trim()&&answer.trim()) {
            const newCard={question,answer};//new instances question:question
            createCard(newCard);


            questionEl.value=answerEl.value='';

            addContainer.classList.remove('show');


            cardsData.push(newCard);//cardsData arr'ine yeni push ettik
            setCardsData(cardsData);
        }
    });

    //Clear cards button
    clearBtn.addEventListener('click',()=>{
localStorage.clear();
cardsContainer.innerHTML='';
window.location.reload();
    });