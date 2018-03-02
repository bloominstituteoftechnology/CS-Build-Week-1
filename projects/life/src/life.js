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
        this.isGun = false;
        this.stepCount = 0;
    }
    rotate = (x, y, radians) => {    
        y = Math.round(y * Math.cos(radians) + x * Math.sin(radians));
        x = Math.round(-y * Math.sin(radians) + x * Math.cos(radians));
        return [x, y]
    }
    rotate_glider_gun = () => {
        // this.clear();
        const lines = glider_gun_text.split('\n');
        // console.log(`gun lines: ${lines.length}`);
        let y = Math.floor((this.height - lines.length - 50));
        let x = Math.floor((this.width - 87) );
        const currentBuffer = this.buffer[this.currentBufferIndex];
        for (let bl = y-10;bl < y+ 32;bl++) 
            for (let bx = x -10;bx<x+37+10;bx++)
                currentBuffer[bl][bx] = 0;
        x+=15;
        y+=10;
        lines.forEach((t, l) => {
            for (let i = 0; i < t.length; i++) {
                const [rx, ry] = this.rotate(i, l, Math.PI);
                if (y + ry > this.height)
                    console.log(`height out of bounds y: ${y}  ry: ${ry}`);
                if (x + rx > this.width)
                    console.log(`width out of bounds x: ${x}  rx: ${rx}`);
                if (y + ry <= 0)
                    console.log(`height out of bounds y: ${y}  ry: ${ry}`);
                if (x + rx <= 0)
                    console.log(`width out of bounds x: ${x}  rx: ${rx}`);
                currentBuffer[y + ry][x + rx] = (t[i] === '*' ? 1 : 0);
            }
        });
    }
    glider_gun = (x, y) => {
        this.isGun = true;
        // if ((this.stepCount % 2) === 0)
        //     return 
        this.rotate_glider_gun();
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
        // const [ex, ey] = this.exclusionZone;
        const sendGun = Math.floor(Math.random() * 1.1);
        if (sendGun === 0 && this.isGun && (this.stepCount % 45) === 0)
            this.glider_gun();
        this.stepCount++;
        const isAlive = (cell, x, y) => {
            let wrapped = false;
            const wrap = (v, d) => {
                if (v < 0) {
                    wrapped = true;
                    return d + v;
                }
                if (v >= d) {
                    wrapped = true;
                    return v - d;
                }
                return v;
            }
            let n = 0;
            // let after = 0
            for (let i = y - 1; i < y + 2; i++)
                for (let j = x - 1; j < x + 2; j++) {
                    if (i === y && j === x)
                        continue;
                    const I = wrap(i, this.height)
                    const J = wrap(j, this.width)
                    if (currentBuffer[I][J] > 0) {
                        n++;
                        if (currentBuffer[I][J] > 1)
                            wrapped = true;
                    }
                };
            switch (n) {
                case 0:
                case 1: return [false, false]
                case 2: return [cell > 0, cell > 1]
                case 3: return (cell > 0 ? [true, cell > 1] : [true, wrapped])
                default: return [false,false]
            }

        }
        this.forEachCell((cell, x, y) => {
            try {
            const [alive, wrapped] = isAlive(cell, x, y);
            backBuffer[y][x] = alive ? (wrapped ? 2 : 1) : 0;
            }
            catch(error) {
                console.log(`isAlive: ${isAlive(cell,x,y)}`);
            }
            return cell;
        });
        this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    }
}

export default Life;