async function getCityImage(cityName) {
    const url = new URL("http://localhost:8080/cityImage");
    url.searchParams.append("city", cityName);
    const showImage = document.querySelector("#image-city");

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
        const image = res.largeImageURL;

        const getImage = `<img class="image-city" src=${image} alt="">`;
        showImage.innerHTML = getImage;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export { getCityImage };