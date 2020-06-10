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

// function debounce(fn, interval = 300) {
//   let canRun = true;
//   return function () {
//     if (!canRun) {
//       return;
//     }
//     canRun = false;
//     setTimeout(() => {
//       fn.apply(this, arguments);
//       canRun = true;
//     }, interval);
//   };
// }

// debounce(() => {
//   console.info(1);
// }, 300)();
// debounce(() => {
//   console.info(1);
// }, 300)();
// debounce(() => {
//   console.info(1);
// }, 300)();

// // debounce(() => {
// //   console.info(1);
// // }, 300);

// // debounce(() => {
// //   console.info(1);
// // }, 300);

let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.info('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
