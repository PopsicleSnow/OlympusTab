const searchBar = document.getElementById("search_box_form");
const currentEngine = document.getElementById("current-engine");
const pageColor = document.getElementById("bg_color");

pageColor.addEventListener("input", () => {theme_color(pageColor.value);});

// Retrieves settings and loads them
$(document).ready(() => {
    // Set search engine to last used
    chrome.storage.local.get('search', function (result) {
        engine = result.search;
        /*
        if (engine != "undefined") {
            engine_change(engine);
        }
        else {engine_change("google");}
        */
    });

    // Sets background color to saved color
    chrome.storage.local.get('Background_Color', function (result) {
        color = result.Background_Color;
        console.log(color)
        if (color != "undefined") {
            document.body.style.backgroundColor = result.Background_Color;
        }
    });

    // Sets color input to current background color
    var currentbg_color = getRGB(window.getComputedStyle(document.body).backgroundColor);
    pageColor.value = rgbToHex(parseInt(currentbg_color["red"]), parseInt(currentbg_color["green"]), parseInt(currentbg_color["blue"]));
})

// Changes the search engine
document.querySelectorAll(".dropdown_content button").forEach(button => {
    button.onclick = function() {
        searchBar.action = button.dataset.link;
        currentEngine.src = `images/${button.id}_icon.svg`;
        chrome.storage.local.set({search: `${button.id}`});
        document.getElementById("search_box_form_input").focus();
    }
});

// Saves settings to chrome local storage
function saveSettings() {
    chrome.storage.local.set({Background_Color: pageColor.value});
}

// splits rgb color values from strings into an array of strings (must be converted to int by parseInt)
function getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
}

// function to convert rgb to hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// function to convert hex to rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

// changes color of background and other elements to match theme
function theme_color(color){
    document.body.style.backgroundColor = color;
    var rgb_ = hexToRgb(color);
    rgb_.r += 22;
    rgb_.g += 22;
    rgb_.b += 22;
    document.getElementById("search_box_form_input").style.backgroundColor = `rgb(${rgb_.r}, ${rgb_.g}, ${rgb_.b})`;
    document.getElementsByClassName("dropbtn")[0].style.backgroundColor = `rgb(${rgb_.r - 5}, ${rgb_.g - 5}, ${rgb_.b - 5})`;
}

// Opens and closes settings
settings_screen = $("#settings_modal");
$(document).click(function(event) {
    // If you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest("#settings_modal, #setting_button").length) {
        settings_screen.css('display', 'none');
    }
    // If you click on settings button, open/close
    if ($(event.target).closest("#setting_button").length) {
        if (settings_screen.css('display') == "none") {
            settings_screen.css('display', 'block');
        }
        else {
            settings_screen.css('display', 'none');
        }
    }
});

dragElement(document.getElementById("astronaut"));

// makes elements draggable
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    }
    else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}