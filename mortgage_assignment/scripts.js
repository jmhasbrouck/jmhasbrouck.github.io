//get the buttons
var submitButton = document.querySelector("#submitButton");
var clearButton = document.querySelector("#clearButton");

//link the 'click' event on the button to the 'clear' function
clearButton.addEventListener("click", clear, false);

//link the 'click' event on the button to the 'display' function
submitButton.addEventListener("click", display, false);

var thisMonthsPayment = function(principal, total_month, current_month, monthly_rate){
    number_of_months = total_month-current_month;
    return ((monthly_rate/(1 - Math.pow((1 + monthly_rate),-number_of_months)))*principal);
}

//function to clear out the output div
function clear(e) {
    //get the output div
    var outputDiv = document.querySelector("#outputDiv");

    //clear out the entire contents of the div
    outputDiv.innerHTML = "";
}

var stripNumberString = function(input){
    var s = "";
    for (i = 0; i < input.length; i++){
        if(!(input.charAt(i) > '9' || input.charAt(i) < '0') || input.charAt(i) === '.'){
            s = s + input.charAt(i);
        }
    }
    return s;
}

//function to be called when the button is clicked 
function display(event)
{	
    var output= "<div class=\"container\"><h2>Result</h2><table class=\"table table-bordered\"><thead><tr><th>Loan Amount</th><th>Interest Rate</th><th>Monthly Payment</th><th>Total Amount Paid</th><th>Total Amount of Interest Paid</th><th>Amount Paid / Principal</th></tr></thead><tbody>";
    /*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>*/
      
    
    //getting values and making sure theyre numbers-->
    var principal = document.querySelector("#principal").value;
    var initial_principal = principal;
    if (typeof principal == "string"){
        principal = stripNumberString(principal);
        principal = Number(principal);
    }
    var monthly = document.querySelector("#monthly_interest_rate").value;
    var initial_monthly_percent;
    if (typeof monthly == "string"){
        monthly = stripNumberString(monthly);
        initial_monthly_percent=monthly;
        monthly = Number(monthly);
    }
    monthly = monthly/(12*100);
    //grab the ddl object
    var yearDDL = document.querySelector("#yearDDL");
    //get the index of the selected item- 0 for the first, 1 for the second, etc
    var yearIndex = yearDDL.selectedIndex;
    //go to the ddl options array and use the index to grab the selected item's 
    //text and hidden value
    var yearName = yearDDL.options[yearIndex].text;
    var yearCode = yearDDL.options[yearIndex].value;
    var months = 12*yearCode;
    var this_month;
    this_month = thisMonthsPayment(principal,months,0,monthly);
    principal-=this_month;
    output = output+ "<tr><td>" + initial_principal + "</td><td>%" + parseFloat(Math.round(initial_monthly_percent)).toFixed(2) + "</td><td>$" + parseFloat(Math.round(this_month)).toFixed(2) + "</td><td>$" + 0 + "</td><td>$" + 0 + "</td><td>" + 0 + "</td></tr>";
    output = output + "</tbody></table></div>";
    //access the inner html of the div and place the result string in there
    document.querySelector("#outputDiv").innerHTML = output;
}