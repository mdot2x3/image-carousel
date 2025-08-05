// import css file for css-loader & style-loader
import "./style.css";

const imageSources = [
  "https://picsum.photos/800/400?image=10",
  "https://picsum.photos/800/400?image=11",
  "https://picsum.photos/800/400?image=12",
  "https://picsum.photos/800/400?image=13",
  "https://picsum.photos/800/400?image=14",
  "https://picsum.photos/800/400?image=15",
  "https://picsum.photos/800/400?image=16",
  "https://picsum.photos/800/400?image=17",
  "https://picsum.photos/800/400?image=18",
  "https://picsum.photos/800/400?image=19",
];

// set the number of images displayed on the screen
const visibleCount = 5;
// initially set the centerIndex image to the center-most image
let centerIndex = Math.floor(imageSources.length / 2);

function renderCarousel() {
  const carousel = document.querySelector(".carousel");
  carousel.innerHTML = "";

  const half = Math.floor(visibleCount / 2);
  // to get the 0 index, offset minus half from centerIndex
  // to find final index, add half to centerIndex
  for (let offset = -half; offset <= half; offset++) {
    let imgIndex =
      (centerIndex + offset + imageSources.length) % imageSources.length;
    const img = document.createElement("img");
    img.src = imageSources[imgIndex];
    img.className = "carousel-item";
    if (offset === 0) img.classList.add("active");
    img.alt = `Image ${imgIndex + 1}`;
    carousel.appendChild(img);
  }

  // set active selector to centerIndex
  document.querySelectorAll(".circle").forEach((circle, idx) => {
    circle.classList.toggle("active", idx === centerIndex);
  });
}

function renderSelectors() {
  const selectors = document.querySelector(".selectors");
  selectors.innerHTML = "";
  imageSources.forEach((_, idx) => {
    const circle = document.createElement("div");
    circle.className = "circle";
    if (idx === centerIndex) circle.classList.add("active");
    circle.addEventListener("click", () => {
      centerIndex = idx;
      renderCarousel();
      renderSelectors();
    });
    selectors.appendChild(circle);
  });
}

function nextImage() {
  // sets centerIndex value to new updated value
  centerIndex = (centerIndex + 1) % imageSources.length;
  renderCarousel();
}

function prevImage() {
  centerIndex = (centerIndex - 1 + imageSources.length) % imageSources.length;
  renderCarousel();
}

document
  .querySelector(".fa-chevron-right")
  .addEventListener("click", nextImage);
document.querySelector(".fa-chevron-left").addEventListener("click", prevImage);

renderCarousel();
renderSelectors();
