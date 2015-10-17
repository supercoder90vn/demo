/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 reference:
 - install shortcut: https://packagecontrol.io/installation#st3
 - shortcut: https://packagecontrol.io/packages/Jasmine%20JS
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
describe('Some feature', function() {
	describe('#SomeFunction', function() {
		it('should return true when called', function() {
			expect(someFunction()).toEqual(true);			
			expect(someFunction()).toBeTruthy();						
			expect(someFunction()).not.toBeFalsy();
		});
		
		it("returns an array of names", function(){
			expect(anotherFunction()).toContain('jeffrey');
			expect(anotherFunction()).not.toContain('sdfsdf');
		});
	});
	describe("User",function(){
		it("should ensure that the user is 21 or older",function(){
			expect(User.getAge()).toBeGreaterThan(20);			
		})
	});
});