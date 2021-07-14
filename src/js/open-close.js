import lightbox from '../index';
import lightboxImgEl from '../index';
import arrGalleryListCopy from '../index';

export function onLightboxOpenClick(e) {
  e.preventDefault();

  const imgClick = e.target;
  if (imgClick.nodeName !== 'IMG') {
    return;
  }

  imageOpen(imgClick.dataset.source, imgClick.alt, imgClick);
}

export function imageOpen(source, alt, image) {
  lightbox.classList.add('is-open');

  lightboxImgEl.src = source;
  lightboxImgEl.alt = alt;

  lightboxImgEl.dataset.index = arrGalleryListCopy.indexOf(image);

  window.addEventListener('keydown', onLightboxChangeByKey);
}

export function imageClose() {
  lightbox.classList.remove('is-open');

  lightboxImgEl.src = '';
  lightboxImgEl.alt = '';

  lightboxImgEl.removeAttribute('data-index');

  window.removeEventListener('keydown', onLightboxChangeByKey);
}

export function onLightboxChangeByKey(e) {
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

export function lightboxImageMove(step) {
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
