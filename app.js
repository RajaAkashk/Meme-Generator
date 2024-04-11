const memeBtn = document.querySelector(".meme-btn");
const memeTitle = document.querySelector(".meme-title");
const memeImg = document.querySelector("#mImg");
const authorName = document.querySelector(".author-name");

const updateDetails = (url, title, author) => {
    memeImg.setAttribute("src", url);
    memeTitle.innerHTML = title;
    authorName.innerHTML = `Author Name:${author}`;
};

const generateMeme = () => {
    fetch("https://meme-api.com/gimme")
    .then((response) => response.json())
    .then((data) => {
        updateDetails(data.url, data.title, data.author);
    })
    .catch((error) => {
        console.error('Error fetching meme:', error);
    });
};

memeBtn.addEventListener("click", generateMeme);


generateMeme();