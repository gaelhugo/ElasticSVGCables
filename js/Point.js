export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.point = { x: x, y: y };
  }
  getDistance(point) {
    return Math.sqrt(
      Math.pow(point.x - this.point.x, 2) + Math.pow(point.y - this.point.y, 2)
    );
  }
  subtract(point) {
    const x = this.point.x - point.x;
    const y = this.point.y - point.y;
    return new Point(x, y);
  }
}
