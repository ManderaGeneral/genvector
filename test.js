/**
 * @jest-environment jsdom
 */

// https://jestjs.io/docs/configuration#testenvironment-string

const vec2 = require("./vec2").vec2;

test("Vec2 initializing", () => {
    expect(vec2().x).toBe(0);
    expect(vec2().y).toBe(0);

    expect(vec2(2).x).toBe(2);
    expect(vec2(2).y).toBe(2);

    expect(vec2(-3.2).x).toBe(-3.2);
    expect(vec2(-3.2).y).toBe(-3.2);

    expect(vec2(1, 2).x).toBe(1);
    expect(vec2(1, 2).y).toBe(2);
})

test("Vec2 equals", () => {
    let a = vec2(1, 2);
    let b = vec2(3, 4);

    expect(a.equals(b)).toBe(false);
    expect(a.equals(a)).toBe(true);

    a.x = 3;
    expect(a.equals(b)).toBe(false);

    a.y = 4;
    expect(a.equals(b)).toBe(true);

    a.x = 1;
    expect(a.equals(b)).toBe(false);
})

test("Vec2 add", () => {
    let a = vec2(1, 2);
    let b = vec2(3, 4);
    let c = a.add(b);
    let d = a.add(-4, 10);

    expect(c.equals(4, 6)).toBe(true);
    expect(d.equals(-3, 12)).toBe(true);
})

test("Vec2 sub", () => {
    let a = vec2(1, 2);
    let b = vec2(3, 4);
    let c = a.sub(b);
    let d = a.sub(4, 1);

    expect(c.equals(-2)).toBe(true);
    expect(d.equals(-3, 1)).toBe(true);
})

test("Vec2 mul", () => {
    let a = vec2(1, 2);
    let b = vec2(3, 4);
    let c = a.mul(b);
    let d = a.mul(2);
    let e = a.mul(4, 3);

    expect(c.equals(3, 8)).toBe(true);
    expect(d.equals(2, 4)).toBe(true);
    expect(e.equals(4, 6)).toBe(true);
})

test("Vec2 div", () => {
    let a = vec2(3, 8);
    let b = vec2(3, 4);
    let c = a.div(b);
    let d = a.div(2);
    let e = a.div(3, -2);

    expect(c.equals(1, 2)).toBe(true);
    expect(d.equals(1.5, 4)).toBe(true);
    expect(e.equals(1, -4)).toBe(true);
})

test("Vec2 min", () => {
    let a = vec2(3, 4);
    let b = vec2(2, 5);
    expect(a.min(b).equals(2, 4)).toBe(true);
    expect(a.min().equals()).toBe(true);
    expect(a.min(-1, -2.5).equals(-1, -2.5)).toBe(true);
})

test("Vec2 max", () => {
    let a = vec2(3, 4);
    let b = vec2(2, 5);
    expect(a.max(b).equals(3, 5)).toBe(true);
    expect(a.max().equals(3, 4)).toBe(true);
    expect(a.max(4, -2.5).equals(4)).toBe(true);
})

test("Vec2 distance", () => {
    let a = vec2(3, 4);
    let b = vec2(6, 8);
    expect(a.distance(b)).toBe(5);
    expect(a.distance()).toBe(5);
    expect(vec2(1).distance(2, 1)).toBe(1);
    expect(vec2(1).distance(0, 1)).toBe(1);
})

test("Vec2 round", () => {
    expect(vec2(3.2, 4.5).round().equals(3, 5)).toBe(true);
})

test("Vec2 ceil", () => {
    expect(vec2(3.2, 4.5).ceil().equals(4, 5)).toBe(true);
})

test("Vec2 floor", () => {
    expect(vec2(3.2, 4.5).floor().equals(3, 4)).toBe(true);
})

test("Vec2 length", () => {
    expect(vec2(0, 2).length()).toBe(2);
})

test("Vec2 toString", () => {
    expect(vec2(3.2, 4.5).toString()).toContain("3.2");
    expect(vec2(3.2, 4.5).toString()).toContain("4.5");
})
