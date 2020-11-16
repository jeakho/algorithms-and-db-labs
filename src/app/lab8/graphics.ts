export class Graphics {
    private ctx: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.adjustImageResolution();

        this.ctx = canvas.getContext('2d');
    }

    get fieldHeight(): number {
        return +getComputedStyle(this.canvas).getPropertyValue('height').slice(0, -2);
    }

    get fieldWidth(): number {
        return +getComputedStyle(this.canvas).getPropertyValue('width').slice(0, -2);
    }

    drawLine(xStart: number, yStart: number, xEnd: number, yEnd: number, options?: {
        width?: number,
        color?: string,
        dash?: number[],
        cap?: 'square' | 'round' | 'butt'
    }) {
        this.ctx.lineWidth = options?.width || 1;
        this.ctx.strokeStyle = options?.color || '#000';
        this.ctx.setLineDash(options?.dash || []);
        this.ctx.lineCap = options?.cap || 'butt';

        this.ctx.beginPath();
        this.ctx.moveTo(this.adaptValue(xStart), this.adaptValue(yStart));
        this.ctx.lineTo(this.adaptValue(xEnd), this.adaptValue(yEnd));
        this.ctx.stroke();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.setLineDash([]);
        this.ctx.lineCap = 'butt';
    }

    drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, options?: {
        anticlockwise?: boolean,
        borderWidth?: number,
        color?: string,
        dash?: number[],
        cap?: 'square' | 'round' | 'butt'
    }) {
        this.ctx.lineWidth = options?.borderWidth || 1;
        this.ctx.strokeStyle = options?.color || '#000';
        this.ctx.setLineDash(options?.dash || []);
        this.ctx.lineCap = options?.cap || 'butt';

        this.ctx.beginPath();
        this.ctx.arc(this.adaptValue(x), this.adaptValue(y), this.adaptValue(radius), startAngle, endAngle, options?.anticlockwise == undefined ? true : options.anticlockwise);
        this.ctx.stroke();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.setLineDash([]);
        this.ctx.lineCap = 'butt';
    }

    fillArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, options?: {
        anticlockwise?: boolean,
        borderWidth?: number,
        color?: string,
        dash?: number[],
        cap?: 'square' | 'round' | 'butt'
    }) {
        this.ctx.lineWidth = options?.borderWidth || 1;
        this.ctx.strokeStyle = options?.color || '#000';
        this.ctx.setLineDash(options?.dash || []);
        this.ctx.lineCap = options?.cap || 'butt';

        this.ctx.beginPath();
        this.ctx.arc(this.adaptValue(x), this.adaptValue(y), this.adaptValue(radius), startAngle, endAngle, options?.anticlockwise == undefined ? true : options.anticlockwise);
        this.ctx.fill();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.setLineDash([]);
        this.ctx.lineCap = 'butt';
    }

    fillText(text: string, x: number, y: number, options?: {
        maxWidth?: number
        fontSize?: number,
        fontStyle?: string,
        color?: string,
        horizontalAlign?: "left" | "right" | "center" | "start" | "end";
        verticalAlign?: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";
    }) {
        this.ctx.font = `${options?.fontSize || 10}px ${options?.fontStyle || 'sans-serif'}`;
        this.ctx.fillStyle = options?.color || '#000';
        this.ctx.textAlign = options?.horizontalAlign || 'start';
        this.ctx.textBaseline = options?.verticalAlign || 'alphabetic';

        this.ctx.fillText(text, this.adaptValue(x), this.adaptValue(y), options?.maxWidth == undefined ? this.fieldWidth : options?.maxWidth);

        this.ctx.font = `10px sans-serif`;
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'start';
        this.ctx.textBaseline = 'alphabetic';
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private adjustImageResolution() {
        this.canvas.setAttribute('width', String(this.adaptValue(this.fieldWidth)));
        this.canvas.setAttribute('height', String(this.adaptValue(this.fieldHeight)));
    }

    private adaptValue(value: number) {
        return window.devicePixelRatio * value
    }
}