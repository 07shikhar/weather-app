const weatherForm = document.querySelector('form') //get the HTML element in a variable
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //prevent from refreshing the browser
    const location = search.value //getting input value in Location variable

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.name
            messageTwo.textContent = data.forecast
        }
    })
})

})
