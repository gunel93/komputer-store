const computersElement = document.getElementById("computers")
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const specsElement = document.getElementById("specs");
const imgElement = document.getElementById("img")
const buttonElement = document.getElementById("buy-button");
buttonElement.addEventListener("click", function() {
    console.log("click!!")
})
let computers = [];
let chart = [];
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data )
    .then(computers => addComputersToMenu(computers))
    const addComputersToMenu = (computers) => {
        computers.forEach(element => addComputerToSelector(element));
        priceElement.innerHTML = computers[0].price;
        specsElement.innerHTML = computers[0].specs;
        descriptionElement.innerHTML = computers[0].description;
        titleElement.innerHTML = computers[0].title;
        imgElement.innerHTML = computers[0].image;
    }
    const addComputerToSelector = (computer) => {
        const computerElement = document.createElement("option");
        computerElement.value = computer.id;
        computerElement.appendChild(document.createTextNode(computer.title));
        computersElement.appendChild(computerElement);
    }
  const handlerComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex]
    priceElement.innerText = selectedComputer.price;
    specsElement.innerText = selectedComputer.specs;
    descriptionElement.innerHTML = selectedComputer.description;
    imgElement.innerHTML = selectedComputer.image;
    titleElement.innerHTML = selectedComputer.title;
  }
  computersElement.addEventListener("change", handlerComputerMenuChange);