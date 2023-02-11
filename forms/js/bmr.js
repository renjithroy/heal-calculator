let btn = document.querySelector(".bmrBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked) {
    var gender = document.querySelector('input[name="flexRadioDefault"]:checked').value;
  }
  let height = parseFloat(document.querySelector("#height").value);
  let weight = parseFloat(document.querySelector("#weight").value);
  let age = parseFloat(document.querySelector("#age").value);

  let bmrMsg = document.querySelector(".bmr-msg");
//   let bmrInfo = document.querySelector(".bmr-info");
  let errorDiv = document.querySelector(".errorMsg");

  let errorStatus = false; //initializing error status to false

  errorDiv.innerText = ""; //removing error msg on each submit
  bmrMsg.innerText = "";
//   bmrInfo.innerText = "";

  if (
    document.querySelector("#height").value == "" ||
    document.querySelector("#weight").value == "" ||
    document.querySelector("#age").value == "" ||
    !(document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked) //if any input is left out
  ) {
    errorDiv.innerText = "Error: Please fill in the feilds";
    errorStatus = true;
  } else if (isNaN(height) && isNaN(weight)) {
    //both are not numbers
    errorDiv.innerText = "Error: Enter valid height, weight and age";
    errorStatus = true;
  } else if (isNaN(height)) {
    //height is not a number
    errorDiv.innerText = "Error: Enter valid height";
    errorStatus = true;
  } else if (isNaN(weight)) {
    //weight is not a number
    errorDiv.innerText = "Error: Enter valid weight";
    errorStatus = true;
  } else if (isNaN(age)) {
    //weight is not a number
    errorDiv.innerText = "Error: Enter valid age";
    errorStatus = true;
  }

  const [bmr, msg] = calcBMR(gender, height, weight, age);

  if (!errorStatus) {
    //if there are no errors in the input data
    bmrMsg.innerHTML = `Your BMR: <b>${bmr}</b> Calories/day<br>BMR Status: <b>${msg}</b>`;
    // bmrInfo.innerText = `Sedentary: little or no exercise: 1,853 Calorie\nExercise 1-3 times/week: 2,123 Calorie\nExercise 4-5 times/week: 2,262 Calorie\nDaily exercise or intense exercise 3-4 times/week: 2,393 Calorie\nIntense exercise 6-7 times/week: 2,663 Calorie\nVery intense exercise daily, or physical job: 2,933 Calorie`;

    document.querySelector("#height").value = "";
    document.querySelector("#weight").value = "";
    document.querySelector("#age").value = "";
  }
});

let calcBMR = (gender, height, weight, age) => {
  let tempBmr;
  if (gender === "male") {
    tempBmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "female") {
    tempBmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let bmr = parseInt(tempBmr);
  //   console.log(bmi);

  let msg;

  if (bmr <= 1853) {
    msg = "Sedentary: little or no exercise required";
  } else if ((bmr > 1853) & (bmr <= 2123)) {
    msg = "Exercise 1-3 times/week";
  } else if ((bmr > 2123) & (bmr <= 2262)) {
    msg = "Exercise 4-5 times/week";
  } else if ((bmr > 2262) & (bmr <= 2393)) {
    msg = "Daily exercise required";
  } else if ((bmr > 2393) & (bmr <= 2663)) {
    msg = "Intense exercise required";
  } else if ((bmr > 2663) & (bmr <= 2933)) {
    msg = "Very intense daily exercise required";
  } else if (bmr > 2933) {
    msg = "Intense excercise and diet required";
  }


  return [bmr, msg];
};
