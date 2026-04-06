export function buildIconRow(size = 24) {
  return Object.values(svgs)
    .map((fn) => fn(size, size, "currentColor"))
    .join("");
}
export const svgs = {
  // 2 people icon
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

  // Calendar icon
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

  // Ticket icon
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

  // house icon
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

  // 1 person with +
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

  // buidlings icon
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

  // question mark inside box
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

  // 1 person inside circle
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

  // exit icon
  logout(width = 22, height = 22, fill = "#1C274C") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none">
        <path d="M14.9453 1.25C13.5778 1.24998 12.4754 1.24996 11.6085 1.36652C10.7084 1.48754 9.95048 1.74643 9.34857 2.34835C8.82363 2.87328 8.55839 3.51836 8.41916 4.27635C8.28387 5.01291 8.25799 5.9143 8.25196 6.99583C8.24966 7.41003 8.58357 7.74768 8.99778 7.74999C9.41199 7.7523 9.74964 7.41838 9.75194 7.00418C9.75803 5.91068 9.78643 5.1356 9.89448 4.54735C9.99859 3.98054 10.1658 3.65246 10.4092 3.40901C10.686 3.13225 11.0746 2.9518 11.8083 2.85315C12.5637 2.75159 13.5648 2.75 15.0002 2.75H16.0002C17.4356 2.75 18.4367 2.75159 19.1921 2.85315C19.9259 2.9518 20.3144 3.13225 20.5912 3.40901C20.868 3.68577 21.0484 4.07435 21.1471 4.80812C21.2486 5.56347 21.2502 6.56459 21.2502 8V16C21.2502 17.4354 21.2486 18.4365 21.1471 19.1919C21.0484 19.9257 20.868 20.3142 20.5912 20.591C20.3144 20.8678 19.9259 21.0482 19.1921 21.1469C18.4367 21.2484 17.4356 21.25 16.0002 21.25H15.0002C13.5648 21.25 12.5637 21.2484 11.8083 21.1469C11.0746 21.0482 10.686 20.8678 10.4092 20.591C10.1658 20.3475 9.99859 20.0195 9.89448 19.4527C9.78643 18.8644 9.75803 18.0893 9.75194 16.9958C9.74964 16.5816 9.41199 16.2477 8.99778 16.25C8.58357 16.2523 8.24966 16.59 8.25196 17.0042C8.25799 18.0857 8.28387 18.9871 8.41916 19.7236C8.55839 20.4816 8.82363 21.1267 9.34857 21.6517C9.95048 22.2536 10.7084 22.5125 11.6085 22.6335C12.4754 22.75 13.5778 22.75 14.9453 22.75H16.0551C17.4227 22.75 18.525 22.75 19.392 22.6335C20.2921 22.5125 21.0499 22.2536 21.6519 21.6517C22.2538 21.0497 22.5127 20.2919 22.6337 19.3918C22.7503 18.5248 22.7502 17.4225 22.7502 16.0549V7.94513C22.7502 6.57754 22.7503 5.47522 22.6337 4.60825C22.5127 3.70814 22.2538 2.95027 21.6519 2.34835C21.0499 1.74643 20.2921 1.48754 19.392 1.36652C18.525 1.24996 17.4227 1.24998 16.0551 1.25H14.9453Z" fill="${fill}"/>
        <path d="M15 11.25C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4.02744L5.98809 14.4306C6.30259 14.7001 6.33901 15.1736 6.06944 15.4881C5.79988 15.8026 5.3264 15.839 5.01191 15.5694L1.51191 12.5694C1.34567 12.427 1.25 12.2189 1.25 12C1.25 11.7811 1.34567 11.573 1.51191 11.4306L5.01191 8.43056C5.3264 8.16099 5.79988 8.19741 6.06944 8.51191C6.33901 8.8264 6.30259 9.29988 5.98809 9.56944L4.02744 11.25H15Z" fill="${fill}"/>
      </svg>
    `;
  },

  // cheveron icon >
  chevron(width = 18, height = 18, stroke = "currentColor") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24"
           fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 6l6 6l-6 6" />
      </svg>
    `;
  },

  // field icon
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

  // clock
  clock(width = 32, height = 32, stroke = "#000000") {
    return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${stroke}"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 7v5" />
      <path d="M12 12l2 -3" />
    </svg>

    `;
  },

  // phone
  phone(width = 32, height = 32, stroke = "#000000") {
    return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 24 24"
      fill="${stroke}"

    >
      <path
        d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z"
      />
    </svg>
    `;
  },

  // mail
  mail(width = 32, height = 32, stroke = "#000000") {
    return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 24 24"
      fill="${stroke}"

    >
      <path
                d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
              />
              <path
                d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
              />
    </svg>
    `;
  },

  // hamburger menu icon
  menu(width = 32, height = 32, stroke = "#000000") {
    return `
    <svg xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewBox="0 0 24 24"
    fill="none"
    stroke="${stroke}"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M4 6l16 0" />
    <path d="M4 12l16 0" />
    <path d="M4 18l16 0" />
    </svg>
    `;
  },

  // round info icon
  info(width = 32, height = 32, stroke = "#000000") {
    return `
   <svg 
    width="${width}"
    height="${height}"
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
      fill="${stroke}"
    />
  </svg>
    `;
  },

  // magnifying glass icon
  search(width = 32, height = 32, stroke = "#000000") {
    return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${width}"
      height="${height}"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="${stroke}"
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="M21 21l-4.3-4.3"></path>
    </svg>
    `;
  },

  // pencil and box icon
  edit(width = 32, height = 32, stroke = "#000000") {
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
      <path
        d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"
      />
      <path
        d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
      />
      <path d="M16 5l3 3" />
    </svg>
    `;
  },

  // map marker icon
  location(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
        viewBox="0 0 24 24"
        fill="none"
      stroke="${stroke}"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
      </svg>
    `;
  },
  // Instagram
  instagram(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
        viewBox="0 0 24 24"
        fill="none"
      stroke="${stroke}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M16.5 7.5l0 .01" />
      </svg>

    `;
  },
  // globe icon
  website(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
        viewBox="0 0 24 24"
        fill="none"
      stroke="${stroke}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
        <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
        <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
        <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
        <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
        <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
        <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
        <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
        <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
      </svg>
    `;
  },
  // beericon
  beer(width = 32, height = 32, stroke = "#000000") {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
        viewBox="0 0 24 24"
        fill="none"
      stroke="${stroke}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 21h6a1 1 0 0 0 1 -1v-3.625c0 -1.397 .29 -2.775 .845 -4.025l.31 -.7c.556 -1.25 .845 -2.253 .845 -3.65v-4a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v4c0 1.397 .29 2.4 .845 3.65l.31 .7a9.931 9.931 0 0 1 .845 4.025v3.625a1 1 0 0 0 1 1z" />
        <path d="M6 8h12" />
      </svg>
    `;
  },
};
