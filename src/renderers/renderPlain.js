const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const genDot = level => (level ? '.' : '');
const actions = {
  parent: (data, nameLevel, func) => func(data.children, `${nameLevel}${genDot(nameLevel)}${data.key}`),
  added: (data, nameLevel) => `Property '${nameLevel}${genDot(nameLevel)}${data.key}' was added with value ${stringify(data.value)}`,
  deleted: (data, nameLevel) => `Property '${nameLevel}${genDot(nameLevel)}${data.key}' was removed`,
  unchanged: () => '',
  changed: (data, nameLevel) => `Property '${nameLevel}${genDot(nameLevel)}${data.key}' was updated. From ${stringify(data.valueBefore)} to ${stringify(data.valueAfter)}`,
};

const render = (data) => {
  const renderAst = (ast, nameLevel = '') => (
    ast.map(item => actions[item.type](item, nameLevel, renderAst))
      .filter(el => el)
      .join('\n')
  );
  return renderAst(data).trim();
};

export default render;
