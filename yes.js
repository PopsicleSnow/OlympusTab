var web_engine = document.getElementById("web_engine");
var hover_button = document.getElementById("hover_button");
var google = document.getElementById("google");
var duckduckgo = document.getElementById("duckduckgo");
var bing = document.getElementById("bing");

// Event listeners for click of buttons under dropdown
google.addEventListener("click", function(){engine_change("google");});
duckduckgo.addEventListener("click", function(){engine_change("duckduckgo");});
bing.addEventListener("click", function(){engine_change("bing");});
$(document).ready(load())

// Retrieves settings
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
    if (engine == "google"){
        chrome.storage.local.set({search: "google"});
        web_engine.action = "https://www.google.com/search";
        hover_button.src = "images/google_icon.png";
    }
    if (engine == "duckduckgo"){
        chrome.storage.local.set({search: "duckduckgo"});
        web_engine.action = "https://www.duckduckgo.com/";
        hover_button.src = "images/duckduckgo.png";
    }
    if (engine == "bing"){
        chrome.storage.local.set({search: "bing"});
        web_engine.action = "https://www.bing.com/search";
        hover_button.src = "images/bing_icon.png";
    }
    $(".dropdown-content button").css({
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px'});
    let last_visible_dropdown = $('.dropdown-content button:visible:last');
    last_visible_dropdown.css({
        'border-bottom-left-radius': '20px',
        'border-bottom-right-radius': '20px'});
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