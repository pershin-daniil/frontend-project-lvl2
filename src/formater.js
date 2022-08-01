export const getValue = (obj, key) => obj[key];
const spaces = {
  plus: '  + ',
  minus: '  - ',
  empty: '    ',
};

const getType = (obj) => obj.type;
const getName = (obj) => obj.name;

export const format = (tree) => {
  const resultLines = [];
  tree.forEach((line) => {
    const type = getType(line);
    const name = getName(line);
    switch (type) {
      case 'deleted':
        resultLines.push(`${spaces.minus}${name}: ${getValue(line, 'value')}`);
        break;
      case 'unchanged':
        resultLines.push(`${spaces.empty}${name}: ${getValue(line, 'value')}`);
        break;
      case 'added':
        resultLines.push(`${spaces.plus}${name}: ${getValue(line, 'value')}`);
        break;
      case 'changed':
        resultLines.push(`${spaces.minus}${name}: ${getValue(line, 'value1')}`);
        resultLines.push(`${spaces.plus}${name}: ${getValue(line, 'value2')}`);
        break;
      default:
        break;
    }
  });
  return `{\n${resultLines.join('\n')}\n}`;
};
