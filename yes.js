var web_engine = document.getElementById("web_engine");
var hover_button = document.getElementById("hover_button");
var google = document.getElementById("google");
var duckduckgo = document.getElementById("duckduckgo");
var bing = document.getElementById("bing");
var bg_color = document.getElementById("b_color");

// Event listeners for click of buttons under dropdown
google.addEventListener("click", function(){engine_change("google");});
duckduckgo.addEventListener("click", function(){engine_change("duckduckgo");});
bing.addEventListener("click", function(){engine_change("bing");});
bg_color.addEventListener("input", function(){background_color(bg_color.value);});
$(document).ready(load())

// Retrieves settings and sets them
function load() {
    var engine = "";
    var keywords = "";
    chrome.storage.local.get('search', function (result) {
        engine = result.search;
        engine_change(engine)
    });
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

function background_color(color){
    document.body.style.backgroundColor = color;
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