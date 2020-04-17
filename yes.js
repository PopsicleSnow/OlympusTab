document.getElementById("google").addEventListener("click", function(){engine_change("google");});
document.getElementById("duckduckgo").addEventListener("click", function(){engine_change("duckduckgo");});
document.getElementById("bing").addEventListener("click", function(){engine_change("bing");});
function engine_change(engine){
    if (engine == "google"){
        document.getElementById("web_engine").action = "https://www.google.com/search";
        document.getElementById("hover_button").src = "images/google_icon.png";
    }
    if (engine == "duckduckgo"){
        document.getElementById("web_engine").action = "https://www.duckduckgo.com/";
        document.getElementById("hover_button").src = "images/duckduckgo.png";
    }
    if (engine == "bing"){
        document.getElementById("web_engine").action = "https://www.bing.com/search";
        document.getElementById("hover_button").src = "images/bing_icon.png";
    }
}