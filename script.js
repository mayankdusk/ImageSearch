const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
const accessKey = "F_wonrRkfJtaQSkvlgtzbh2ku9UJYIGNKVtVPzuEPVM";
let page = 1;
//function to fetech the imagess using unsplash api
const fetchImage = async (query, pageNo) => {
  try {
    if (pageNo === 1) {
      imagesContainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        //creating image div
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
        //creating overlay element
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        //creting overlay text
        const overlayText = document.createElement("h3");
        overlayElement.appendChild(overlayText);
        overlayText.innerText = `${photo.alt_description}`;
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
      });
      if (data.total_pages === pageNo) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>No Images Found</h2>`;
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to Fetch Images Please try again later</h2>`;
  }
};
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImage(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
    if (loadMoreBtn.style.display === "block") {
      loadMoreBtn.style.display === "none";
    }
  }
});

//function to fetch load more btn
loadMoreBtn.addEventListener("click", () => {
  fetchImage(searchInput.value.trim(), ++page);
});
