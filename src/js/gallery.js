import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('ul.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const lightboxImgEl = document.querySelector('img.lightbox__image');
const btnCloseEl = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const galleryMarkup = makeGalleryMarkup(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

galleryList.addEventListener('click', onLightboxOpenClick);
btnCloseEl.addEventListener('click', imageClose);
overlay.addEventListener('click', imageClose);

function makeGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

const arrGalleryList = galleryList.querySelectorAll('.gallery__image');
const arrGalleryListCopy = [...arrGalleryList];

console.log(arrGalleryList);

function onLightboxOpenClick(e) {
  e.preventDefault();

  const imgClick = e.target;
  if (imgClick.nodeName !== 'IMG') {
    return;
  }

  imageOpen(imgClick.dataset.source, imgClick.alt, imgClick);
}

function imageOpen(source, alt, image) {
  lightbox.classList.add('is-open');

  lightboxImgEl.src = source;
  lightboxImgEl.alt = alt;

  lightboxImgEl.dataset.index = arrGalleryListCopy.indexOf(image);

  window.addEventListener('keydown', onLightboxChangeByKey);
}

function imageClose() {
  lightbox.classList.remove('is-open');

  lightboxImgEl.src = '';
  lightboxImgEl.alt = '';

  lightboxImgEl.removeAttribute('data-index');

  window.removeEventListener('keydown', onLightboxChangeByKey);
}

function onLightboxChangeByKey(e) {
  const ESC_KEY_CODE = 'Escape';
  const ARROW_LEFT_KEY_CODE = 'ArrowLeft';
  const ARROW_RIGHT_KEY_CODE = 'ArrowRight';

  if (e.code === ESC_KEY_CODE) {
    imageClose();
  }

  if (e.code === ARROW_LEFT_KEY_CODE) {
    lightboxImageMove(-1);
  }

  if (e.code === ARROW_RIGHT_KEY_CODE) {
    lightboxImageMove(1);
  }
}

function lightboxImageMove(step) {
  const currentIndex = Number(lightboxImgEl.dataset.index);
  let afterStepIndex = currentIndex + step;

  if (afterStepIndex < 0) {
    afterStepIndex = arrGalleryListCopy.length - 1;
  }

  if (afterStepIndex > arrGalleryListCopy.length - 1) {
    afterStepIndex = 0;
  }

  lightboxImgEl.src = arrGalleryListCopy[afterStepIndex].dataset.source;
  lightboxImgEl.alt = arrGalleryListCopy[afterStepIndex].alt;
  lightboxImgEl.dataset.index = afterStepIndex;
}
