//We must put every functionality alone, to make the code:
//maintanable, readable and reusable.
//when we don't put the json array under a name by default it will be exported
// instead of data we can give any name we want
import data from "./data.js";
let filteredCourses = data;

const createRatinStars = (rating) => {
  //here we will generate html's for rating dynamically
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      // Add filled star for each point in the rating
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width=25px class="rating" viewBox="0 0 512 512">
            <path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>`;
    } else {
      // Add empty star for remaining stars
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width=25px class="rating" viewBox="0 0 512 512">
            <path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>`;
    }
  }
  return stars;
};
/**
 * function to make one course
 * will make html tag represents one course
 */
const createCourse = (courseInfo) => {
  //we will start inserting data dynamically
  /**
   * is used to start the query string in a URL. Query strings allow you
   * to pass information from one page to another by appending key-value
   * pairs to the URL.
   */
  return `
  
    <a href="details.html?id=${courseInfo.id}" class="press-on-card">
      <div class="course-card">
        <img src="images/${courseInfo.image}" alt="${
    courseInfo.topic
  } Logo" class="course-image">
        <div class="course-content">
            <h3 class="course-title">${courseInfo.category}</h3>
            <h1 class="language-name">${courseInfo.topic}</h1>
            <p class="rating flex">
            ${createRatinStars(courseInfo.rating)}
            </p>
            <p class="author flex">Author: ${courseInfo.name}</p>
            
        </div>
    </div>
  </a>
    `;
};

/**
 * function to make course list
 * it handles everything related to the list e.g. if the list was empty what to display on screen(no courses under this name)
 */
const creatCourseList = (courseList) => {
  //every item will be course , i want it to render create course
  return courseList.map((course) => createCourse(course)).join(""); //it will return array of html
};
const searchCourses = (list, searchText) => {
  return list.filter((course) =>
    course.topic.toLowerCase().includes(searchText.toLowerCase())
  );
};
/**
 *responsible of taking the course list and put it on our html page
 */
const renderCourses = () => {
  const coursesCont = document.getElementById("result");

  const coursesHTML = creatCourseList(filteredCourses); //innerHTML means:go to the html of this element and override it
  coursesCont.innerHTML = coursesHTML;
};

renderCourses();
document.getElementById("textSearchInput").oninput = (evt) => {
  filteredCourses = searchCourses(data, evt.target.value);
  renderCourses();
};

//Testing
/**
 * we make sure to test berfore going further in the code
 * we prefer using onLoad here to make sure that it executes after we load our html on the page.
 */
