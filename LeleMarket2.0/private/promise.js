// https://github.com/sahooz/country-picker-android

// const debounce = (func, wait) => {
//   let timeout = null;
//   return function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(this, arguments);
//     }, wait);
//   };
// };

function debounce(fn, interval = 300) {
  let canRun = true;
  return function () {
    if (!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}

debounce(() => {
  console.info(1);
}, 300)();
debounce(() => {
  console.info(1);
}, 300)();
debounce(() => {
  console.info(1);
}, 300)();

// debounce(() => {
//   console.info(1);
// }, 300);

// debounce(() => {
//   console.info(1);
// }, 300);
