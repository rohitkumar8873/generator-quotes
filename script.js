const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

//by using api throgh server
let apiQuotes=[];

//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuotes(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // console.log(quote);
    if(!quote.author)
    {
        authorText.textContent='Unknown';
    }
    else{
        
        authorText.textContent=quote.author;
    }
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}
async function getQuotes(){
    loading();
    const apiUrl="https://type.fit/api/quotes";
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        // console.log(apiQuotes[12])
        newQuotes();
    }catch(error){
        // alert()
    }
}
getQuotes();

// tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
loading();
// by using quotes.js by simply put all api in local method1

// function newQuotes(){
//     const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)];
//     console.log(quote);
// }

