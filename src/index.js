import "simplelightbox/dist/simple-lightbox.min.css";
import {searchPhotos} from "./searchPhotos";
import {loadMore} from "./loadmore";

export const ref = {
    key: "29531534-c6f4c4079f81828b6fd250707",
    URL: "https://pixabay.com/api/",
    image_type: "photo",
    orientation: "horizontal",
    per_page: 40,
    page: 1,
    checkCountOfPhotos: 0,
    galleryList: document.querySelector('.gallery__list'),
    searchButton: document.querySelector('button[type="submit"]'),
    searchInput: document.querySelector('input'),
    loadMoreButton: document.querySelector('.load-more'),
}
let checkSearchByName = '';
let stringForSearch = '';
// функція пошуку

ref.searchButton.addEventListener('click',searchPhotos)
ref.loadMoreButton.addEventListener('click',loadMore)

