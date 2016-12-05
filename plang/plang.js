'use strict'

let plang;

function init() {
  plang = new App();
  
}

// Hide the loading screen after all's done
let readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    init();
    
  }
}, 10);


// 

function App() {
  
  function selectPlangTag(tag) {
    
    updateElements(tag);
  }
  
  function updateElements(tag) {
    
    document.documentElement.lang = tag;
        
    readConfig("plang/plang/plang.json", function(plang){
      let data = JSON.parse(plang);
      
      // Get the language set based on the language selected
      let content = data.plang[tag];
      
      // Get all of the elements with the data-lang selector
      let elements = document.querySelectorAll("[data-plang]");
      
      // Update all of the innerHTML
      [].forEach.call(elements, function(node){
        
        node.innerHTML = content[node.getAttribute('data-plang')];
        
      })
      
    });
  }
  
  // Read file
  function readConfig(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
  }
  
  
  return {
    selectPlangTag
  }
}