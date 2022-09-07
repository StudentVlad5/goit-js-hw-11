import {ref} from "./index"
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let stringForSearch = '';
export async function loadMore (e) {
    e.preventDefault();
    ref.page +=1;
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
     
    ref.galleryList.insertAdjacentHTML('beforeend',option);
    
    if(data.totalHits === 0 ){Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
    else {Notiflix.Notify.success(`"Hooray! We found ${data.total} images. Now you can see  ${document.querySelectorAll('.img--wrap').length}`);
    ref.loadMoreButton.style.display = "flex";};
    if(ref.per_page > data.hits.length && data.totalHits !== 0){Notiflix.Notify.info(`"We're sorry, but you've reached the end of search results."`);
    ref.searchInput.value = '';
    ref.loadMoreButton.style.display = "none";}
    
    new SimpleLightbox('.gallery__link', { 
        captionsData: "alt",  
        close:	"true",
        docClose: "true",
        captionDelay: 250, 
        })
    
    const { height: cardHeight } = document.querySelector(".gallery__link").firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 3,
          behavior: "smooth",
        });
    })
    await fetch(error=>console.log("Sorry, there are no images matching your search query. Please try again."))}

