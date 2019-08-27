const { Map, List, is, Set } = require('immutable');

// const map = Map({ a: 1, b: 2, c: 3 })
// const mapCopy = map
// console.log(map)
// console.log(mapCopy)

// const list1 = List([1, 2])
// const list2 = list1.push(3, 4, 5)
// const list3 = list2.unshift(0)
// const list4 = list1.concat(list2, list3)
// console.log(list1)
// console.log(list2)
// console.log(list3)
// console.log(list4)

// const alpha = Map({ a: 1, b: 2, c: 3, d: 4 })
// console.log(alpha)
// console.log(alpha.get('a'))
// const a = alpha
//   .map((v, k) => {
//     console.log(v, k)
//     return k.toUpperCase()
//   })
//   .join()
// console.log(a)

// const obj1 = { a: 1, b: 2, c: 3 }
// const obj2 = { a: 1, b: 2, c: 3 }
// console.log(obj1 !== obj2) // two different instances are always not equal with ===

// const map1 = Map({ a: 1, b: 2, c: 3 })
// const map2 = Map({ a: 1, b: 2, c: 3 })
// console.log(map1 !== map2) // two different instances are not reference-equal
// console.log(map1.equals(map2)) // but are value-equal if they have the same values
// console.log(is(map1, map2)) // alternatively can use the is() function

// const map1 = Map({ a: 1, b: 2, c: 3 })
// const map2 = Map({ a: 1, b: 2, c: 3 })
// const set = Set().add(map1)
// console.log(set.has(map2))

// const originalMap = Map({ a: 1, b: 2, c: 3 })
// const updatedMap = originalMap.set('b', 2)
// console.log(updatedMap === originalMap)

// const originalMap = Map({ a: 1, b: 2, c: 3 })
// const updatedMap = originalMap.set('b', 1000)
// // New instance, leaving the original immutable.
// console.log(updatedMap !== originalMap)
// const anotherUpdatedMap = originalMap.set('b', 1000)
// // Despite both the results of the same operation, each created a new reference.
// console.log(anotherUpdatedMap !== updatedMap)
// // However the two are value equal.
// console.log(anotherUpdatedMap.equals(updatedMap))

const m = Map({
  a: [{ menu: a }, { menu: b }, { menu: c }]
});
console.log(m);
