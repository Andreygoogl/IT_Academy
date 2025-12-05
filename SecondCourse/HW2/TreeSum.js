const TreeSum = arr => {
    let sum = 0
    for (let i = 0;i < arr.length;i++) {
        if (Array.isArray(arr[i])) {
            sum += TreeSum(arr[i]) 
        } else if (typeof(arr[i]) == "number") {
            sum += arr[i]
        }
    }
    return sum
}
console.log(TreeSum([5, 7, [4, [2], 8, [1,3], 2], [9, []], 1, 8]))