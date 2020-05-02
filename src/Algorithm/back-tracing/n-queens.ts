// cols[4] === 5, 第4行的皇后在第5列

export class Queens {

    private cols: Array<number>;
    private ways: number;

    public placeNQueens(n: number) {
        if (n < 1) {
            return;
        }
        this.ways = 0;
        this.cols = new Array<number>(n);
        this.place(0);
        console.log(`${n}皇后一共有(${this.ways})种摆法！`);
    }

    private place(row: number) {
        if (row === this.cols.length) {
            this.ways++;
            this.show()
            return;
        }

        for (let col = 0; col < this.cols.length; col++) {
            if (this.isValid(row, col)) {
                this.cols[row] = col;
                this.place(row + 1);
            }
        }
    }

    private show() {
        let scale = this.cols.length;
        for (let row = 0; row < scale; row++) {
            let msg = "";
            for (let col = 0; col < scale; col++) {
                msg += this.cols[row] === col ? "@ " : "- ";
            }
            console.log(msg);
        }
        console.log(`----------------------------`);
    }

    private isValid(row: number, col: number): boolean {
        for (let i = 0; i < row; i++) {
            if (this.cols[i] === col) {
                return false;
            }
            if (row - i === Math.abs(col - this.cols[i])) {
                return false;
            }
        }
        return true;
    }
}

const player = new Queens();

player.placeNQueens(8);