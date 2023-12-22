const shuffle = require("../src/shuffle");
const botsData = require("../src/botsData");

describe("shuffle should return array type of correct size", () => {
  
  test('shuffle returns an array', () => {
    const shuffledBotsData = shuffle(botsData)
    expect(Array.isArray(shuffledBotsData)).toEqual(true)
  })

  test('shuffle returns correct array size', () => {
    const shuffledBotsData = shuffle(botsData)
    expect(shuffledBotsData).toHaveLength(botsData.length)
  })
  
});
