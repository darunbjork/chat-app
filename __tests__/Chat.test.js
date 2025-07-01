const { generateReference } = require('../components/Chat');

test('generateReference returns string ending with -image.png', () => {
  const ref = generateReference('path/to/image.png');
  expect(ref).toMatch(/-image\.png$/);
});
