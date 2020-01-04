export default function Trail(size, color, position, direction, trailsize, speed, canvas, canvasElement) {
	//Constructor
	this.size 			= size;
	this.color 			= color;
	this.position 		= position;
	this.direction 		= direction;
	this.trailsize 		= trailsize;
	this.speed 			= speed;
	this.canvas 		= canvas;
	this.canvasElement 	= canvasElement;

	//Methods
	this.draw = function () {
		//New position
		this.position.add(this.direction.copy().multiply(this.speed));

		//Trail position
		const trailposition = this.position.copy();
		const length = this.direction.copy().multiply(this.trailsize);
		trailposition.subtract(length);

		//Render
		this.canvas.beginPath();
		this.canvas.moveTo(clamp(this.position.x, 0, this.canvasElement.width), clamp(this.position.y, 0, this.canvasElement.height));
		this.canvas.lineTo(clamp(trailposition.x, 0, this.canvasElement.width), clamp(trailposition.y, 0, this.canvasElement.height));
		this.canvas.strokeStyle = this.color;
		this.canvas.lineWidth = this.size;
		this.canvas.stroke();

		//restart stroke if it's offscreen
		if (trailposition.x > this.canvasElement.width && this.position.x > this.canvasElement.width) {
			this.position.x = 0;
		}
		else if (trailposition.x < 0 && this.position.x < 0) {
			this.position.x = this.canvasElement.width;
		}
		if (trailposition.y > this.canvasElement.height && this.position.y > this.canvasElement.height) {
			this.position.y = 0;
		}
		else if (trailposition.y < 0 && this.position.y < 0) {
			this.position.y = this.canvasElement.height;
		}
	}
}

//Clamp a number
function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}