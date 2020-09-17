console.log("Hello World"); 

document.getElementById("input-btn").addEventListener("click", displayGenerator);



function displayGenerator() {
    event.preventDefault();
    document.getElementById("first-container").classList.add("hide");
    document.getElementById("second-container").classList.remove("hide");

}