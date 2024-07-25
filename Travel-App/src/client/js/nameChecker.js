function checkForName(cityNameInput, dateInput) {
    const input = cityNameInput.replace(/\s+/g, '');
    let errorMessageCityName = document.querySelector(".message-cityname");
    let errorMessageDate = document.querySelector(".message-date");
    const urlPattern = /^[a-zA-Z]+$/;

    if (!input || dateInput === "" || !urlPattern.test(input)) {
        if (!input) {
            errorMessageCityName.textContent = "Please enter City Name !";
            errorMessageCityName.style.visibility = "visible";
        }
        else if (!urlPattern.test(input)) {
            errorMessageCityName.textContent = "City names do not contain special characters or numbers";
            errorMessageCityName.style.visibility = "visible";
        }
        if (dateInput === "") {
            errorMessageDate.textContent = "Please enter Date !";
            errorMessageDate.style.visibility = "visible";
        }
        return false;
    }
    errorMessageCityName.style.visibility = "hidden";
    errorMessageDate.style.visibility = "hidden";
    return true;
}

export { checkForName }
