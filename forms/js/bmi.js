let btn = document.querySelector(".bmiBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked) {
    var heightUnit = document.querySelector('input[name="flexRadioDefault"]:checked').value;
  }
  let height = parseFloat(document.querySelector("#height").value);
  let weight = parseFloat(document.querySelector("#weight").value);

  let bmiMsg = document.querySelector(".bmi-msg");
  let bmiInfo = document.querySelector(".bmi-info");
  let errorDiv = document.querySelector(".errorMsg");

  let errorStatus = false; //initializing error status to false

  errorDiv.innerText = ""; //removing error msg on each submit
  bmiMsg.innerText = "";
  bmiInfo.innerText = "";


  if (
    document.querySelector("#height").value == "" ||
    document.querySelector("#weight").value == "" ||
    !(document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked) //if any input is left out
  ) {
    errorDiv.innerText = "Error: Please fill in the feilds";
    errorStatus = true;
  } else if (isNaN(height) && isNaN(weight)) {
    //both are not numbers
    errorDiv.innerText = "Error: Enter valid height and weight";
    errorStatus = true;
  } else if (isNaN(height)) {
    //height is not a number
    errorDiv.innerText = "Error: Enter valid height";
    errorStatus = true;
  } else if (isNaN(weight)) {
    //weight is not a number
    errorDiv.innerText = "Error: Enter valid weight";
    errorStatus = true;
  }

  const [bmi, msg] = calcBMI(heightUnit, height, weight);

  if (!errorStatus) {
    //if there are no errors in the input data
    bmiMsg.innerHTML = `Your BMI: <b>${bmi}</b><br>BMI Status: <b>${msg}</b>`;
    bmiInfo.innerText = `Underweight = <18.5\nNormal weight = 18.5-24.9\nOverweight = 25-29.9\nObesity = BMI of 30 or greater`;

    document.querySelector("#height").value = "";
    document.querySelector("#weight").value = "";
  }
});

let calcBMI = (heightUnit, height, weight) => {
  if (heightUnit === "cm") {
    height = height / 100;
  }

  let tempBmi = weight / (height * height);

  let bmi = parseFloat(tempBmi.toFixed(2));
  //   console.log(bmi);

  let msg;

  if (bmi < 18.5) {
    msg = "Underweight";
  } else if ((bmi > 18.5) & (bmi < 24.9)) {
    msg = "Normal Weight";
  } else if ((bmi > 25) & (bmi < 29.9)) {
    msg = "Overweight";
  } else if (bmi > 30) {
    msg = "Obese";
  }

  // console.log(msg);

  return [bmi, msg];
};
