

const accesskey = "IdUdlG8eU8EN0T4yzDBqw9kWqsawQMkAN1woJflyJJw";
const defaultQuery = "nature"; 

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Serch-input");
const searchResults = document.querySelectorAll(".polaroid");

const showmore = document.getElementById("Show-more-button");

let inputData = "";
let page = 1;
let defaultImagesRendered = false; 

async function searchImages(query) {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accesskey}`;

    async function fetchDataAndRender() {
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Clear existing results if default images have been rendered
            if (defaultImagesRendered) {
                searchResults.forEach(container => {
                    container.innerHTML = "";
                });
            }

            if (Array.isArray(data.results)) {
                data.results.forEach((result) => {
                    const imageWrapper = document.createElement('div');
                    imageWrapper.classList.add("polaroid");

                    const image = document.createElement('img');
                    image.src = result.urls.small;
                    image.alt = result.alt_description;

                    const imageLink = document.createElement("a");
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    imageLink.textContent = result.alt_description;

                    imageWrapper.appendChild(image);
                    imageWrapper.appendChild(imageLink);

                    // Loop through searchResults NodeList and append to each container
                    searchResults.forEach(container => {
                        container.appendChild(imageWrapper.cloneNode(true));
                    });
                });
            } else {
                console.error("Data structure is not as expected");
            }
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    await fetchDataAndRender();

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}


// Fetch and render default images when the page loads

defaultImagesRendered = true; // Set the flag to true after rendering default images

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    searchImages(defaultQuery);
    page = 1;
    inputData = inputEl.value;
    defaultImagesRendered = false; // Set flag to false to hide default images
    searchImages(inputData);
});

