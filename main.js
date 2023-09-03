"use strict";

const sendNotification = (type, text)  => {
    let notificationBox = document.querySelector(".notification-box");
    const alerts = {
      info: {
        icon: `<svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
        color: "blue-500"
      },
      error: {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
        color: "red-500"
      },
      warning: {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>`,
        color: "yellow-500"
      },
      success: {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
        color: "green-500"
      }
    };
    let component = document.createElement("div");
    component.className = `relative flex items-center bg-${alerts[type].color} text-white text-sm font-bold px-4 py-3 rounded-md opacity-0 transform transition-all duration-500 mb-1`;
    component.innerHTML = `${alerts[type].icon}<p>${text}</p>`;
    notificationBox.appendChild(component);
    setTimeout(() => {
      component.classList.remove("opacity-0");
      component.classList.add("opacity-1");
    }, 1);
    setTimeout(() => {
      component.classList.remove("opacity-1");
      component.classList.add("opacity-0");
      component.style.margin = 0;
      component.style.padding = 0;
    }, 5000);
    setTimeout(() => {
      component.style.setProperty("height", "0", "important");
    }, 5100);
    setTimeout(() => {
      notificationBox.removeChild(component);
    }, 5700);
}

const succes = (task) => {
    sendNotification('success', 'Succes!');
    if (task == 1) {
      setTimeout(() => {
        window.location.replace(task + '.html');   
      }, 2500);  
    }
    else {
      setTimeout(() => {
        window.location.replace('other' + '.html');   
      }, 2500);  
    }   
}

const inputs = document.querySelectorAll(".code input");
const codes = ['13240', '31509', '85132', '91762', '16382', '72300', '11790', '88888', '12981', '01100'];

inputs.forEach((input, index) => {
    input.dataset.index = index;
    input.addEventListener("keyup", handleOtp);
    input.addEventListener("paste", handleOnPasteOtp);
});

function handleOtp(e) {
    const input = e.target;
    let value = input.value;
    let isValidInput = value.match(/[0-9a-z]/gi);
    input.value = "";
    input.value = isValidInput ? value[0] : "";

    let fieldIndex = input.dataset.index;
    if (fieldIndex < inputs.length - 1 && isValidInput) {
        input.nextElementSibling.focus();
    }

    if (e.key === "Backspace" && fieldIndex > 0) {
        input.previousElementSibling.focus();
    }

    if (fieldIndex == inputs.length - 1 && isValidInput) {
        submit();
    }
}

function handleOnPasteOtp(e) {
    const data = e.clipboardData.getData("text");
    const value = data.split("");
    if (value.length === inputs.length) {
        inputs.forEach((input, index) => (input.value = value[index]));
        submit();
    }
}

function submit() {
    console.log("Submitting...");
    let otp = "";
    inputs.forEach((input) => {
        otp += input.value;
        input.disabled = true;
        input.classList.add("disabled");

    });
    console.log(otp);
    if (codes.indexOf(otp.toString()) >= 0) {
        succes(codes.indexOf(otp.toString()) + 1);
    }
    else {
        sendNotification('error', 'Code is incorrect!');
        inputs.forEach((input) => {
            otp += input.value;
            input.disabled = false;
            input.classList.remove("disabled");
            input.value = "";    
        });
    }
}

const title = localStorage.getItem("title");
const score = localStorage.getItem("score");
const img = document.querySelector('.img__name');
const text = document.querySelector('.text__name');
const score__text = document.querySelector('.score__name');
const main = document.querySelector('title');

text.innerHTML = title.toString();
img.setAttribute('src', title + '.png');
main.innerHTML = title.toString() + ' | МЯУ';
score__text.innerHTML = score.toString() + '/100';
