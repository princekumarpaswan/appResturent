const { sum } = require("../sum")

test("sum function should calculate the sum of two functions", () => {

    const result = sum(4, 3)


    // line number 9 is known as assertion
    expect(result).toBe(7);

})