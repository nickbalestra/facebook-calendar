export default (container, component) => props =>
  container(Object.assign({}, props, { render: component }));
