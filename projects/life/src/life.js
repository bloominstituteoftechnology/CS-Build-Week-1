/**
 * Implemention of a Life
 */

const MODULO = 2;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
    let a = new Array(height);

    for (let i = 0; i < height; i++) {
        a[i] = new Array(width);
    }

    return a;
}
const glider_gun_text = `
........................*
......................*.*
............**......**............**
...........*...*....**............**
**........*.....*...**
**........*...*.**....*.*
..........*.....*.......*
...........*...*
............**
`

/**
 * Life class
 */
class Life {

    /**
     * Constructor
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.currentBufferIndex = 0;
        this.buffer = [
            Array2D(width, height),
            Array2D(width, height)
        ];
        this.clear();
        this.noExclusion = [-1, -1]
        this.exlusionForGun = [79, 22]
        this.exclusionZone = this.noExclusion;
        this.isGun = false
    }
    rotate = (x, y, radians) => {
        const ratio = Math.tan(y,x)  /  Math.tan(Math.atan(y, x) + radians);  // ny/nx    nx = x * (old ratio) / (ratio)
        x *= ratio
        y /= ratio;
        return [x, y]
    }
    rotate_glider_gun = () => {
        this.clear();
        const lines = glider_gun_text.split('\n');
        console.log(`gun lines: ${lines.length}`);
        const y = Math.floor((this.height - lines.length) / 2);
        const x = Math.floor((this.width - 37) / 2);
        const currentBuffer = this.buffer[this.currentBufferIndex];
        lines.forEach((t, l) => {
            for (let i = 0; i < t.length; i++) {
                const [rx, ry] = this.rotate(i, l, Math.PI / 4);
                if (y + ry > this.height)
                    console.log(`height out of bounds y: ${y}  ry: ${ry}`);
                if (x + rx > this.width)
                    console.log(`width out of bounds x: ${x}  rx: ${rx}`);
                if (y + ry <= 0)
                    console.log(`height out of bounds y: ${y}  ry: ${ry}`);
                if (x + rx <= 0)
                    console.log(`width out of bounds x: ${x}  rx: ${rx}`);
                if (x + rx === 181) {
                    console.log(`height out of bounds? y: ${y}  ry: ${ry} l: ${l}`);
                    console.log(`width out of bounds? x: ${x}  rx: ${rx} i: ${i}`);
                }
                currentBuffer[y + ry][x + rx] = (t[i] === '*' ? 1 : 0);
            }
        });
    }
    glider_gun = (x, y) => {

        //return this.rotate_glider_gun();
        // this.clear();
        const lines = glider_gun_text.split('\n');
        // console.log(`gun lines: ${lines.length}`);
        y = y | Math.floor((this.height - lines.length) / 20);
        x = x | Math.floor((this.width - 37) / 20);

        const currentBuffer = this.buffer[this.currentBufferIndex];
        this.exclusionZone = this.exlusionForGun;
        let [ex, ey] = this.exclusionZone;
        // ex += x;
        // ey += y;
        // this.exclusionZone = [ex, ey];
        for (let l = 0; l < ey; l++)
            for (let c = 0; c < ex; c++)
                currentBuffer[l][c] = 0;
        lines.forEach((t, l) => {
            const L = y + l;
            for (let i = 0; i < t.length; i++) {
                currentBuffer[L][x + i] = (t[i] === '*' ? 1 : 0);
            }
        });
        this.isGun = true;
        this.stepCount = 0;
    };
    /**
     * Return the current active buffer
     * 
     * This should NOT be modified by the caller
     */
    getCells() {
        return this.buffer[this.currentBufferIndex];
    }

    /**
     * Clear the Life grid
     */
    clear() {
        this.buffer[this.currentBufferIndex].forEach((row, y) => row.fill(0));//this.buffer[this.currentBufferIndex][y].fill(0));
    }
    addGLider(x, y) {
        let currentBuffer = this.buffer[this.currentBufferIndex];
        if (x === 0 || x === undefined)
            this.clear();
        // console.log(` addGlider input x: ${x} y: ${y}`);
        if (x === 0 || x === undefined) {
            x = Math.floor(Math.random() * (this.width - 8)) + 4;
            y = Math.floor(Math.random() * (this.height - 8)) + 4;
        }
        try {
            currentBuffer[y][x + 2] = 1;
            currentBuffer[y + 1][x + 2] = 1;
            currentBuffer[y + 2][x + 2] = 1;
            currentBuffer[y + 2][x + 1] = 1;
            currentBuffer[y + 1][x] = 1;
        }
        catch (error) {
            console.log(` addGlider error x: ${x} y: ${y}`);
        }
    }

    /**
     * Randomize the Life grid
     */
    randomize() {
        this.forEachCell((cell) => { return Math.floor(Math.random() * MODULO) })
    }
    forEachCell = (f) => {
        this.buffer[this.currentBufferIndex].forEach((row, yi) => {
            row.forEach((cell, xi) =>
                this.buffer[this.currentBufferIndex][yi][xi] = f(cell, xi, yi)
            )
        })
    }
    /**
     * Run the simulation for a single step
     */
    step() {
        let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
        let currentBuffer = this.buffer[this.currentBufferIndex];
        let backBuffer = this.buffer[backBufferIndex];
        const [ex, ey] = this.exclusionZone;
        const sendGun = Math.floor(Math.random() * 1.1);
        if (sendGun === 0 && this.isGun && (this.stepCount % 45) === 0)
            this.glider_gun();
        this.stepCount++;
        const isAlive = (cell, x, y) => {
            const wrap = (v, d) => {
                if (v < 0)
                    return d + v;
                if (v >= d)
                    return v - d;
                return v;
            }
            let n = 0;
            let after = 0
            for (let i = y - 1; i < y + 2; i++)
                for (let j = x - 1; j < x + 2; j++) {
                    if (i === y && j === x)
                        continue;
                    const I = wrap(i, this.height)
                    const J = wrap(j, this.width)
                    if (currentBuffer[I][J] > 0)
                        n++;
                }
            // const ln = n;
            // n = 0;
            // if (x > 0 && currentBuffer[y][x - 1] > 0)
            //     n++;
            // if (y > 0 && currentBuffer[y - 1][x] > 0)
            //     n++;
            // if (x > 0 && y > 0 && currentBuffer[y - 1][x - 1] > 0)
            //     n++;
            // if (x < this.width - 1 && currentBuffer[y][x + 1] > 0) {
            //     n++;
            //     after++
            // }
            // if (y < this.height - 1 && currentBuffer[y + 1][x] > 0) {
            //     n++;
            //     after++
            // }
            // if (x < this.width - 1 && y < this.height - 1 && currentBuffer[y + 1][x + 1] > 0) {
            //     n++;
            //     after++;
            // }
            // if (x > 0 && y < this.height - 1 && currentBuffer[y + 1][x - 1] > 0) {
            //     after++;
            //     n++
            // }
            // if (x < this.width - 1 && y > 0 && currentBuffer[y - 1][x + 1] > 0) {
            //     after++;
            //     n++
            // }
            // console.log(`ln: ${ln}  n: ${n}`);
            switch (n) {
                case 0:
                case 1: return false
                case 2: return cell > 0
                case 3: return (cell > 0 ? true :
                    () => {
                        if (x <= ex && y <= ey && after > 0)
                            return false;
                        if (x <= 1 && y <= ey)
                            return false
                        if (y <= 1 && x <= ex)
                            return false
                        return true;
                    })

                default: return false
            }

        }
        this.forEachCell((cell, x, y) => {
            backBuffer[y][x] = isAlive(cell, x, y) ? 1 : 0;
            return cell;
        });
        this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    }
}

export default Life;