let web_engine = document.getElementById("web_engine");
let hover_button = document.getElementById("hover_button");
let google = document.getElementById("google");
let duckduckgo = document.getElementById("duckduckgo");
let bing = document.getElementById("bing");
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
        google.style.display = 'None';
    }
    if (engine == "duckduckgo"){
        web_engine.action = "https://www.duckduckgo.com/";
        hover_button.src = "images/duckduckgo.png";
        duckduckgo.style.display = 'None';
    }
    if (engine == "bing"){
        web_engine.action = "https://www.bing.com/search";
        hover_button.src = "images/bing_icon.png";
        bing.style.display = 'None';
        duckduckgo.className = ".last_one";
    }
}


settings_screen = $(".settings_screen");
document.getElementById("setting_button").onclick = function() {
    if (settings_screen.css('display') == "none") {
        settings_screen.css('display', 'block');           
    }
    else{
        settings_screen.css('display', 'none');
    }
}