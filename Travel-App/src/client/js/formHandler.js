import { getCity } from "./getCity";

function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let cityNameInput = document.querySelector(".city-name").value;
    let dateInput = document.querySelector(".dateInput").value;

    const isValidCityName = Client.checkForName(cityNameInput, dateInput);

    if (isValidCityName) {
        getCity(cityNameInput);
    }
}

export { handleSubmit }
