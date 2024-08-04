function mergeArrays(array1, array2) {
  const namesInArray2 = new Set(array2.map((item) => item.name));
  array1.forEach((item) => {
    if (!namesInArray2.has(item.name)) {
      array2.push(item);
      namesInArray2.add(item.name);
    }
  });

  return array2;
}

module.exports = { mergeArrays };
