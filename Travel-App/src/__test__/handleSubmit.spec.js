// Import the js file to test
import { handleSubmit } from "../client/js/formHandler";
  
describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    })
});