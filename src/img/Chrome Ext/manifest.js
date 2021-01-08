document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("PlayGame")
 
  button.addEventListener("click", (e) => {
    chrome.tabs.create({url: "http://corporate.lcwaikiki.com/hakkimizda"}).then(() => {
      chrome.tabs.executeScript(() => {
        chrome.tabs.executeScript({ file: "game.js" })
      })
    });
  })
 })