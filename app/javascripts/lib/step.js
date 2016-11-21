export default xs => {
  xs.push(xs.shift());
  return xs;
};
