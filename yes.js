var web_engine = document.getElementById("web_engine");
var hover_button = document.getElementById("hover_button");
var google = document.getElementById("google");
var duckduckgo = document.getElementById("duckduckgo");
var bing = document.getElementById("bing");
google.style.display = "none";
google.addEventListener("click", function(){engine_change("google");});
duckduckgo.addEventListener("click", function(){engine_change("duckduckgo");});
bing.addEventListener("click", function(){engine_change("bing");});
function engine_change(engine){
    google.style.display = '';
    duckduckgo.style.display = '';
    bing.style.display = '';
    if (engine == "google"){
        web_engine.action = "https://www.google.com/search";
        hover_button.src = "images/google_icon.png";
        google.style.display = "none";
    }
    if (engine == "duckduckgo"){
        web_engine.action = "https://www.duckduckgo.com/";
        hover_button.src = "images/duckduckgo.png";
        duckduckgo.style.display = "none";
    }
    if (engine == "bing"){
        web_engine.action = "https://www.bing.com/search";
        hover_button.src = "images/bing_icon.png";
        bing.style.display = "none";
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