/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


///Testing And Building


//Global variable to count number of sections
let count = 0;
const numberOfStartSections = 4;

//this event listener adds a new section and a corresponding button to it in the navbar
function addSectionAndButton() {
    count++;

    //this part of function adds a new section to the main 
    let main = document.querySelector('main');
    let newSection = document.createElement('section');
    newSection.setAttribute('id', 'section' + count);
    newSection.setAttribute('data-nav', 'Section ' + count);
    newSection.innerHTML = '<div  class="landing__container"><h2>Section ' + count + '</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdietelit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p> <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consecteturporttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p></div>';
    main.appendChild(newSection);

    //This part of the function add a button to the navbar corresponds to the section added
    let newBtn = document.createElement('li');
    newBtn.innerHTML = '<button class="menu__link"><a href="#section' + count + '">section ' + count + '</a></button>';

    // <button><a href="#section1">sections</a></button>

    let navBar = document.querySelector('#navbar__list');
    navBar.appendChild(newBtn);
}

//This function adds 3 buttons to the navbar that corresponds to the 3 sections that exist on the page after load is complete
window.addEventListener('load', (event) => {
    for (let i = 1; i <= numberOfStartSections; i++) {
        // let newBtn = document.createElement('li');
        // newBtn.innerHTML = '<button><a href="#section' + i + '">section ' + i + '</a></button>';
        // let navBar = document.querySelector('#navbar__list');
        // navBar.appendChild(newBtn);
        // count++;
        addSectionAndButton();
    }
});


//this is an event listener that wait until user hits the Enter keyboard button and then add section
document.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        addSectionAndButton();
    }
});

