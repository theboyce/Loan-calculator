//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';

  //show reset button


  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Create a function to calculate results
function calculateResults() {
  console.log('Calculating...');

  //ui vars

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //show results
    document.getElementById('results').style.display = 'block';

    //show reset button
    document.querySelector('.reset').style.display = 'block';

    //hide loader
    document.getElementById('loading').style.display = 'none';

    //hide calculate button
    document.querySelector('.btn').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }

  
}

//create a div
function showError(error){


  //hide results
  document.getElementById('results').style.display = 'none';

  //hide loader
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

  //get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  //add class
  errorDiv.className = "alert alert-danger";

  //create a text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearAlert, 2000);

   
}


function clearAlert(){
  document.querySelector('.alert').remove();
}


document.querySelector('.reset').addEventListener('click', reset);


function reset(){
  //reload page

window.location.reload();
}
