//get the buttons
var submitButton = document.querySelector("#submitButton");
var clearButton = document.querySelector("#clearButton");

//link the 'click' event on the button to the 'clear' function
clearButton.addEventListener("click", clear, false);

//link the 'click' event on the button to the 'display' function
submitButton.addEventListener("click", display, false);

function thisMonthsPayment(principal, total_month, current_month, monthly_rate){
    number_of_months = total_month-current_month;
    return ((monthly_rate/(Math.pow((1 - (1 + monthly_rate)),-number_of_months)))*principal);
}

//function to clear out the output div
function clear(e) {
    //get the output div
    var outputDiv = document.querySelector("#outputDiv");

    //clear out the entire contents of the div
    outputDiv.innerHTML = "";
}



//function to be called when the button is clicked 
function display(event)
{			
    var output= "<div class=\"container\"><div class=\"panel panel-default\"><div class=\"panel-body\">";
    var loan = document.querySelector("#loan").value;
    var principal = document.querySelector("#principal").value;
    var monthly = document.querySelector("#monthly_interest_rate").value/(12*100);
    //grab the ddl object
    var yearDDL = document.querySelector("#yearDDL");
    //get the index of the selected item- 0 for the first, 1 for the second, etc
    var yearIndex = yearDDL.selectedIndex;
    //go to the ddl options array and use the index to grab the selected item's 
    //text and hidden value
    var yearName = yearDDL.options[yearIndex].text;
    var yearCode = yearDDL.options[yearIndex].value;

    var months = 12*yearCode;
    output = output + "years: " +months/12 + " rate: " + monthly + " principal: " + principal;
    output = output + "<br><br><br>";
    for (i = 0; i < months; i++){
        output = output + thisMonthsPayment(principal,months,i,monthly) + "<br>";
    }
    output = output + "</div></div></div>";
    //access the inner html of the div and place the result string in there
    document.querySelector("#outputDiv").innerHTML = output;
}