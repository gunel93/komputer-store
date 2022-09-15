
// Computer elements
const computersElement = document.getElementById("computers")
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const specsElement = document.getElementById("specs");
const imgElement = document.getElementById("img");

// Bank operations
const buttonElement = document.getElementById("buy-button");
const balanceElement = document.getElementById("balance-id");
const loanBtn = document.getElementById("loan-button")
const repayBtn = document.getElementById("repay-btn")
const outstandingLoanElement = document.getElementById("outstanding-loan")

// Work elements
const salaryElement = document.getElementById("pay-id")
const workbtn = document.getElementById("work-button")
const bankbtn = document.getElementById("bank-button")
const buybtn = document.getElementById("buy-button")


buttonElement.addEventListener("click", function() {
    console.log("click!!")
})
let computers = [];
let chart = [];
let salary = 0;
let loanBalance = 200;
let hasOutstandingLoan = false
let loanAmount = 0
let currentComputerPrice = 0
let currentComputer = computers[0]

const baseURL = "https://noroff-komputer-store-api.herokuapp.com/"

const loan = () => {
    let maxLoan = loanBalance * 2
    let userInput = prompt("Enter amount to loan")
  
    const isLoanApproved = () => {
      if (userInput <= 0) {
        alert("Please enter an amount you want to loan")
        return false
      } else if (isNaN(userInput)) {
        alert("Please enter amount as a number")
        return false
      } else if (userInput > maxLoan) {
        alert("You cannot loan more than double of your bankbalance")
        return false
      } else if (hasOutstandingLoan) {
        alert("Please pay the last loan ")
        return false
      } else {
        return true
      }
    }
  
    if (isLoanApproved()) {
      lo += parseFloat(userInput)
      loanAmount += parseFloat(userInput)
      hasOutstandingLoan = true
      alert(
        "Loan of " +
          formatNumberToNOK(loanAmount) +
          " kr is approved. The loan amount is " +
          formatNumberToNOK(loanBalance) +
          " kr"
      )

      //Repay
      repayBtn.hidden = false
      balanceElement.innerText = formatNumberToNOK(loanBalance)
      outstandingLoanElement.innerText = formatNumberToNOK(loanAmount)
    }
  }

  const work = () => {
    salary += 100
    salaryElement.innerText = formatNumberToNOK(salary)
  }

  const transferToBank = () => {
    let deduction = salary * 0.1
    let restBalance = salary - deduction
  
    // Checks first if the user has an outstanding loan, so if yes, 10% of user's salary goes to loan
    if (hasOutstandingLoan) {
      loanAmount -= deduction
      loanBalance += restBalance
      outstandingLoanElement.innerText = formatNumberToNOK(loanAmount)
    } else {
      loanBalance += salary
    }
  
    salary = 0
  
    // Updates UI
    balanceElement.innerText = formatNumberToNOK(loanBalance)
    salaryElement.innerText = formatNumberToNOK(salary)
  }
  
  

  const repay = () => {
    if (salary <= 0) {
      alert("You cannot repay the loan now!")
    } else {
      loanAmount -= salary
  
      // Adds the rest to the bank if the user's salary is greater than the loan
      if (loanAmount <= salary) {
        loanBalance += Math.abs(loanAmount)
      }
      salary = 0
  
      balanceElement.innerText = formatNumberToNOK(loanBalance)
      outstandingLoanElement.innerText = formatNumberToNOK(loanAmount)
      salaryElement.innerText = formatNumberToNOK(salary)
  
     if (loanAmount <= 0) {
        outstandingLoanElement.innerHTML = ""
        repayBtn.hidden = true
        hasOutstandingLoan = false
        loanAmount = 0
      }
    }
  }
  
  

fetch(baseURL + "computers")
    .then(response => response.json())
    .then(data => computers = data )
    .then(computers => addComputersToMenu(computers))
    const addComputersToMenu = (computers) => {
        computers.forEach(element => addComputerToSelector(element));
        priceElement.innerHTML = computers[0].price;
        specsElement.innerHTML = computers[0].specs;
        descriptionElement.innerHTML = computers[0].description;
        titleElement.innerHTML = computers[0].title;
        imgElement.src = baseURL + computers[0].image;
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
    imgElement.src = baseURL + selectedComputer.image;
    titleElement.innerHTML = selectedComputer.title;
  }

const formatNumberToNOK = (number) => {
    let NOK = Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
    }).format(number)
  
    return NOK
  }
  
  computersElement.addEventListener("change", handlerComputerMenuChange);
  loanBtn.addEventListener("click", loan)
  repayBtn.addEventListener("click", repay)
  workbtn.addEventListener("click", work)
  bankbtn.addEventListener("click", transferToBank)


