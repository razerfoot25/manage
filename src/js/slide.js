const carouselContainer = document.querySelector(".main__page-3-container");
const review = document.querySelector(".main__page-3--reviews");

const enableCarousel = () => {
  const slider = document.querySelector(".carousel");

  const sliderItems = Array.from(slider.children);

  const carouselNav = document.querySelector(".main__page-3--pagination");
  const dotNav = Array.from(carouselNav.children);

  const sliderItemsWidth = sliderItems[0].getBoundingClientRect().width;

  sliderItems[0].classList.add("current-slide");

  const setSlidePosition = (slide, i) => {
    slide.style.left = sliderItemsWidth * i + "px";
  };
  sliderItems.forEach(setSlidePosition);

  const moveToSlide = (track, currentSlide, targetslide) => {
    track.style.transform = "translateX( -" + targetslide.style.left + ")";

    currentSlide.classList.remove("current-slide");
    targetslide.classList.add("current-slide");
  };

  const moveNav = (currentNav, targetNav) => {
    currentNav.classList.remove("current-slide-nav");
    targetNav.classList.add("current-slide-nav");
  };

  //mobile touch

  let touchStartX = 0;
  let touchEndX = 0;
  const getTouches = () => {
    if (touchEndX < touchStartX) {
      //if swipe left
      const currentSlide = slider.querySelector(".current-slide");
      const nextSlide = currentSlide.nextElementSibling;

      const currentNav = carouselNav.querySelector(".current-slide-nav");
      const nextNav = currentNav.nextElementSibling;

      moveToSlide(slider, currentSlide, nextSlide);

      moveNav(currentNav, nextNav);
    }
    if (touchEndX > touchStartX) {
      //if swupe right
      const currentSlide = slider.querySelector(".current-slide");
      const prevSlide = currentSlide.previousElementSibling;

      const currentNav = carouselNav.querySelector(".current-slide-nav");
      const prevNav = currentNav.previousElementSibling;

      moveToSlide(slider, currentSlide, prevSlide);

      moveNav(currentNav, prevNav);
    }
  };

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    getTouches();
  });

  carouselNav.addEventListener("touchstart", (e) => {
    const targetNav = e.target.closest("button");
    if (!targetNav) return;

    const currentSlide = slider.querySelector(".current-slide");
    const currentNav = carouselNav.querySelector(".current-slide-nav");
    const targetIndex = dotNav.findIndex((dot) => dot === targetNav);
    const targetSlide = sliderItems[targetIndex];

    moveToSlide(slider, currentSlide, targetSlide);

    moveNav(currentNav, targetNav);
  });
  // mobile touch end
};

if (screen.width < 700) {
  carouselContainer.classList.add("carousel__container");
  review.classList.add("carousel");
  review.classList.remove("h-scroller");
  enableCarousel();
} else {
  carouselContainer.classList.remove("carousel__container");
  review.classList.remove("carousel");
  review.classList.add("h-scroller");
}
