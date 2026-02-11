// Done by: Sebastian Abarca
// This file contains the functions that render the events on the page
function renderEvent(event) {
  // This function takes an event object and returns the content html for that event card
  return `
        <div
            class="flex flex-col gap-2 bg-gray-400 rounded-3xl min-w-70 h-40 md:min-w-80 md:h-50 p-3"
          >
          <div class="flex items-center gap-3">
          <img
            src="${event.image}"
            alt="${event.name}"
            class="w-20 object-contain rounded-xl"/>
            <div class="flex flex-col gap-2">
            <h3 class="text-sm text-[#fff] font-semibold md:text-base">${event.name}</h3>
            <div class="flex items-center gap-2">
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.636364 11C0.456061 11 0.30503 10.934 0.183273 10.802C0.0610909 10.6705 0 10.5073 0 10.3125V9.075C0 8.68542 0.0929091 8.32723 0.278727 8.00044C0.464121 7.6741 0.710606 7.425 1.01818 7.25313C1.67576 6.89792 2.34394 6.6314 3.02273 6.45356C3.70152 6.27619 4.39091 6.1875 5.09091 6.1875C5.79091 6.1875 6.4803 6.27619 7.15909 6.45356C7.83788 6.6314 8.50606 6.89792 9.16364 7.25313C9.47121 7.425 9.7177 7.6741 9.90309 8.00044C10.0889 8.32723 10.1818 8.68542 10.1818 9.075V10.3125C10.1818 10.5073 10.1207 10.6705 9.99855 10.802C9.87679 10.934 9.72576 11 9.54545 11H0.636364ZM11.1523 11C11.2477 10.9198 11.322 10.8194 11.375 10.6989C11.428 10.5788 11.4545 10.4443 11.4545 10.2953V8.9375C11.4545 8.43333 11.3247 7.9491 11.0651 7.48481C10.805 7.02098 10.4364 6.62292 9.95909 6.29062C10.5 6.35937 11.0091 6.47671 11.4864 6.64262C11.9636 6.809 12.4091 7.0125 12.8227 7.25313C13.2045 7.48229 13.4962 7.73712 13.6977 8.01762C13.8992 8.29858 14 8.60521 14 8.9375V10.3125C14 10.5073 13.9389 10.6705 13.8167 10.802C13.695 10.934 13.5439 11 13.3636 11H11.1523ZM5.09091 5.5C4.39091 5.5 3.79167 5.23073 3.29318 4.69219C2.7947 4.15365 2.54545 3.50625 2.54545 2.75C2.54545 1.99375 2.7947 1.34635 3.29318 0.807813C3.79167 0.269271 4.39091 0 5.09091 0C5.79091 0 6.39015 0.269271 6.88864 0.807813C7.38712 1.34635 7.63636 1.99375 7.63636 2.75C7.63636 3.50625 7.38712 4.15365 6.88864 4.69219C6.39015 5.23073 5.79091 5.5 5.09091 5.5ZM11.4545 2.75C11.4545 3.50625 11.2053 4.15365 10.7068 4.69219C10.2083 5.23073 9.60909 5.5 8.90909 5.5C8.79242 5.5 8.64394 5.48579 8.46364 5.45737C8.28333 5.4285 8.13485 5.39687 8.01818 5.3625C8.30455 4.99583 8.52452 4.58906 8.67809 4.14219C8.83209 3.69531 8.90909 3.23125 8.90909 2.75C8.90909 2.26875 8.83209 1.80469 8.67809 1.35781C8.52452 0.910937 8.30455 0.504167 8.01818 0.1375C8.16667 0.0802082 8.31515 0.0428543 8.46364 0.0254376C8.61212 0.00847929 8.76061 0 8.90909 0C9.60909 0 10.2083 0.269271 10.7068 0.807813C11.2053 1.34635 11.4545 1.99375 11.4545 2.75Z" fill="white"/>
            </svg>
            <p class="text-xs text-[#fff] font-medium md:text-sm">${event.registration}</p>
            </div>
            <p class="text-xs text-[#fff] font-medium md:text-sm">${event.date}</p>
            </div>
            </div>
        <p class="text-xs text-[#fff] font-medium md:text-sm">${event.description}</p>
        </div>
        `;
}

export function renderEvents(events, eventsContainerId) {
  /* This function takes an array of event objects and the id of the container where 
  the events should be rendered and appends the rendered events to that container */
  const eventsContainer = $(`#${eventsContainerId}`);
  console.log(eventsContainer);
  for (let event of events) {
    eventsContainer.append(renderEvent(event));
  }
}
