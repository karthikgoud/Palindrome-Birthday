const inputDate = document.querySelector("#input-date");
const checkBtn = document.querySelector("#calculate-btn");
const outputEl = document.querySelector("#next-output");
const loader = document.querySelector(".spinner");
const hide = document.querySelector(".hide");
const outputEl2 = document.querySelector("#previous-output");

function reverseStr(string) {
  const strReversed = string.split("").reverse().join("");

  return strReversed;
}

function isPalindrome(string) {
  const strReversed = reverseStr(string);

  return string === strReversed;
}

function convertDateToString(date) {
  let dateToStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateToStr.day = "0" + date.day;
  } else {
    dateToStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateToStr.month = "0" + date.month;
  } else {
    dateToStr.month = date.month.toString();
  }

  dateToStr.year = date.year.toString();

  return dateToStr;
}

function createDateFormats(date) {
  let dateObjStr = convertDateToString(date);
  // console.log(dateObjStr)

  let ddmmyyyy = dateObjStr.day + dateObjStr.month + dateObjStr.year;
  let mmddyyyy = dateObjStr.month + dateObjStr.day + dateObjStr.year;
  let yyyymmdd = dateObjStr.year + dateObjStr.month + dateObjStr.day;
  let ddmmyy = dateObjStr.day + dateObjStr.month + dateObjStr.year.slice(-2);
  let mmddyy = dateObjStr.month + dateObjStr.day + dateObjStr.year.slice(-2);
  let yymmdd = dateObjStr.year.slice(-2) + dateObjStr.month + dateObjStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  let dateFormatList = createDateFormats(date);
  // [ '22022022', '02222022', '20220222', '220222', '022222', '220222' ]

  // console.log(dateFormatList)

  let flag = false;

  // for(i=0; i<dateFormatList.length;i++){
  //   if(isPalindrome(dateFormatList[i])){
  //     return flag= true;
  //   }
  //   return flag
  // }

  // return flag

  for (let str of dateFormatList) {
    if (isPalindrome(str)) {
      return (flag = true);
    }
  }

  return flag;
}

function leapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
}

function getNextDate(date) {
  //increment day by 1
  let day = date.day + 1; // 29
  let month = date.month; // 2
  let year = date.year; //2021

  let daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];

  // ----------

  // three scenarios to take care of
  //day exceeds no of days in month\
  //month exceeds 12
  // leap year feb days is 29

  //check for leap year
  if (leapYear(year)) {
    if (month === 2) {
      daysInMonth[1] = 29; // changing feb days for leap year
      if (day > daysInMonth[month - 1]) {
        // 30 > 29
        day = 1;
        month++;
      }
    }
  }

  // day taken care if exceeds daysInMonth
  if (day > daysInMonth[month - 1]) {
    //29 > 28
    day = 1;
    month++;
  }

  //month taken care if > 12
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousDate(date) {
  let daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];

  var day = date.day - 1;
  let month = date.month;
  let year = date.year;

  // my try

  if (leapYear(year)) {
    daysInMonth[1] = 29;
    if (day === 0) {
      month--;
      if (month === 0) {
        month = 12;
        year--;
        day = daysInMonth[month - 1] - day;
      } else {
        day = daysInMonth[month - 1] - day;
      }
    }
  }

  if (day === 0) {
    month--;
    if (month === 0) {
      month = 12;
      year--;
      day = daysInMonth[month - 1] - day;
    } else {
      day = daysInMonth[month - 1] - day;
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindrome(nextDate);
    if (isPalindrome) {
      break;
    }

    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function previousPalindromeDate(date) {
  counter = 0;
  let prevDate = getPreviousDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindrome(prevDate);
    if (isPalindrome) {
      break;
    }
    prevDate = getPreviousDate(prevDate);
  }

  return [counter, prevDate];
}

function clickHandler() {
  const date = inputDate.value;

  if (date === "") {
    outputEl.innerHTML = `<p id="invalid">Invalid-input: Please enter date</p>`;
  } else {
    const dateArray = date.split("-");

    const dateObject = {
      day: Number(dateArray[2]),
      month: Number(dateArray[1]),
      year: Number(dateArray[0]),
    };

    outputEl.style.display = "block";
    outputEl2.style.display = "block";
    loader.style.display = "block";
    hide.style.display = "block";

    const isPalindrome = checkPalindrome(dateObject);

    //   ------
    setTimeout(() => {
      if (isPalindrome) {
        outputEl.innerHTML = `<p>Your birthday is <span>Palindrome</span></p>`;
        loader.style.display = "none";
        hide.style.display = "none";
      } else {
        loader.style.display = "none";
        hide.style.display = "none";

        const [counterNext, nextDate] = nextPalindromeDate(dateObject);
        outputEl.innerHTML = `<p>The next palindrome date is <span>${
          nextDate.day
        }-${nextDate.month}-${
          nextDate.year
        }</span> , which is after <span>${counterNext}</span> ${
          counterNext > 1 ? "days" : "day"
        }.</p>`;

        const [counterPrev, datePrev] = previousPalindromeDate(dateObject);
        outputEl2.innerHTML = `<p>The previous palindrome date is  <span>${
          datePrev.day
        }-${datePrev.month}-${
          datePrev.year
        }</span> , which was <span> ${counterPrev}</span> ${
          counterPrev > 1 ? "days" : "day"
        } ago.</p>`;
      }
    }, 3000);
  }

  // ---------
}
checkBtn.addEventListener("click", clickHandler);
