function sumSmallest(arr) {
  var smallest = arr[0];
  var smallest2 = arr[1];

  if (smallest > smallest2) {
    smallest = smallest + smallest2;
    smallest2 = smallest - smallest2;
    smallest = smallest - smallest2;
  }

  for (var i = 2; i <= arr.length - 1; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    } else if (arr[i] < smallest2) {
      smallest2 = arr[i];
    }
  }

  return smallest + smallest2;
}

console.log(sumSmallest([20, 11, 5, 7]));
