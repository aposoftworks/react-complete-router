//Helpers
import { testPath } from "../helpers/route";

describe("Path algorythm", () => {
	//Test 1
	// current: [/] and route: [/]
	it("current: [/] and route: [/] (exact:true)", () => {
		expect(testPath("/", "/", true)).toBeTruthy();
	});

	it("current: [/] and route: [/] (exact:false)", () => {
		expect(testPath("/", "/", false)).toBeTruthy();
	});

	//Test 2
	// current: [/] and route: [/test]
	it("current: [/] and route: [/test] (exact:true)", () => {
		expect(testPath("/", "/test", true)).toBeFalsy();
	});

	it("current: [/] and route: [/test] (exact:false)", () => {
		expect(testPath("/", "/test", false)).toBeFalsy();
	});

	//Test 3
	// current: [/test] and route: [/]
	it("current: [/test] and route: [/] (exact:true)", () => {
		expect(testPath("/test", "/", true)).toBeFalsy();
	});

	it("current: [/test] and route: [/] (exact:false)", () => {
		expect(testPath("/test", "/", false)).toBeTruthy();
	});

	//Test 4
	// current: [/test] and route: [/test]
	it("current: [/test] and route: [/test] (exact:true)", () => {
		expect(testPath("/test", "/test", true)).toBeTruthy();
	});

	it("current: [/test] and route: [/test] (exact:false)", () => {
		expect(testPath("/test", "/test", false)).toBeTruthy();
	});

	//Test 5
	// current: [/] and route: [/{test}]
	it("current: [/] and route: [/{test}] (exact:true)", () => {
		expect(testPath("/", "/{test}", true)).toBeFalsy();
	});

	it("current: [/] and route: [/{test}] (exact:false)", () => {
		expect(testPath("/", "/{test}", false)).toBeFalsy();
	});

	//Test 6
	// current: [/test] and route: [/{test}]
	it("current: [/test] and route: [/{test}] (exact:true)", () => {
		expect(testPath("/test", "/{test}", true)).toBeTruthy();
	});

	it("current: [/test] and route: [/{test}] (exact:false)", () => {
		expect(testPath("/test", "/{test}", false)).toBeTruthy();
	});

	//Test 7
	// current: [/] and route: [/{test?}]
	it("current: [/] and route: [/{test?}] (exact:true)", () => {
		expect(testPath("/", "/{test?}", true)).toBeTruthy();
	});

	it("current: [/] and route: [/{test?}] (exact:false)", () => {
		expect(testPath("/", "/{test?}", false)).toBeTruthy();
	});

	//Test 8
	// current: [/test] and route: [/{test?}]
	it("current: [/test] and route: [/{test?}] (exact:true)", () => {
		expect(testPath("/test", "/{test?}", true)).toBeTruthy();
	});

	it("current: [/test] and route: [/{test?}] (exact:false)", () => {
		expect(testPath("/test", "/{test?}", false)).toBeTruthy();
	});

	//Test 9
	// current: [/test/test] and route: [/test]
	it("current: [/test/testing] and route: [/test] (exact:true)", () => {
		expect(testPath("/test/testing", "/test", true)).toBeFalsy();
	});

	it("current: [/test/testing] and route: [/test] (exact:false)", () => {
		expect(testPath("/test/testing", "/test", false)).toBeTruthy();
	});
});
