// https://api.tvmaze.com 


const form = document.querySelector("#searchForm");
const images = document.querySelector("#images");
let numQueries = 0;

async function submitFunction(e) {
    e.preventDefault();
   
      
      if (numQueries >= 2){
        form.removeEventListener('submit', submitFunction);
        form.addEventListener('submit', (e) => e.preventDefault());
        alert("Max number of queries reached!")
    } else {
        while (images.firstChild) {
            images.removeChild(images.lastChild);
        }
    const searchInput = form.elements.query.value;
    const config = {params : {q: searchInput}};
    const response = await axios.get('https://api.tvmaze.com/search/shows?',config);
    makeImages(response.data);
    form.elements.query.value = '';
    numQueries++;
    }
    
   
}

form.addEventListener('submit', submitFunction);

const makeImages = (shows) => {
    for (let member of shows){
        if (member.show.image){
            const img = document.createElement('img');
            img.src = member.show.image.medium;
            images.append(img);
        }
    }
}
