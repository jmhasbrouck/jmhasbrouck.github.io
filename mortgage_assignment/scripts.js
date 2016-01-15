//get the buttons
var submitButton = document.querySelector("#submitButton");
var clearButton = document.querySelector("#clearButton");
var scheduleButton;
var principal=0;
var initial_principal=0;
var monthly=0;
var months=0;
var this_month_payment = 0;
var starting_month = 0;
var ending_month = 0;
var date = new Date();
var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    
//link the 'click' event on the button to the 'clear' function
clearButton.addEventListener("click", clear, false);

//link the 'click' event on the button to the 'display' function
submitButton.addEventListener("click", display, false);

var thisMonthsPayment = function(principal, total_months, monthly_rate){
    return ((monthly_rate/(1 - Math.pow((1 + monthly_rate),-total_months)))*principal);
}

//function to clear out the output div
function clear(e) {
    //get the output div
    var outputDiv = document.querySelector("#outputDiv");
    var outputDiv2 = document.querySelector("#outputDiv2");
    var outputDiv3 = document.querySelector("#outputDiv3");
    //clear out the entire contents of the div
    outputDiv.innerHTML = "";
    outputDiv2.innerHTML = "";
    outputDiv3.innerHTML = "";
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
var parseMonths = function(){
    starting_month = document.querySelector("#starting_month").value;
    if(starting_month == ""){alert("Starting month is empty"); return false;    }
    var starting_year = starting_month.split('-');
    var temp_s_month = starting_year[1];
    starting_year = starting_year[0];
    temp_s_month = Number(temp_s_month - 1);
    starting_year = Number(starting_year);
    var total_s_months = starting_year * 12 + temp_s_month;
    
    ending_month = document.querySelector("#ending_month").value;
    if(ending_month == ""){alert("Ending month is empty"); return false;    }
    var ending_year = ending_month.split('-');
    temp_s_month = ending_year[1];
    ending_year = ending_year[0];
    temp_s_month = Number(temp_s_month - 1);
    ending_year = Number(ending_year);
    var total_e_months = ending_year*12 + temp_s_month;
    var current_months = (date.getMonth() + date.getFullYear() * 12);
    starting_month = total_s_months - current_months;
    ending_month = total_e_months - current_months;
    if (starting_month > ending_month){
        alert("You seem to have entered a starting date that is after the ending date.")
        return false;
    }
    return true;
}
function createScheduleTable(event){
    var output= "<div class=\"container\"><table class=\"table table-bordered\"><thead><tr><th>Month</th><th>Monthly Principal Paid</th><th>Monthly Interest Paid</th><th>Amount Paid</th><th>Principal Remaining</th><th>Amount Paid / Principal</th></tr></thead><tbody><div class=\"container\">";
    if(!parseMonths()){
        return;
    }
    var amt_paid = 0;
    var array = [];
    var this_month = 0;
    var this_interest = 0;
    var this_principal = 0;
    var counter = 0;
    this_month = thisMonthsPayment(principal, months, monthly);
    for (i = 0; i < months + months/12; i++){
        if (i%12 == 0){
            array.push("<tr><td>" + "<h4>"+(date.getFullYear() + Math.floor(i/12))+"</h4>" + "</td></tr>");
            counter++;
        }
        array.push("<tr><td>" + month[i % 12] + "</td><td>$" + parseFloat(this_principal).toFixed(2) + "</td><td>$" + parseFloat(this_interest).toFixed(2) + "</td><td>$" + parseFloat(amt_paid).toFixed(2) + "</td><td>$" + parseFloat(principal).toFixed(2) + "</td><td>" + parseFloat(amt_paid/initial_principal).toFixed(4) + "</td></tr>");
        this_interest = principal * monthly;
        amt_paid = this_month + amt_paid + this_interest;
        this_principal = this_month - this_interest;
        principal = principal + this_interest - (this_month);
    }
    var years_in_between = (ending_month-starting_month)/12 + 1;
    var years_before = (starting_month/12);
    for(i = starting_month + years_before; i <= ending_month + years_in_between; i++){
        output = output + array[i];
    }
    output = output + "</div></tbody></table></div>";
    document.querySelector("#outputDiv3").innerHTML = output;
}
function createScheduleRange(){
    
    var years_from_now = new Date(date.getFullYear() + (months/12), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()); 
    var output="<div class=\"container\"><h2>Scheduled payment table</h2><div class=\"row\"><div class=\"col-md-4\">Starting Month</div><div class=\"col-md-4\">Ending Month (" + month[years_from_now.getMonth()] + " " + years_from_now.getFullYear() + ")</div></div><div class=\"input-group\"><div class=\"row\"><div class=\"col-md-4\"><input type=\"month\" class=\"form-control\" id=\"starting_month\"/ min=\"" +date.getFullYear() +"-" + date.getMonth() + 1 + "\" max=\"" +years_from_now.getFullYear() +"-" + years_from_now.getMonth() + 1 + "\"/></div><div class=\"col-md-4\"><input type=\"month\" class=\"form-control\" id=\"ending_month\" min=\"" +date.getFullYear() +"-" + date.getMonth() + 1 + "\" max=\"" +years_from_now.getFullYear() +"-" + years_from_now.getMonth() + 1 + "\"/></div><div class=\"col-md-4\"><span class=\"input-group-btn\"><button type=\"button\" id=\"scheduleButton\" class=\"btn btn-default\">          <span class=\"glyphicon glyphicon-refresh\"></span>Create Schedule!</button></span></div></div></div></div>";
    document.querySelector("#outputDiv2").innerHTML = output;
    scheduleButton = document.querySelector("#scheduleButton");
    scheduleButton.addEventListener("click", createScheduleTable, false);
}
//function to be called when the button is clicked 
function display(event)
{	
    var output= "<div class=\"container\"><h2>Sample</h2><table class=\"table table-bordered\"><thead><tr><th>Loan Amount</th><th>Interest Rate</th><th>Monthly Payment</th><th>Total Amount Paid</th><th>Total Amount of Interest Paid</th><th>Amount Paid / Principal</th></tr></thead><tbody>";     
    
    //getting values and making sure theyre numbers-->
    principal = document.querySelector("#principal").value;
    initial_principal = principal;
    if (typeof principal == "string"){
        principal = stripNumberString(principal);
        principal = Number(principal);
    }
    monthly = document.querySelector("#monthly_interest_rate").value;
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
    months = 12*yearCode;
    this_month_payment = thisMonthsPayment(principal,months,monthly);
    //principal-=this_month;
    output = output+ "<tr><td>$" + parseFloat(initial_principal).toFixed(2) + "</td><td>%" + monthly*1200 + "</td><td>$" + parseFloat(this_month_payment).toFixed(2) + "</td><td>$" + 0 + "</td><td>$" + 0 + "</td><td>" + 0 + "</td></tr>";
    output = output + "</tbody></table></div>";
    //access the inner html of the div and place the result string in there
    document.querySelector("#outputDiv").innerHTML = output;
    createScheduleRange();
}