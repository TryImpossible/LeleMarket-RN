const Immutable = require('immutable');

const oddSquares = Immutable.Seq([1, 2, 3, 4, 5, 6, 7, 8])
  .filter(x => {
    console.log('immutable对象的filter执行');
    console.log(x % 2);
    return x % 2;
  })
  .map(x => x * x);
console.log(oddSquares.get(1));
