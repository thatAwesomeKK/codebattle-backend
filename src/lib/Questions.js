const Questions = [
  {
    id: 1,
    title: "Two Sum",
    content: [
      {
        span: 1.1,
        text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      },
      {
        span: 1.2,
        text: "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      },
      {
        span: 1.3,
        text: "You can return the answer in any order.",
      },
    ],
    input: [
      {
        nums: "[2,7,11,15]",
        target: "9",
      },
    ],
    output: [
      {
        desiredOutput: "[ 0, 1 ]",
      },
    ],
    template: "const twoSum = function(nums, target) {}; console.log(twoSum(nums, target));",
  },
  {
    id: 2,
    title: "Binary Search",
    content: [
      {
        span: 2.1,
        text: "Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.",
      },
      {
        span: 2.2,
        text: "You must write an algorithm with O(log n) runtime complexity.",
      },
    ],
    input: [
      {
        nums: "[-1,0,3,5,9,12]",
        target: "9",
      },
    ],
    output: [
      {
        desiredOutput: "4\n",
      },
    ],
    template:
      "const search = function(nums, target) {}; console.log(search(nums, target));",
  },
  {
    id: 3,
    title: "Majority Element",
    content: [
      {
        span: 3.1,
        text: "Given an array nums of size n, return the majority element.",
      },
      {
        span: 3.2,
        text: "The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
      },
    ],
    input: [
      {
        nums: "[2,2,1,1,1,2,2]",
      },
    ],
    output: [
      {
        desiredOutput: "2\n",
      },
    ],
    template: "const majorityElement = function(nums) {}; console.log(majorityElement(nums));",
  },
];

export default Questions;
