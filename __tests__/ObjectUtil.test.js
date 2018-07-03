import * as ObjectUtil from '../src/utils/ObjectUtil';

test('ObjectUtil Testing', () =>{
  // expect(ObjectUtil.isNull(null)).toBeTruthy();
  // expect(ObjectUtil.isUndefined(undefined)).toBeTruthy();
  expect(ObjectUtil.isObject('{ }')).toBeTruthy();
});