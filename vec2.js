

class Vec2 {
    constructor(x, y = null) {
        if (x.hasOwnProperty("x")) {
            y = x.y;
            x = x.x;
        }
        else if (typeof x === "string" && x.indexOf(",") !== -1) {
            const split = x.split(",");
            x = split[0];
            y = split[1];
        }
        this.x = parseFloat(x);
        this.y = parseFloat(y === null ? x : y);
    }

    add(x, y) {
        const vec2 = new Vec2(x, y);
        return new Vec2(this.x + vec2.x, this.y + vec2.y);
    }

    sub(x, y) {
        const vec2 = new Vec2(x, y);
        return new Vec2(this.x - vec2.x, this.y - vec2.y);
    }

    mul(x, y) {
        const vec2 = new Vec2(x, y);
        return new Vec2(this.x * vec2.x, this.y * vec2.y);
    }

    div(x, y) {
        const vec2 = new Vec2(x, y);
        return new Vec2(this.x / vec2.x, this.y / vec2.y);
    }

    equals(x, y) {
        const vec2 = new Vec2(x, y);
        return this.x === vec2.x && this.y === vec2.y;
    }

    min(x, y) {
        const vec2 = new Vec2(x, y);
        return new Vec2(Math.min(this.x, vec2.x), Math.min(this.y, vec2.y));
    }

    max(x, y) {
        const vec2 = new Vec2(x, y);
        return new Vec2(Math.max(this.x, vec2.x), Math.max(this.y, vec2.y));
    }

    distance(x, y) {
        const vec2 = new Vec2(x, y);
        return this.sub(vec2).length();
    }

    round() {
        return new Vec2(Math.round(this.x), Math.round(this.y));
    }

    ceil() {
        return new Vec2(Math.ceil(this.x), Math.ceil(this.y));
    }

    floor() {
        return new Vec2(Math.floor(this.x), Math.floor(this.y));
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toString() {
        return this.x + "," + this.y;
    }
}



let _Vec2GlobalStuff = {};
_Vec2GlobalStuff.previousTouchVec2 = null;
_Vec2GlobalStuff.pinchDistance = null;


// Touch isn't supported by Jest jsdom environment
// https://github.com/jsdom/jsdom/issues/2152
if (window.Touch !== undefined) {
    Touch.prototype.vec2 = function () {
        return new Vec2(
            this.pageX,
            this.pageY
        );
    }
}

Event.prototype.pinchAmount = function () {
    if (this.touches && this.touches.length === 2) {
        const a = this.touches.item(0).vec2();
        const b = this.touches.item(1).vec2();
        const distance = a.distance(b);
        const oldDistance = _Vec2GlobalStuff.pinchDistance;
        const amount = distance - oldDistance;
        _Vec2GlobalStuff.pinchDistance = distance;
        if (oldDistance !== null) {
            return amount;
        }
    } else {
        _Vec2GlobalStuff.pinchDistance = null;
    }
    return 0;
}

Event.prototype.vec2 = function () {
    if (this.touches) {
        if (this.touches.length === 0) {
            return _Vec2GlobalStuff.previousTouchVec2;
        }
        let vec2 = new Vec2(0);
        for (const touch of this.touches) {
            vec2 = vec2.add(touch.vec2());
        }
        vec2 = vec2.div(this.touches.length);

        _Vec2GlobalStuff.previousTouchVec2 = vec2;
        return vec2;
    }
    return new Vec2(
        this.pageX,
        this.pageY
    );
};


Element.prototype.getPos = function (topLeft = false) {
    let pos = new Vec2(this.style.left, this.style.top);
    if (!topLeft) pos = pos.add(this.getFullSize().div(2));
    return pos;
}

Element.prototype.getGlobalPos = function (topLeft = false) {
    const rect = this.getBoundingClientRect();
    let pos = new Vec2(rect.left + this.clientLeft, rect.top + this.clientTop);
    if (!topLeft) pos = pos.add(this.getFullSize().div(2));
    return pos;
}

Element.prototype.setPos = function (vec2, topLeft = false) {
    vec2 = new Vec2(vec2);
    if (!topLeft) {
        vec2 = vec2.sub(this.getFullSize().div(2))
    }

    this.style.left = vec2.x + "px";
    this.style.top = vec2.y + "px";
}

Element.prototype.getSize = function () {
    return new Vec2(this.style.width || this.clientWidth, this.style.height || this.clientHeight);
}

Element.prototype.getFullSize = function () {
    return new Vec2(this.offsetWidth, this.offsetHeight);
}

Element.prototype.setSize = function (vec2) {
    vec2 = new Vec2(vec2);
    this.style.width = vec2.x + "px";
    this.style.height = vec2.y + "px";
}



module.exports = Vec2;
