
let myLeads = [] // let = can be reassigned
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el") // const = constant(can't be reassigned)
const tabBtn = document.getElementById("tab-btn")

// event listener for Save Input button
const inputBtn = document.getElementById("input-btn")

// variable to delete links
const deleteBtn = document.getElementById("delete-btn")

// declare localStorage to save user's links
const leadsFromLocalStorage = JSON.parse ( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


// save tabs
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)

    })
})

// function to render leads to an unordered list
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'> 
                    ${leads[i]}
                </a>
            </li>
        `
    }

    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function() {
    console.log("Double clicked!")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


// save input button 
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "" // clear out input field after saving to array

    // using localStorage to save data
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )

    render(myLeads)
    console.log( localStorage.getItem("myLeads") )
    
})

