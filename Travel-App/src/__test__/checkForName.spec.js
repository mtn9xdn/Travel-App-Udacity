import { checkForName } from "../client/js/nameChecker";

describe("checkForName", () => {
    let errorMessageCityName;
    let errorMessageDate;

    beforeAll(() => {
        global.alert = jest.fn();

        // Mock the DOM elements
        document.body.innerHTML = `
        <p class="error message-cityname">Error Message</p>
        <p class="error message-date">Error Message</p>
        `;

        errorMessageCityName = document.querySelector(".message-cityname");
        errorMessageDate = document.querySelector(".message-date");
    });

    afterEach(() => {
        jest.clearAllMocks();
        const errorMessageCityName = document.querySelector(".message-cityname");
        const errorMessageDate = document.querySelector(".message-date");

        // Reset style.visibility and textContent
        if (errorMessageCityName) {
            errorMessageCityName.textContent = "";
            errorMessageCityName.style.visibility = "hidden";
        }

        if (errorMessageDate) {
            errorMessageDate.textContent = "";
            errorMessageDate.style.visibility = "hidden";
        }
    });

    test("Should return true for valid inputs", () => {
        const currentDate = new Date();
        expect(checkForName("hanoi", `${currentDate}`)).toBe(true);

        expect(errorMessageCityName.style.visibility).toBe("hidden");
        expect(errorMessageDate.style.visibility).toBe("hidden");
    });

    test("Should return false when empty city name input", () => {
        const currentDate = new Date();
        expect(checkForName("", `${currentDate}`)).toBe(false);

        expect(errorMessageCityName.textContent).toBe("Please enter City Name !");
        expect(errorMessageCityName.style.visibility).toBe("visible");
        expect(errorMessageDate.style.visibility).toBe("hidden");
    });

    test("Should return false when empty date input", () => {
        expect(checkForName("hanoi", "")).toBe(false);

        expect(errorMessageCityName.style.visibility).toBe("hidden");
        expect(errorMessageDate.textContent).toBe("Please enter Date !");
        expect(errorMessageDate.style.visibility).toBe("visible");
    });

    test("Should return false when city name with special characters", () => {
        const currentDate = new Date();
        expect(checkForName("hanoi@", `${currentDate}`)).toBe(false);

        expect(errorMessageCityName.style.visibility).toBe("visible");
        expect(errorMessageCityName.textContent).toBe("City names do not contain special characters or numbers");
        expect(errorMessageDate.style.visibility).toBe("hidden");
    });
})