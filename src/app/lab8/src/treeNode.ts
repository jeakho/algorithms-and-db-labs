import { Point } from './point';

export class TreeNode<T> {
    data: T;
    parent: TreeNode<T> | null;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    private selfCoordinates: Point | null = null;
    // private leftChildCoordinates: Point | null = null;
    // private rightChildCoordinates: Point | null = null;
    //private parentCoordinates: Point | null = null;
    private distanceToChild = new Point(150, 150);
    // private nodeRepresenationConfig = {
    //     borderWidth: 3,
    //     radius: 30,
    //     fontSize: 40
    // }
    // private connectionRepresentationConfig = {
    //     width: 1
    // }

    constructor(
        data: T, 
        parent?: TreeNode<T>,
        left?: TreeNode<T>, 
        right?: TreeNode<T>
    ) {
        this.data = data;
        this.parent = parent || null;
        this.left = left || null;
        this.right = right || null;
        //this.coordinates = coordinates;
        // this.parentCoordinates = parentCoordinates;

        // this.distanceToChild = !isRoot ? new Point(
        //     Math.abs(coordinates.X - parentCoordinates.X) / 2,
        //     150
        // ) : new Point(200, 150);
    }

    // drawSelf(): void {
    //     const { X, Y } = this.coordinates;

    //     this.graphics.drawArc(X, Y, this.nodeRepresenationConfig.radius, 0, 2 * Math.PI, { borderWidth: this.nodeRepresenationConfig.borderWidth });
    //     this.graphics.fillText(String(this.data), X, Y, { verticalAlign: 'middle', horizontalAlign: 'center', fontSize: this.nodeRepresenationConfig.fontSize });
    // }

    // drawConnectionToLeftChild(): void {
    //     const { X: XSelf, Y: YSelf } = this.coordinates;
    //     const { X: XLeft, Y: YLeft } = this.getLeftChildCoordinates();
    //     const { X: XToChild, Y: YToChild } = this.distanceToChild;
    //     const { radius: R } = this.nodeRepresenationConfig;

    //     this.graphics.drawLine(
    //         XSelf - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
    //         YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
    //         XLeft + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
    //         YLeft - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
    //         { 
    //             width: this.connectionRepresentationConfig.width 
    //         }
    //     );
    // }

    // drawConnectionToRightChild(): void {
    //     const { X: XSelf, Y: YSelf } = this.coordinates;
    //     const { X: XRight, Y: YRight } = this.getRightChildCoordinates();
    //     const { X: XToChild, Y: YToChild } = this.distanceToChild;
    //     const { radius: R } = this.nodeRepresenationConfig;

    //     this.graphics.drawLine(
    //         XSelf + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
    //         YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
    //         XRight - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
    //         YRight - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
    //         { 
    //             width: this.connectionRepresentationConfig.width 
    //         }
    //     );
    // }

    get coordinates() {
        return this.selfCoordinates;
    }

    set coordinates(value) {
        this.selfCoordinates = value;
    }

    getCoordinates(): Point {
        return this.coordinates;
    }

    setCoordinates(point: Point) {
        this.coordinates = point;
    }

    getLeftChildCoordinates(): Point {
        return new Point(
            this.coordinates.X - this.distanceToChild.X,
            this.coordinates.Y + this.distanceToChild.Y
        );
    }

    getRightChildCoordinates(): Point {
        return new Point(
            this.coordinates.X + this.distanceToChild.X,
            this.coordinates.Y + this.distanceToChild.Y
        );
    }
}