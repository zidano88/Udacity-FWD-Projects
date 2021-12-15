/*
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/* Global Variables */

//Global variable to count number of sections
let count = 0;
//Global variable to define unmber of sections needed to be built on loading the page
const numberOfStartSections = 4;
//Global variable used to store time since last mouse movement
let timeout;


/* Functions */

//This function adds a new section and a corresponding button to it in the navbar
function addSectionAndButton() {
    count++;
    //This part of the function creates a section and adds it to the main 
    let main = document.querySelector('main');
    let newSection = document.createElement('section');
    //This Part of function adds Id, data-nav and Inner HTML to the created section
    newSection.setAttribute('id', 'section' + count);
    newSection.setAttribute('data-nav', 'Section ' + count);
    newSection.innerHTML = '<div  class="landing__container"><h2>Section ' + count + '</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdietelit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p> <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consecteturporttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p></div>';
    main.appendChild(newSection);
    //This part of the function add a button to the navbar corresponds to the section added
    let newBtn = document.createElement('li');
    newBtn.innerHTML = '<button class="menu__link" onclick="scrollToSection(this)">section ' + count + '</button>';
    let navBar = document.querySelector('#navbar__list');
    navBar.appendChild(newBtn);
}


//This function scrolls to section when clicking on a button in the navbar
function scrollToSection(button) {
    let sectionId = button.innerHTML.split(" ").join("");
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}


//this function is used to  display navbar and hide it after 4 seconds of user did not scroll or move the mouse for the 4 seconds
const displayNavBar = function (event) {
    document.getElementById('navbar__list').style.display = 'block';
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        document.getElementById('navbar__list').style.display = 'none';
    }, 3000);
};


/* Event Listeners */

//This event listener adds required number sections based on the value of the global variable defined earlier after loading the page
window.addEventListener('load', (event) => {
    for (let i = 1; i <= numberOfStartSections; i++) {
        addSectionAndButton();
    }
});

//This is an event listener that wait until user hits the Enter keyboard button and then add section
document.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        addSectionAndButton();
    }
});

//This is an event listener to get the position of a section relative to the viewport and then decides which section should be highlighted and then adds "your-active-class" to the chosen section 
window.addEventListener('scroll', (event) => {
    let sectionCoordinates = document.querySelectorAll('section');
    sectionCoordinates.forEach((sec) => {
        let sectionId = sec.id.slice(7);
        let navbarList = document.querySelector('#navbar__list').getElementsByTagName('li');
        //This Part retrieves the button that corresponds to each section 
        let activeSectionLi = navbarList[sectionId - 1];
        let activeSectionButton = activeSectionLi.querySelector('button');
        //This if condition decides whether the section in the viewport or not by comparing the distance from its top and bottom to the top of the viewport and then adds classes to highlight the section and button that are in the viewport
        if (sec.getBoundingClientRect().top <= 150 && sec.getBoundingClientRect().bottom >= 150) {
            sec.classList.add("your-active-class");
            activeSectionButton.classList.add("activeBtn");
        }
        else {
            sec.classList.remove("your-active-class");
            activeSectionButton.classList.remove("activeBtn");
        }
    });
});

//These event listeners calls the displayNavBar function to display the navbar when moving the mouse or scrolling
window.addEventListener('mousemove', displayNavBar);
window.addEventListener('scroll', displayNavBar);
