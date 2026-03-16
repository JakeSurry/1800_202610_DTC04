export const svgs = {
  addPeople(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="${width}" 
        height="${height}" 
        viewBox="0 0 24 24"
        fill="none" 
        stroke="${stroke}"
        stroke-width="1" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
    `;
  },

  people(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${width}" 
        height="${height}" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="${stroke}"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    `;
  },

  calendar(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${width}"
        height="${height}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${stroke}"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 9H21" />
        <path d="M17 13.0014L7 13" />
        <path d="M10.3333 17.0005L7 17" />
        <path d="M7 3V5" />
        <path d="M17 3V5" />
        <path d="M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" />
      </svg>
    `;
  },

  events(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${width}"
        height="${height}"
        viewBox="0 0 16 16"
        fill="none"
        stroke="${stroke}"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke-width=".5" id="Path_24" data-name="Path 24" d="M-212.5-32a.5.5,0,0,1-.354-.146l-1.585-1.586a.5.5,0,0,1-.147-.354.5.5,0,0,1,.147-.354A1.489,1.489,0,0,0-214-35.5a1.5,1.5,0,0,0-1.5-1.5,1.489,1.489,0,0,0-1.06.439.5.5,0,0,1-.354.147h0a.5.5,0,0,1-.354-.147l-1.586-1.585a.5.5,0,0,1,0-.708l9-9a.5.5,0,0,1,.708,0l1.585,1.586a.5.5,0,0,1,.147.354.5.5,0,0,1-.147.354A1.489,1.489,0,0,0-208-44.5a1.5,1.5,0,0,0,1.5,1.5,1.489,1.489,0,0,0,1.06-.439.5.5,0,0,1,.354-.147h0a.5.5,0,0,1,.354.147l1.586,1.585a.5.5,0,0,1,0,.708l-9,9A.5.5,0,0,1-212.5-32Zm-.914-2.121.914.914,8.293-8.293-.914-.914A2.483,2.483,0,0,1-206.5-42a2.5,2.5,0,0,1-2.5-2.5,2.483,2.483,0,0,1,.414-1.379l-.914-.914-8.293,8.293.914.914A2.483,2.483,0,0,1-215.5-38a2.5,2.5,0,0,1,2.5,2.5A2.483,2.483,0,0,1-213.414-34.121ZM-211.5-36a.5.5,0,0,1-.354-.146l-3-3a.5.5,0,0,1,0-.708l4-4a.5.5,0,0,1,.708,0l3,3a.5.5,0,0,1,0,.708l-4,4A.5.5,0,0,1-211.5-36Zm-2.293-3.5,2.293,2.293,3.293-3.293-2.293-2.293Z" transform="translate(219 48)"/>
      </svg>
    `;
  },

  home(width = 22, height = 22, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    `;
  },

  login(width = 22, height = 22, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
      </svg>
    `;
  },

  signup(width = 22, height = 22, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4" />
        <path d="M4 7v3H1v2h3v3h2v-3h3v-2H6V7z" />
        <path d="M15 13c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4" />
      </svg>
    `;
  },

  business(width = 22, height = 22, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01" />
        <path d="M9 12v.01" />
        <path d="M9 15v.01" />
        <path d="M9 18v.01" />
      </svg>
    `;
  },

  help(width = 22, height = 22, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        <path d="M12 16v.01" />
        <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
      </svg>
    `;
  },

  profile(width = 22, height = 22, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
      </svg>
    `;
  },

  logout(width = 22, height = 22, fill = "#1C274C") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none">
        <path d="M14.9453 1.25C13.5778 1.24998 12.4754 1.24996 11.6085 1.36652C10.7084 1.48754 9.95048 1.74643 9.34857 2.34835C8.82363 2.87328 8.55839 3.51836 8.41916 4.27635C8.28387 5.01291 8.25799 5.9143 8.25196 6.99583C8.24966 7.41003 8.58357 7.74768 8.99778 7.74999C9.41199 7.7523 9.74964 7.41838 9.75194 7.00418C9.75803 5.91068 9.78643 5.1356 9.89448 4.54735C9.99859 3.98054 10.1658 3.65246 10.4092 3.40901C10.686 3.13225 11.0746 2.9518 11.8083 2.85315C12.5637 2.75159 13.5648 2.75 15.0002 2.75H16.0002C17.4356 2.75 18.4367 2.75159 19.1921 2.85315C19.9259 2.9518 20.3144 3.13225 20.5912 3.40901C20.868 3.68577 21.0484 4.07435 21.1471 4.80812C21.2486 5.56347 21.2502 6.56459 21.2502 8V16C21.2502 17.4354 21.2486 18.4365 21.1471 19.1919C21.0484 19.9257 20.868 20.3142 20.5912 20.591C20.3144 20.8678 19.9259 21.0482 19.1921 21.1469C18.4367 21.2484 17.4356 21.25 16.0002 21.25H15.0002C13.5648 21.25 12.5637 21.2484 11.8083 21.1469C11.0746 21.0482 10.686 20.8678 10.4092 20.591C10.1658 20.3475 9.99859 20.0195 9.89448 19.4527C9.78643 18.8644 9.75803 18.0893 9.75194 16.9958C9.74964 16.5816 9.41199 16.2477 8.99778 16.25C8.58357 16.2523 8.24966 16.59 8.25196 17.0042C8.25799 18.0857 8.28387 18.9871 8.41916 19.7236C8.55839 20.4816 8.82363 21.1267 9.34857 21.6517C9.95048 22.2536 10.7084 22.5125 11.6085 22.6335C12.4754 22.75 13.5778 22.75 14.9453 22.75H16.0551C17.4227 22.75 18.525 22.75 19.392 22.6335C20.2921 22.5125 21.0499 22.2536 21.6519 21.6517C22.2538 21.0497 22.5127 20.2919 22.6337 19.3918C22.7503 18.5248 22.7502 17.4225 22.7502 16.0549V7.94513C22.7502 6.57754 22.7503 5.47522 22.6337 4.60825C22.5127 3.70814 22.2538 2.95027 21.6519 2.34835C21.0499 1.74643 20.2921 1.48754 19.392 1.36652C18.525 1.24996 17.4227 1.24998 16.0551 1.25H14.9453Z" fill="${fill}"/>
        <path d="M15 11.25C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4.02744L5.98809 14.4306C6.30259 14.7001 6.33901 15.1736 6.06944 15.4881C5.79988 15.8026 5.3264 15.839 5.01191 15.5694L1.51191 12.5694C1.34567 12.427 1.25 12.2189 1.25 12C1.25 11.7811 1.34567 11.573 1.51191 11.4306L5.01191 8.43056C5.3264 8.16099 5.79988 8.19741 6.06944 8.51191C6.33901 8.8264 6.30259 9.29988 5.98809 9.56944L4.02744 11.25H15Z" fill="${fill}"/>
      </svg>
    `;
  },

  chevron(width = 18, height = 18, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 6l6 6l-6 6" />
      </svg>
    `;
  },
  stadium(width = 32, height = 32, stroke = "#000000") {
    return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${stroke}"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5H21.4C21.7314 5 22 5.26863 22 5.6V18.4C22 18.7314 21.7314 19 21.4 19H12M12 5H2.6C2.26863 5 2 5.26863 2 5.6V18.4C2 18.7314 2.26863 19 2.6 19H12M12 5V19"/>
      <path d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"/>
      <path d="M2 17C4.76142 17 7 14.7614 7 12C7 9.23858 4.76142 7 2 7"/>
      <path d="M22 17C19.2386 17 17 14.7614 17 12C17 9.23858 19.2386 7 22 7"/>
    </svg>
  `;
  },
};
