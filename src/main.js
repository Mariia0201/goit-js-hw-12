import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSearch = document.querySelector('.form');
const imageList = document.querySelector('.gallery');
const loadingIndicator = document.querySelector('.loading');
const nextBtn = document.querySelector('#next-btn');

let page = 0;
let searchValue = null;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

nextBtn.addEventListener('click', nextPage);
formSearch.addEventListener('submit', handleSearch);

function showLoader() {
  loadingIndicator.classList.remove('is-hidden');
}

function hideLoader() {
  loadingIndicator.classList.add('is-hidden');
}

async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.input.value;

  searchValue = searchQuery;
  page = 1;

  nextBtn.classList.add('is-hidden');
  const form = event.currentTarget;

  imageList.innerHTML = '';

  if (!searchQuery.trim()) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#f96c6c',
      backgroundColor: '#f5d1d1',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  showLoader();

  try {
    const response = await fetchImages();
    if (response.hits.length === 0) {
      iziToast.show({
        theme: 'dark',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16px',
        messageColor: '#f96c6c',
        backgroundColor: '#f5d1d1',
        position: 'topRight',
        timeout: 5000,
      });
      form.reset();
      return;
    }

    imageList.innerHTML = createMarkup(response.hits);
    gallery.refresh();

    if (response.hits.length >= 40) {
      nextBtn.classList.remove('is-hidden');
    }

    scrollBy();
    form.reset();
  } catch (err) {
    handleError(err);
  } finally {
    hideLoader();
  }
}

async function fetchImages() {
  const BASE_URL = 'https://pixabay.com/api';
  const searchParams = new URLSearchParams({
    key: '42093886-563b8eca1b4570c32a235ec3c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  });
  const res = await axios.get(
    `${BASE_URL}/?${searchParams}&q=${searchValue}&page=${page}`
  );
  return res.data;
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
      `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          width="360"
        />
      </a>
      <div class="info">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${likes}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${views}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${comments}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${downloads}</p>
        </div>
      </div>
    </li>`
    )
    .join('');
}

function handleError(err) {
  console.error(err);
  imageList.innerHTML = '';
  iziToast.show({
    theme: 'dark',
    message: err.stack,
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });

  nextBtn.removeEventListener('click', nextPage);
  nextBtn.classList.add('is-hidden');
}

async function nextPage() {
  showLoader();
  nextBtn.classList.add('is-hidden');
  page += 1;

  try {
    const res = await fetchImages();

    if (page * 40 >= res.totalHits) {
      iziToast.show({
        title: '❕',
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 5000,
      });
      imageList.innerHTML += createMarkup(res.hits);
      gallery.refresh();
      nextBtn.classList.add('is-hidden');

      scrollBy();

      return;
    }

    imageList.innerHTML += createMarkup(res.hits);
    gallery.refresh();

    scrollBy();

    nextBtn.classList.remove('is-hidden');
  } catch (err) {
    handleError(err);
  } finally {
    hideLoader();
  }
}

function scrollBy() {
  window.scrollBy({
    top: 640,
    behavior: 'smooth',
  });
}