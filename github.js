let input = document.getElementById('search');
let template = document.getElementById('template');
input.addEventListener('keyup', (e)=>{
  
    if(e.key === 'Enter'){
    let searchValue =  e.target.value
        searchApi(searchValue);
    }
})

// Speech
let btn = document.getElementById('btn');

btn.addEventListener('click',e => {
    window.SpeechRecognition = window.webkitSpeechRecognition;
    let speech = new SpeechRecognition();
    speech.addEventListener("result",e => {
        let text = e.results[0][0].transcript;
        let finalWord = (input.value = text);
        // localStorage.setItem(finalWord);
        searchApi(finalWord)
    });speech.start();
});


async function searchApi(searchvalue){
    let URL = "https://api.github.com/users"
    let data = await window.fetch(`${URL}/${searchvalue}`);
    let JSON =  await data.json();
    let {login,avatar_url,html_url,repos_url,company,location, bio} = JSON;
    template.innerHTML= `<main>
    <div>
    <img src=${avatar_url} alt=${login}/>
    <h2> User Name: ${login}</h2>
    <h5>Url: ${html_url}</h5>
    <h5>Repos_url:${repos_url}</h5>
    <h5>Company:${company}</h5>
    <h5>Location:${location}</h5>
    <h5>Bio:${bio}</h5>
  

    </div>
    </main>`;
   
}