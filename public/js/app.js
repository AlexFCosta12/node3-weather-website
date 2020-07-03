console.log('Client side js file is loaded!');


const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
//const messageOne = document.getElementById ('message-1')
//const messageTwo = document.getElementById ('message-2')
//messageOne.innerText=error Adicionar texto qunado
// or
const messageOne = document.querySelector ('#message-1')
const messageTwo = document.querySelector ('#message-2')
//messageOne.textContent='Ola123'

weatherFrom.addEventListener ('submit' ,(e) => {
    e.preventDefault()
    const location = search.value;

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    
//fetch ('/weather?address='+location+'').then((response) => { - Para o mesmo servidor não precisa de endereço, so do caminho 
    fetch ('http://localhost:3000/weather?address='+location+'').then((response) => {
    response.json().then (({error, forecast, location, temperature}) => {
        if (error) return messageOne.textContent=error
        messageOne.textContent= forecast +' - '+location
        messageTwo.textContent=''+temperature+'ºC';  
        })
    })

} )