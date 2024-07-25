async function getWeather(coordinates) {
    const { lat, lng } = coordinates;
    const url = new URL("http://localhost:8080/getWeatherForecast");
    url.searchParams.append("lat", lat);
    url.searchParams.append("lon", lng);

    const dateInput = document.querySelector(".dateInput").value;
    let errorMessageDate = document.querySelector(".message-date");
    const convertDateInput = new Date(dateInput);
    const currentDate = new Date();

    const timeDiff = Math.abs(convertDateInput - currentDate);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (convertDateInput.getFullYear() < currentDate.getFullYear()
        || convertDateInput.getMonth() < currentDate.getMonth() && convertDateInput.getFullYear() <= currentDate.getFullYear()
        || convertDateInput.getDate() < currentDate.getDate() && convertDateInput.getMonth() >= currentDate.getMonth() && convertDateInput.getFullYear() >= currentDate.getFullYear()
        || daysDiff >= 7) {
        errorMessageDate.textContent =
            "Please select a date that is not in the past or more than 7 days from the current date !";
        errorMessageDate.style.visibility = "visible";
    } else {
        errorMessageDate.style.visibility = "hidden";
        try {
            const response = await fetch(url.toString(), {
                method: "GET",
                credentials: "same-origin",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to send data");
            const res = await response.json();

            const cityName = res.city_name;
            const countryCode = res.country_code;
            const temperature = res.data[daysDiff].temp;
            const rainRate = res.data[daysDiff].pop;
            const humidity = res.data[daysDiff].rh;
            const description = res.data[daysDiff].weather.description;
            const icon = res.data[daysDiff].weather.icon;

            const getIconImage = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

            document.querySelector("#city_name").innerHTML = `City: ${cityName}`;
            document.querySelector("#country_code").innerHTML = `Country: ${countryCode}`;
            document.querySelector("#temp").innerHTML = `Temperature: ${temperature}℃`;
            document.querySelector("#pop").innerHTML = `Rain rate: ${rainRate}%`;
            document.querySelector("#rh").innerHTML = `Humidity: ${humidity}%`;
            document.querySelector("#description").innerHTML = `Description: ${description}`;
            document.querySelector("#icon").innerHTML = `<img src=${getIconImage} alt="">`;
            return res;
        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    }
}

export { getWeather };