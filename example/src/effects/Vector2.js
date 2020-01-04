
export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    //Methods
    add (arg1, arg2 = null) {
        if (arg1 instanceof Vector2) {
            this.x += arg1.x;
            this.y += arg1.y;
        }
        else {
            this.x += arg1;

            if (arg2 !== null) this.y += arg2;
        }
      
        return this;
    }

    subtract (arg1, arg2 = null) {
        if (arg1 instanceof Vector2) {
            this.x -= arg1.x;
            this.y -= arg1.y;
        }
        else {
            this.x -= arg1;

            if (arg2 !== null) this.y -= arg2;
        }
      
        return this;
    }

    multiply (value) {
        this.x *= value;
        this.y *= value;
      
        return this;
    }

    divide (value) {
        this.x /= value;
        this.y /= value;
      
        return this;
    }

    copy () {
        return new Vector2(this.x, this.y);
    }
}