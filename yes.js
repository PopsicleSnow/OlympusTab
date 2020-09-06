var web_engine = document.getElementById("web_engine");
var hover_button = document.getElementById("hover_button");
var google = document.getElementById("google");
var duckduckgo = document.getElementById("duckduckgo");
var bing = document.getElementById("bing");
var bg_color = document.getElementById("b_color");
var alert = document.getElementById("shame_alert");

// Event listeners for click of buttons under dropdown
google.addEventListener("click", function(){engine_change("google");});
duckduckgo.addEventListener("click", function(){engine_change("duckduckgo");});
bing.addEventListener("click", function(){engine_change("bing");});
bg_color.addEventListener("input", function(){theme_color(bg_color.value);});
$(document).ready(load())

// Retrieves settings and loads them
function load() {

    // Set search engine to last used
    chrome.storage.local.get('search', function (result) {
        engine = result.search;
        console.log(engine)
        if (engine != "undefined") {
            engine_change(engine);
        }
        else {engine_change("google");}
    });

    // Sets background color to saved color
    chrome.storage.local.get('Background_Color', function (result) {
        color = result.Background_Color;
        if (color != "undefined") {
            document.body.style.backgroundColor = result.Background_Color;
        }
    });

    // Sets color input to current background color
    var currentbg_color = getRGB(window.getComputedStyle(document.body).backgroundColor);
    bg_color.value = rgbToHex(parseInt(currentbg_color["red"]), parseInt(currentbg_color["green"]), parseInt(currentbg_color["blue"]));
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

// Saves settings to chrome local storage
function saveSettings() {
    chrome.storage.local.set({Background_Color: bg_color.value});
}

// Changes the search engine
function engine_change(engine){
    google.style.display = '';
    duckduckgo.style.display = '';
    bing.style.display = '';
    if (engine == "duckduckgo"){
        chrome.storage.local.set({search: "duckduckgo"});
        web_engine.action = "https://www.duckduckgo.com/";
        hover_button.src = "images/duckduckgo_icon.png";
    }
    else {
        chrome.storage.local.set({search: `${engine}`});
        web_engine.action = `https://www.${engine}.com/search`;
        hover_button.src = `images/${engine}_icon.png`;
    }
    $(".dropdown-content button").css({
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px'});
    let last_visible_dropdown = $('.dropdown-content button:visible:last');
    last_visible_dropdown.css({
        'border-bottom-left-radius': '20px',
        'border-bottom-right-radius': '20px'});
}

// changes color of background and other elements to match theme
function theme_color(color){
    document.body.style.backgroundColor = color;
    var rgb_ = hexToRgb(color);
    rgb_.r += 22;
    rgb_.g += 22;
    rgb_.b += 22;
    if (rgb_.r - 22 > 130 && rgb_.g - 22> 130 && rgb_.b - 22 > 130) {
        alert.style.backgroundColor = `rgb(${rgb_.r}, ${rgb_.g}, ${rgb_.b})`;
        alert.style.display = "inline";
    }
    else {
        alert.style.display = "none";
    }
    document.getElementById("search_box").style.background = `rgb(${rgb_.r}, ${rgb_.g}, ${rgb_.b})`;
}

// Opens and closes settings
settings_screen = $(".settings_modal");
$(document).click(function(event) {
    // If you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest(".settings_modal, #setting_button").length) {
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