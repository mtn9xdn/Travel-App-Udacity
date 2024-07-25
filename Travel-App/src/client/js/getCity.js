import { getWeather } from "./getWeather";
import { getCityImage } from "./getCityImage";

async function getCity(cityName) {
    const url = new URL("http://localhost:8080/getCity");
    url.searchParams.append("city", cityName);

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
        const { lat, lng } = res[0];
        if ({ lat, lng }) {
            getWeather({ lat, lng });
        }
        getCityImage(cityName);
        return res;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export { getCity };