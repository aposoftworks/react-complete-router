//Components
import Router 	from '../modules/Router';
import Route 	from "../modules/Route";
import Link 	from "../modules/Link";
import Switch 	from "../modules/Switch";

//Guards
import when 		from '../guards/when';
import guest 		from '../guards/guest';
import logged 		from '../guards/logged';

describe('Components present', () => {
	it('Router', () => {
		expect(Router).toBeTruthy();
	});

	it('Route', () => {
		expect(Route).toBeTruthy();
	});

	it('Link', () => {
		expect(Link).toBeTruthy();
	});

	it('Switch', () => {
		expect(Switch).toBeTruthy();
	});
});

describe("Guard methods", () => {

	//When

	it("When guard (truthy)", () => {
		const guarddata = {route:{when:true}, router:{}, context:{}};

		expect(when(null, guarddata)).toBeTruthy();
	});

	it("When guard (falsy)", () => {
		const guarddata = {route:{when:false}, router:{}, context:{}};

		expect(when(null, guarddata)).toBeFalsy();
	});

	//Guest

	it("Guest guard (truthy, doesn't contains auth)", () => {
		const guarddata = {route:{}, router:{}, context:{}};

		expect(guest(null, guarddata)).toBeTruthy();
	});

	it("Guest guard (truthy, contains auth field, but not logged)", () => {
		const guarddata = {route:{}, router:{auth:null}, context:{}};

		expect(guest(null, guarddata)).toBeTruthy();
	});

	it("Guest guard (falsy, contains auth field)", () => {
		const guarddata = {route:{}, router:{auth:{id:2}}, context:{}};

		expect(guest(null, guarddata)).toBeFalsy();
	});

	//Logged

	it("Logged guard (falsy, doesn't contains auth)", () => {
		const guarddata = {route:{}, router:{}, context:{}};

		expect(logged(null, guarddata)).toBeFalsy();
	});

	it("Logged guard (falsy, contains auth field, but not logged)", () => {
		const guarddata = {route:{}, router:{auth:null}, context:{}};

		expect(logged(null, guarddata)).toBeFalsy();
	});

	it("Logged guard (truthy, contains auth field)", () => {
		const guarddata = {route:{}, router:{auth:{id:2}}, context:{}};

		expect(logged(null, guarddata)).toBeTruthy();
	});
});
