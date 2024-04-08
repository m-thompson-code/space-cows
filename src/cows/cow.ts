export const cows: Cow[] = [];

const getScale = () => {
    const seed = (Math.random() * 0.95) ** 2 + 0.05;

    if (cows.length < 100) {
        return seed;
    }

    return seed / Math.pow(cows.length / 100, 3/5)
}

export class Cow {
    constructor(public x = 0, public y = Math.random(), public scale = getScale()) {
        cows.push(this);
    }

    should = {
        delete: () => this.x >= 1
    };

    move(): void {
        this.x += (0.2 * this.scale + 0.2) / 60;
    }

    delete(): void {
        const index = cows.findIndex((cow => cow === this));

        if (index === -1) {
            console.error(this, cows);
            throw new Error('rip :(');
        }

        cows.splice(index, 1)
    }
}
