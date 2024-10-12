import data from "./data.js";


const getCourseIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id"); 
};


const findCourseById = (courseId) => {
  return data.find((course) => course.id === parseInt(courseId));
};


const renderCourseDetails = (course) => {
  if (course) {
    
    document.querySelector(".html-word").textContent = course.topic;
    document.querySelector(".author").textContent = course.name;
    document.querySelector(".course-image").src = `images/${course.image}`;
    document.getElementById("course-description").textContent =
      course.description;

    const ratingContainer = document.querySelector(".rating");
    ratingContainer.innerHTML = createRatinStars(course.rating);
    const favButton = document.querySelector(".add-to-favoutire-box");

    // Single-click to add to favorites
    favButton.addEventListener("click", () => {
      addToFavorites(course);
    });
    // Doble-click to add to favorites
    favButton.addEventListener("dblclick", () => {
      removeFromFavorites(course.id);
    });
  } else {
    document.querySelector(".main-content").innerHTML =
      "<p>Course not found!</p>";
  }
};



const addToFavorites = (course) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []; 
  const isAlreadyFavorited = favorites.some(favCourse => favCourse.id === course.id);

  if (!isAlreadyFavorited) {
    favorites.push(course); 
    localStorage.setItem("favorites", JSON.stringify(favorites)); 
    renderFavorites(); 
  } 
};
const removeFromFavorites = (courseId) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const updatedFavorites = favorites.filter(
    (favCourse) => favCourse.id !== courseId
  ); 

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
  renderFavorites(); 
};


const renderFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favContainer = document.querySelector(".fav-cards");

  
  favContainer.innerHTML = "";


  favorites.forEach((course) => {
    const favCard = `
      <div class="fav-card">
        <img class="fav-card-image" src="images/${course.image}" alt="${course.topic}">
        <div class="fav-card-content">
          <div>${course.topic}</div>
          <div class="stars-icons">
            ${createRatinStars(course.rating)}
          </div>
        </div>
      </div>
    `;
    favContainer.innerHTML += favCard;
  });
};

window.onload = () => {
  init();  
  renderFavorites(); 
};




const createRatinStars = (rating) => {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width="25px" class="rating" viewBox="0 0 512 512">
        <path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>`;
    } else {
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width="25px" class="rating" viewBox="0 0 512 512">
        <path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>`;
    }
  }
  return stars;
};


const init = () => {
  const courseId = getCourseIdFromUrl(); 
  const course = findCourseById(courseId); 
  renderCourseDetails(course); s
};


window.onload = init;
