/* 普通匹配器 */
// toBeNull 只匹配 null
// toBeUndefined 只匹配 undefined
// toBeDefined 与 toBeUndefined 相反
// toBeTruthy 匹配任何 if 语句为真
// toBeFalsy 匹配任何 if 语句为假

// test('two plus two is four', () => {
//   expect(2 + 2).toBe(4);
// });

// test('object assignment', () => {
//   const data = {one: 1};
//   data['two'] = 2;
//   expect(data).toEqual({one: 1, two: 2});
// });

// test('add positive numbers is not zero', () => {
//   for (let a = 1; a < 10; a++) {
//     for (let b = 1; b < 10; b++) {
//       expect(a + b).not.toBe(0)
//     }
//   }
// });

// test('null', () => {
//   const n = null;
//   expect(n).toBeNull();
//   // expect(n).toBeUndefined();
//   // expect(n).not.toBeUndefined();
//   // expect(n).not.toBeTruthy();
//   // expect(n).toBeFalsy();
// });

// test('zero', () => {
//   const z = 0;
//   expect(z).not.toBeNull();
//   // expect(z).toBeUndefined();
//   expect(z).not.toBeUndefined();
//   expect(z).not.toBeTruthy();
//   expect(z).toBeFalsy();
// });


/* 数字 */

// test('two plus two', () => {
//   const value = 2 + 2;
//   expect(value).toBeGreaterThan(3); //大于
//   expect(value).toBeGreaterThanOrEqual(3.5); //大于或等于
//   expect(value).toBeLessThan(5); //小于
//   expect(value).toBeLessThanOrEqual(4.5) //小于或等于

//   expect(value).toBe(4); //等于， 浮点数相加有舍入误差
//   expect(value).toEqual(4); //等于
// });

// test('两个浮点数字相加', () => {
//   const value = 0.1 + 0.2;
//   expect(value).toBe(0.3); //这句会报错，因为浮点数有舍入误差
//   expect(value).toBeCloseTo(0.3);
// });


/* 字符串 */

// test('there is no I in team', () => {
//   expect('team').not.toMatch(/I/);
// });

// test('but ther is a "stop" in Christoph', () => {
//   expect('Christoph').toMatch(/stop/);
// });

/* 数组 */

// const shoppingList = [
//   'diapers',
//   'kleenex',
//   'trash bags',
//   'paper towels',
//   'beer'
// ];
// test('购物清单（shoppingList）里面有啤酒（beer）', () => {
//   expect(shoppingList).toContain('beer');
// });

// function compileAndroidCode() {
//   throw new ConfigError('you are using the wrong JDK');
// }
// test('compiling android goes as expected', () => {
//   // expect(compileAndroidCode()).toThrow();
//   // expect(compileAndroidCode()).toThrow(ConfigError);

//   expect(compileAndroidCode()).toThrow('you are using the wrong JDK');
//   expect(compileAndroidCode).toThrow(/JDK/);
// });





/* 异步代码测试 */

// //异步，回调方式
// let fetchData = (callback) => {
//   setTimeout(() => {
//     callback && callback('异步回调');
//   }, 1000);
// }
// test('异步回调', done => {
//   function callback(data) {
//     expect(data).toBe('异步回调');
//     done();
//   }
//   fetchData(callback);
// });

// //异步，Promise
// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('异步回调');
//   }, 1000);
// });
// test('Promise', () => {
//   expect.assertions(1);
//   // return promise.then(data => expect(data).toBe('异步回调')); //成功
//   return promise.catch(e => expect(e).toMatch('error')); //想要Promise拒绝，使用catch方法。
//    //  return expect(promise()).resolves.toBe('异步回调'); //可以在 expect 语句里使用 .resolves 匹配器
//    //  return expect(promise()).rejects.toMatch('error'); //要Promise拒绝，使用catch方法。
// });

// test('Promise', () => {
//   expect.assertions(1);
//   const data = await promise();
//   return expect(data).toBe('异步回调'); //成功

//   try {
//     await promise();
//   } catch(e) {
//     expect(e).toMatch('error') //想要Promise拒绝，使用catch方法。
//   }
//     await expect(promise()).resolves.toBe('异步回调'); //可以在 expect 语句里使用 .resolves 匹配器
//     await expect(promise()).rejects.toMatch('error'); //要Promise拒绝，使用catch方法。
// });

/*  Setup and Teardown  */

// // 如果你有一些要为多次测试做一些重复性的工作，你可以使用 beforeEach 和 afterEach。
// beforeEach(()=>{
//   initializeCityDatabase();
// });

// afterEach(() => {
//   clearCityDatabase();
// });

// test('city database has Vienna', () => {
//   expect(isCity('Vieena')).toBeTruthy();
// });

// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// //一次性设置
// beforeAll(() => {
//   return initializeCityDatabase();
// });

// afterAll(() => {
//   return clearCityDatabase();
// });

// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });

// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });


// // 作用域：describe 块里将测试分成许多组
// // Applies to all tests in this file
// beforeEach(() => {
//   return initializeCityDatabase();
// });

// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });

// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// describe('matching cities to foods', () => {
//   // Applies only to tests in this describe block
//   beforeEach(() => {
//     return initializeFoodDatabase();
//   });

//   test('Vienna <3 sausage', () => {
//     expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
//   });

//   test('San Juan <3 plantains', () => {
//     expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
//   });
// });


// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// test('', () => console.log('1 - test'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
//   test('', () => console.log('2 - test'));
// });

// // 1 - beforeAll
// // 1 - beforeEach
// // 1 - test
// // 1 - afterEach
// // 2 - beforeAll
// // 1 - beforeEach
// // 2 - beforeEach
// // 2 - test
// // 2 - afterEach
// // 1 - afterEach
// // 2 - afterAll
// // 1 - afterAll


// test.only('this will be the only test that runs', () => {
//   expect(true).toBe(false);
// });
// test('this test will not run', () => {
//   expect('A').toBe('A');
// });






/*   Mock Functions   */

// const forEach = (items, callback) => {
//   for (let index = 0; index < items.length; index++) {
//     callback(items[index]);
//   }
// }

// const mockCallback = jest.fn();
// forEach([0, 1], mockCallback);

// //此模拟函数被调用了两次
// expect(mockCallback.mock.calls.length).toBe(2);

// // 第一次调用函数时的第一个参数是 0
// expect(mockCallback.mock.calls[0][0]).toBe(0);

// // 第二次调用函数时的第一个参数是 1
// expect(mockCallback.mock.calls[1][0]).toBe(1);


// const myMock = jest.fn();
// console.log(myMock());
// // > undefined

// myMock
//   .mockReturnValueOnce(10)
//   .mockReturnValueOnce('x')
//   .mockReturnValue(true);

// console.log(myMock(), myMock(), myMock(), myMock());

