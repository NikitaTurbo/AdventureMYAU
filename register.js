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

  const succes = (value) => {
    window.location.replace('main.html');
    localStorage.setItem('title', value);
    localStorage.setItem('score', 0);
  }

  const usernames = ['spanchbob', 'patrik', 'plankton', 'crabs', 'skvidvard'];
  const passwords = ['qf2cK5', 'A0d1zX', '7Kd93C', 'Hn06gG', '27yTa0'];
  
  $(document).ready(function() {
      $('#form-button').click(function() {
        LogIn($('#username').val(), $('#password').val());
      });
  });
  
  const LogIn = (username, password) => {
      if (usernames.indexOf(username) >= 0 && passwords.indexOf(password) >= 0) {
          if (usernames.indexOf(username) === passwords.indexOf(password)) {
              sendNotification('success', 'Succes!');
              setTimeout(() => {
                succes(username);
              }, 2500);            
          }
          else {
              sendNotification('error', 'Username or passowrd incorrect.');
          }
      }
      else {
          sendNotification('error', 'Username or passowrd incorrect.');
      }
  }