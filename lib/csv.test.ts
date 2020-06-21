import CSV from './csv';

const csvStringTest = `
name,age,gender,height
carlos,18,male,1.70
carlos,18,male,1.70
carlos,18,male,1.70
`.trim();

test('it must obtain the labels of the first line of the input', () => {
  const csv = new CSV();
  csv.readString(csvStringTest, { labels: 'first-line' });

  expect(csv.labels).toStrictEqual(['name', 'age', 'gender', 'height']);
});

test('it should generate labels as an array of numbered strings with the index', () => {
  const csv = new CSV();
  csv.readString(csvStringTest, { labels: 'auto' });

  expect(csv.labels).toStrictEqual(['0', '1', '2', '3']);
});

test('it should generate labels with the array passed as a parameter', () => {
  const csv = new CSV();
  csv.readString(csvStringTest, {
    labels: ['Name', 'Age', 'Gender', 'Height'],
  });

  expect(csv.labels).toStrictEqual(['Name', 'Age', 'Gender', 'Height']);
});

test('it should generate an error when the array of labels is not the correct size', () => {
  const csv = new CSV();

  expect(() =>
    csv.readString(csvStringTest, {
      labels: ['Name', 'Age', 'Gender'],
    }),
  ).toThrow();
});

test('it should generate a list with an array of labels in the first position', () => {
  const csv = new CSV();
  csv.readString(csvStringTest, { labels: 'first-line' });

  const result = csv.toJSON();
  expect(result[0]).toStrictEqual(['name', 'age', 'gender', 'height']);
});
