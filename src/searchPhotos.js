import {ref} from "./index"
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let checkSearchByName = '';
let stringForSearch = '';
export async function searchPhotos(e) {
    e.preventDefault();
    ref.searchButton.disabled = true;
    ref.searchButton.style.backgroundColor = "gray";
    ref.searchButton.disabled = true;
    if(checkSearchByName === ref.searchInput.value)
        {ref.page +=1}
        else{ref.page = 1; checkSearchByName = ref.searchInput.value};
    ref.galleryList.innerHTML = '';

    let option ='';
    stringForSearch = `${ref.URL}?key=${ref.key.toString()}
&q=${ref.searchInput.value}
&image_type=${ref.image_type}
&orientation=${ref.orientation}
&per_page=${ref.per_page}
&page=${ref.page}
`
// робимо get запит

const response = await fetch(stringForSearch);
await response.json()
.then((data)=>{console.dir(data);

if(data.totalHits === 0 ){Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
ref.loadMoreButton.style.display = "none";}
else {Notiflix.Notify.success(`"Hooray! We found ${data.total} images. Now you can see next ${data.hits.length} on the page ${ref.page}`);
ref.loadMoreButton.style.display = "flex";};
if(ref.per_page > data.hits.length && data.totalHits !== 0){Notiflix.Notify.info(`"We're sorry, but you've reached the end of search results."`);
ref.searchInput.value = '';
ref.loadMoreButton.style.display = "none";}



data.hits.forEach(key =>{
    option += `<li class="gallery__item">
    <div class="img--wrap">
    <a class="gallery__link" href="${key.largeImageURL}" target="_parent" rel="noopener noreferrer">
    <img src="${key.webformatURL}" alt="${key.tags}" data-source="${key.largeImageURL}"" />
    </a>
    </div>
    <div class="gallery__item--info">
    <ul class="gallery__item--style"><li>likes</li><li>${key.likes}</li></ul>
    <ul class="gallery__item--style"><li>views</li><li>${key.views}</li></ul>
    <ul class="gallery__item--style"><li>comments</li><li>${key.comments}</li></ul>
    <ul class="gallery__item--style"><li>downloads</li><li>${key.downloads}</li></ul>
    </div></li>`
})

ref.galleryList.insertAdjacentHTML('afterbegin',option);

new SimpleLightbox('.gallery__link', { 
    captionsData: "alt",  
    close:	"true",
    docClose: "true",
    captionDelay: 250, 
    fixedClass: "sl-fixed",
    })
    ref.searchButton.disabled = false;
    ref.searchButton.disabled = false;
    ref.searchButton.style.backgroundColor = "#096710";
})
}