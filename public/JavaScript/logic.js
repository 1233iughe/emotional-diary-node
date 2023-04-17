//Select all the elements needed from the table element
const tableBody = document.querySelector('#table_body');
const logEntry = document.querySelector('#logEntry');
const logSubmit = document.querySelector('#logSubmit');

//Select color picker element
const colorPicker = document.querySelector('#color-input');
const defaultColor = "#0000ff";
colorPicker.value = defaultColor;

//Setting for item deletion






function sendLog(){
    //Setting up elements for AJAX
    const httpRequest = new XMLHttpRequest();
    //Stablish time stamp for the entry as a global variable
    today = new Date();
    today = today.toLocaleString();

    //Collecting data in json format
    let data = {}
    data.time = today;
    data.entry = logEntry.value;
    data.color = colorPicker.value;
    console.log(data);

    //Opening and sending request to url
    httpRequest.open('POST','/',true);
    httpRequest.setRequestHeader("Content-Type","application/json")
    httpRequest.send(JSON.stringify(data));
    //Handling answer
    httpRequest.onload = function() {
        let id = httpRequest.responseText;
    addLog(id);
    }
    httpRequest.onreadystatechange = () => {

        //Checks AJAX request state
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            //Confirms request was sent
            console.log("Request sent...");
    
            //Checks https request status, if succesful it adds the new rows to the table.
            if (httpRequest.status === 200){
                //Confirms request was succesful
                console.log("Succesful AJAX call...");
                
            }
            else{
                console.log(httpRequest.statusText);
            }
        }
            
    }
    
}

//Row adder function 
function addLog(id){
    
    const row = document.createElement("tr");
    const logg = logEntry.value;
    const color = colorPicker.value;
    const cell = document.createElement("td");
    const cellText = document.createTextNode(`${logg}`);

    cell.appendChild(cellText);
    cell.style.backgroundColor = color;
    cell.className = "removable-td";
    cell.id = id;
    row.appendChild(cell);
    
    tableBody.appendChild(row);
}


//Row deleter function
function removeLog(event){
    //Setting up elements for AJAX
    const httpRequest = new XMLHttpRequest();
    //Setting data
    const item = event.target;
    const itemId = item.id;
    //Checking the selected item is a td
    if (item.nodeName && item.nodeName.toLowerCase() == "td") {
        
        //Collecting data in json format
        let data = {}
        data.id = itemId
        console.log(data);

        //Opening and sending request to url
        httpRequest.open('POST','/removal',true);
        httpRequest.setRequestHeader("Content-Type","application/json")
        httpRequest.send(JSON.stringify(data));

        //Handling answer
        httpRequest.onreadystatechange = () => {

            //Checks AJAX request state
            if (httpRequest.readyState === XMLHttpRequest.DONE){
                //Confirms request was sent
                console.log("Request sent...");
        
                //Checks https request status, if succesful it adds the new rows to the table.
                if (httpRequest.status === 200){
                    //Confirms request was succesful
                    console.log("Succesful AJAX call...");
                    
                }
                else{
                    console.log(httpRequest.statusText);
                }
            }
                
        }

        //Removing row from html
        const row = document.getElementById(itemId);
        row.remove();
        console.log(`Clicked element ID: ` + itemId);
        
    }
    
}




//Autofocus the user on the relevant entry field
logEntry.focus();

//Event listener for submit button
logSubmit.addEventListener('click',sendLog);

//Event listerner for the entire doc
document.addEventListener('click',removeLog);