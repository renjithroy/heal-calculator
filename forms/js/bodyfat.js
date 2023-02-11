let btn = document.querySelector(".bodyfatBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked) {
    var gender = document.querySelector('input[name="flexRadioDefault"]:checked').value;
  }
  let age = document.querySelector("#age").value;
  let bmi = parseFloat(document.querySelector("#bmi").value);

  let bodyfatMsg = document.querySelector(".bodyfat-msg");
  let bodyfatInfo = document.querySelector(".bodyfat-info");
  let errorDiv = document.querySelector(".errorMsg");

  let errorStatus = false; //initializing error status to false

  errorDiv.innerText = ""; //removing error msg on each submit
  bodyfatMsg.innerText = "";
  bodyfatInfo.innerText = "";

  if (
    document.querySelector("#age").value == "" ||
    document.querySelector("#bmi").value == "" ||
    !(document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked) //if any input is left out
  ) {
    errorDiv.innerText = "Error: Please fill in the feilds";
    errorStatus = true;
  } else if (isNaN(age) && isNaN(bmi)) {
    //both are not numbers
    errorDiv.innerText = "Error: Enter valid Age and BMI";
    errorStatus = true;
  } else if (isNaN(age)) {
    //height is not a number
    errorDiv.innerText = "Error: Enter valid Age";
    errorStatus = true;
  } else if (isNaN(bmi)) {
    //weight is not a number
    errorDiv.innerText = "Error: Enter valid BMI";
    errorStatus = true;
  }

  const [bodyfat, msg] = calcBodyFat(gender, age, bmi);

  if (!errorStatus) {
    //if there are no errors in the input data
    bodyfatMsg.innerHTML = `Your Body Fat Percentage: <b>${bodyfat}%</b><br>Body Fat status: <b>${msg}</b>`;
    bodyfatInfo.innerText = `Underfat: under 8 percent\nHealthy: 8-19 percent\nOverweight: 19-25 percent\nObese: over 25 percent`;

    document.querySelector("#age").value = "";
    document.querySelector("#bmi").value = "";
  }
});

let calcBodyFat = (gender, age, bmi) => {
  
  let bodyfat;

  if (gender === "male") {
    bodyfat = 1.2 * bmi + 0.23 * age - 16.2;
  } else if (gender === "female") {
    bodyfat = 1.2 * bmi + 0.23 * age - 5.4;
  }

  let bf = parseFloat(bodyfat.toFixed(2));

  let msg;

  if (bf <= 8) {
    msg = "Underfat";
  } else if ((bf > 8) & (bf <= 19)) {
    msg = "Healthy";
  } else if ((bf > 19) & (bf <= 25)) {
    msg = "Overweight";
  } else if (bf > 25) {
    msg = "Obese";
  }

  return [bf, msg];
};
