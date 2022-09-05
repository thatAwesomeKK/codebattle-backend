function binarySearch(arr, target) {
    let arr  = [1,2,3,4,5]
    for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        for (let j = 0; j < arr.length; j++) {
            if (ele > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
        }
    }
}

module.exports = {binarySearch}