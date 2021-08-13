class KeystrokeLogger {
    #maxCount = 10;

    constructor() {
        this.downKey = 0;
        this.upKey = 0;
        this.leftKey = 0;
        this.rightKey = 0;
    }

    incrementUp() {
        this.upKey += 1;
        this.upKey = this.ceiling(this.upKey, this.#maxCount);
    }
    incrementDown() {
        this.downKey += 1;
        this.downKey = this.ceiling(this.downKey, this.#maxCount);
    }
    incrementLeft() {
        this.leftKey += 1;
        this.leftKey = this.ceiling(this.leftKey, this.#maxCount);
        
    }
    incrementRight() {
        this.rightKey += 1;
        this.rightKey = this.ceiling(this.rightKey, this.#maxCount);
    }

    resetCounts() {
        this.downKey = 0;
        this.upKey = 0;
        this.leftKey = 0;
        this.rightKey = 0;
    }

    ceiling(value, max) {
        if (value > max) {
            return max;
        } else {
            return value;
        }
    }
}