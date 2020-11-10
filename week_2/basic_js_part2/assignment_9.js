function mergeArrays(arr1, arr2) {
  var arr = [];
  while (arr1.length !== 0 || arr2.length !== 0) {
    if (arr1[0] <= arr2[0]) {
      if (arr1[0] !== arr[arr.length - 1]) {
        arr.push(arr1[0]);
      }
      arr1.shift();
    } else if (arr1[0] > arr2[0]) {
      if (arr2[0] !== arr[arr.length - 1]) {
        arr.push(arr2[0]);
      }
      arr2.shift();
    } else {
      if (arr1[0] > arr[arr.length - 1]) {
        arr.push(arr1[0]);
      } else if (arr2[0] > arr[arr.length - 1]) {
        arr.push(arr2[0]);
      }
      arr1.shift();
      arr2.shift();
    }
  }

  return arr;
}

arr1 = [1, 3, 5, 7, 9, 11, 12];
arr2 = [1, 3, 3, 4, 5, 10, 13];
console.log(mergeArrays(arr1, arr2));
