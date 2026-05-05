export default class Isaac {
    private readonly memory = new Int32Array(256);
    private readonly results = new Int32Array(256);
    private count = 0;
    private accumulator = 0;
    private lastResult = 0;
    private counter = 0;

    constructor(seed: number[]) {
        for (let i = 0; i < seed.length; i++) {
            this.results[i] = seed[i] | 0;
        }

        this.init();
    }

    nextInt(): number {
        if (this.count-- === 0) {
            this.generate();
            this.count = 255;
        }

        return this.results[this.count] | 0;
    }

    nextByte(): number {
        return this.nextInt() & 0xFF;
    }

    private init(): void {
        let a = 0x9E3779B9 | 0;
        let b = 0x9E3779B9 | 0;
        let c = 0x9E3779B9 | 0;
        let d = 0x9E3779B9 | 0;
        let e = 0x9E3779B9 | 0;
        let f = 0x9E3779B9 | 0;
        let g = 0x9E3779B9 | 0;
        let h = 0x9E3779B9 | 0;

        const mix = () => {
            a ^= b << 11; d = d + a | 0; b = b + c | 0;
            b ^= c >>> 2; e = e + b | 0; c = c + d | 0;
            c ^= d << 8; f = f + c | 0; d = d + e | 0;
            d ^= e >>> 16; g = g + d | 0; e = e + f | 0;
            e ^= f << 10; h = h + e | 0; f = f + g | 0;
            f ^= g >>> 4; a = a + f | 0; g = g + h | 0;
            g ^= h << 8; b = b + g | 0; h = h + a | 0;
            h ^= a >>> 9; c = c + h | 0; a = a + b | 0;
        };

        for (let i = 0; i < 4; i++) {
            mix();
        }

        for (let i = 0; i < 256; i += 8) {
            a = a + this.results[i] | 0;
            b = b + this.results[i + 1] | 0;
            c = c + this.results[i + 2] | 0;
            d = d + this.results[i + 3] | 0;
            e = e + this.results[i + 4] | 0;
            f = f + this.results[i + 5] | 0;
            g = g + this.results[i + 6] | 0;
            h = h + this.results[i + 7] | 0;
            mix();
            this.memory[i] = a; this.memory[i + 1] = b; this.memory[i + 2] = c; this.memory[i + 3] = d;
            this.memory[i + 4] = e; this.memory[i + 5] = f; this.memory[i + 6] = g; this.memory[i + 7] = h;
        }

        for (let i = 0; i < 256; i += 8) {
            a = a + this.memory[i] | 0;
            b = b + this.memory[i + 1] | 0;
            c = c + this.memory[i + 2] | 0;
            d = d + this.memory[i + 3] | 0;
            e = e + this.memory[i + 4] | 0;
            f = f + this.memory[i + 5] | 0;
            g = g + this.memory[i + 6] | 0;
            h = h + this.memory[i + 7] | 0;
            mix();
            this.memory[i] = a; this.memory[i + 1] = b; this.memory[i + 2] = c; this.memory[i + 3] = d;
            this.memory[i + 4] = e; this.memory[i + 5] = f; this.memory[i + 6] = g; this.memory[i + 7] = h;
        }

        this.generate();
        this.count = 256;
    }

    private generate(): void {
        this.lastResult = this.lastResult + ++this.counter | 0;

        for (let i = 0; i < 256; i++) {
            const x = this.memory[i];
            switch (i & 3) {
                case 0: this.accumulator ^= this.accumulator << 13; break;
                case 1: this.accumulator ^= this.accumulator >>> 6; break;
                case 2: this.accumulator ^= this.accumulator << 2; break;
                case 3: this.accumulator ^= this.accumulator >>> 16; break;
            }

            this.accumulator = this.accumulator + this.memory[(i + 128) & 0xFF] | 0;
            const y = this.memory[i] = this.memory[(x >>> 2) & 0xFF] + this.accumulator + this.lastResult | 0;
            this.results[i] = this.lastResult = this.memory[(y >>> 10) & 0xFF] + x | 0;
        }
    }
}
