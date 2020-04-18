web_engine = document.getElementById("web_engine")
hover_button = document.getElementById("hover_button")
document.getElementById("google").addEventListener("click", function(){engine_change("google");});
document.getElementById("duckduckgo").addEventListener("click", function(){engine_change("duckduckgo");});
document.getElementById("bing").addEventListener("click", function(){engine_change("bing");});
function engine_change(engine){
    if (engine == "google"){
        web_engine.action = "https://www.google.com/search";
        hover_button.src = "images/google_icon.png";
    }
    if (engine == "duckduckgo"){
        web_engine.action = "https://www.duckduckgo.com/";
        hover_button.src = "images/duckduckgo.png";
    }
    if (engine == "bing"){
        web_engine.action = "https://www.bing.com/search";
        hover_button.src = "images/bing_icon.png";
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