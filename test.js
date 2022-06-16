/**
 * @jest-environment jsdom
 */

// https://jestjs.io/docs/configuration#testenvironment-string


const Vec2 = require("./vec2");

test("hii", () => {
    expect(new Vec2(2).x).toBe(2);
})
