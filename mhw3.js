
/*MEDIASTACK API*/

function onResponse1(response) {
    console.log('Risposta ricevuta');
    return response.json();
}


function onJson1(json){
    console.log(json);
    let num_results = json.data.length;
    let cont = document.querySelector('#sec4');
    if (num_results > 6) {
        num_results = 6;
    }
    for (let i = 0; i < num_results; i++) {


        const news = json.data[i];

        let titlee = document.createElement('em');
        let div = document.createElement('div');
        let a = document.createElement("a");

        titlee.textContent = news.title;
        a.setAttribute('href', news.url);
        
        
        cont.appendChild(div);
        
        div.appendChild(a);
        a.appendChild(titlee);
    }


}


function apinew() {
    fetch('http://api.mediastack.com/v1/news?access_key=' + productionnewsapikey+ '&categories=general&languages=it&keywords=spotify+chart&sort=popularity').then(onResponse1).then(onJson1);
}

const productionnewsapikey = '84a4b7c89cf702adeec2ceb788dd5f63';
apinew();





/*SPOTIFY API CON OAUT2*/ 

  function identifier(event){  
    const id = ""  
    if(event.currentTarget==links[0]){
        const id = "4Oqkld5IRYWlwIcx4XQ4LZ"
        return id
    }else if(event.currentTarget == links[1]){
        const id = "7wJFRjIiHMLUrXwfVRG8cb"
        return id
    }else if(event.currentTarget == links[2]){
        const id = "2RsHz7FFkdyN4ZCohJRbdw"
        return id
    }else if(event.currentTarget == links[3]){
        const id = "3ro8HD9nWLBTay5l195x9B"
        return id
    }

  }



function search(event){

    event.preventDefault();
    const id = identifier(event)
    console.log(id)

    console.log('Eseguo ricerca');

    fetch("https://api.spotify.com/v1/artists/"+ id + "/albums",
        {
        headers:
        {
            'Authorization': 'Bearer ' + token
        }
        }

    ).then(onResponse).then(onJson);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

  function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);

    const show = document.querySelector('#album-view');
    show.innerHTML = '';

    const results = json.items;
    let num_results = results.length;

    if(num_results > 6){
      num_results = 6;
    }

    for(let i=0; i<num_results; i++){
      const album_data = results[i]
      const title = album_data.name;
      const selected_image = album_data.images[0].url;
      const album = document.createElement('div');
      album.classList.add('album');
      const img = document.createElement('img');
      img.src = selected_image;
      const caption = document.createElement('span');
      caption.textContent = title;
      album.appendChild(img);
      album.appendChild(caption);
      show.appendChild(album);
    }

    const button = document.querySelector('#hideDetails')
    button.classList.remove('hidden')
    button.addEventListener('click', hide)

  }

  function hide(event){
    event.preventDefault();
    const show = document.querySelector('#album-view');
    show.innerHTML = '';
    const button = document.querySelector('#hideDetails')
    button.classList.add('hidden')
    button.removeEventListener('click', hide)
    button.addEventListener('click', show)

  }

  function show(event){
    const button = document.querySelector('#hideDetails')
    button.classList.remove('hidden')
    button.addEventListener('click', hide)
    button.removeEventListener('click', show)
  }


  function onTokenJson(json){
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response){
  return response.json();
}


const client_id = '2524aac8199b466ab24ef9bd449b4606';
const client_secret = '3845022f3a084cc7a5931f5009ceaa12';
let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

  const links = document.querySelectorAll('#sec5 a');
  for(link of links){
    link.addEventListener('click', search);
  }

  
/*CLIC MENU' INTERATTIVO*/
function showDetails(event){
  const menu = document.querySelector('#menuDetails')
  menu.classList.remove('hidden')

  const button = document.querySelector('#menu')
  button.removeEventListener('click', showDetails)
  button.addEventListener('click', hideDetails)
  
}

function hideDetails(event){ 
  const menu = document.querySelector('#menuDetails')
  menu.classList.add('hidden')
  
  const button = document.querySelector('#menu')
  button.removeEventListener('click', hideDetails)
  button.addEventListener('click', showDetails)
  
  
}

const menu = document.querySelector('#menu')
menu.addEventListener('click', showDetails)


