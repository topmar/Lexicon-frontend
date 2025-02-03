import * as api_service from "./js/api_service.js";

const dogList = document.getElementById("dogList");
const favoriteDogs = [];

const renderDogs = (dogs) => {
  dogList.innerHTML = "";

  dogs.forEach((dog) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = dog.image.url;
    img.alt = "photo of a dog";

    const footer = document.createElement("footer");
    const detailsButton = document.createElement("button");
    detailsButton.classList.add("button");
    detailsButton.dataset.type = "details";
    detailsButton.dataset.id = dog.image_id;
    detailsButton.textContent = "Visa detaljer";

    const removeButton = document.createElement("button");
    removeButton.classList.add("button");
    removeButton.dataset.type = "remove";
    removeButton.dataset.id = dog.id;
    removeButton.textContent = "Ta bort från listan";

    footer.appendChild(detailsButton);
    footer.appendChild(removeButton);

    const imageLoadPromise = new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image failed to load"));
    });

    imageLoadPromise
      .then(() => {
        card.appendChild(img);
        card.appendChild(footer);
        dogList.appendChild(card);
      })
      .catch(error => {
        console.error("Image failed to load:", error);
        alert("Det gick inte att ladda bilden");
      });
  });
};

const showModal = async (dogId) => {
  api_service.getDogDetailsById(dogId)
    .then(dogData => {
      if (!dogData) {
        throw new Error("Not found.");
      }
      const breed = dogData.breeds?.[0] || {};
      const modal = document.getElementById("dialog");
      modal.innerHTML = "";

      const closeButton = document.createElement("button");
      closeButton.textContent = "✖";
      closeButton.dataset.type = "close-modal";
      closeButton.addEventListener("click", () => modal.close());

      const title = document.createElement("h2");
      title.textContent = breed.name || "Okänd ras";

      const image = document.createElement("img");
      image.src = dogData.url;
      image.alt = "photo of a dog";

      const weight = document.createElement("p");
      weight.innerHTML = `<strong>Vikt:</strong> ${breed.weight?.metric || "Inga data tillgängliga"}`;

      const height = document.createElement("p");
      height.innerHTML = `<strong>Höjd:</strong> ${breed.height?.metric || "Inga data tillgängliga"}`;

      const temperament = document.createElement("p");
      temperament.innerHTML = `<strong>Temperament:</strong> ${breed.temperament || "Inga data tillgängliga"}`;

      const imageLoadPromise = new Promise((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Image failed to load"));
      });

      modal.appendChild(closeButton);
      modal.appendChild(title);
      modal.appendChild(image);
      modal.appendChild(weight);
      modal.appendChild(height);
      modal.appendChild(temperament);

      imageLoadPromise
        .then(() => {
          modal.showModal();
        })
        .catch(error => {
          console.error("Image failed to load", error);
          alert("Det gick inte att ladda bilden");
        });
    });
};

const showModalSearch = (dog) => {
  const modal = document.getElementById("dialog");
  modal.innerHTML = "";

  const closeButton = document.createElement("button");
  closeButton.textContent = "✖";
  closeButton.dataset.type = "close-modal";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => modal.close());

  const title = document.createElement("h2");
  title.textContent = dog.breeds?.[0]?.name || "Okänd ras";

  const image = document.createElement("img");
  image.src = dog.url;
  image.alt = "photo of a dog";

  const weight = document.createElement("p");
  weight.innerHTML = `<strong>Vikt:</strong> ${dog.breeds?.[0]?.weight?.metric || "Inga data tillgängliwe"}`;

  const height = document.createElement("p");
  height.innerHTML = `<strong>Höjd:</strong> ${dog.breeds?.[0]?.height?.metric || "Inga data tillgängliwe"}`;

  const temperament = document.createElement("p");
  temperament.innerHTML = `<strong>Temperament:</strong> ${dog.breeds?.[0]?.temperament || "Inga data tillgängliwe"}`;

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    api_service.searchDogs()
      .then(data => {
        if (data.length > 0) {
          showModalSearch(data[0]);
        } else {
          alert("Inga hundar hittades.");
        }
      })
      .catch(error => {
        console.error("Error searching for dogs:", error);
        alert("Det gick inte att söka efter hundar.");
      });
  });

  const addToFavoritesButton = document.createElement("button");
  addToFavoritesButton.textContent = "Add to Favorites";
  addToFavoritesButton.addEventListener("click", () => {
    api_service.addFavorite({ image_id: dog.id })
      .then(data => {
        favoriteDogs.length = 0;
        api_service.getFavorites().then((data) => {
          favoriteDogs.push(...data);
          console.log(favoriteDogs);
          renderDogs(favoriteDogs);
        });
      })
      .catch(error => {
        console.error("Error adding dog to favorites:", error);
        alert("Det gick inte att lägga till hunden i favoriter.");
      });
  });

  modal.appendChild(closeButton);
  modal.appendChild(title);
  modal.appendChild(image);
  modal.appendChild(weight);
  modal.appendChild(height);
  modal.appendChild(temperament);
  modal.appendChild(nextButton);
  modal.appendChild(addToFavoritesButton);

  modal.showModal();
};

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (button && button.dataset.type === "searchDogs") {
    api_service.searchDogs().then((data) => {
      if (data.length > 0) {
        const dog = data[0];
        showModalSearch(dog);
      } else {
        alert("Inga hundar hittades.");
      }
    }).catch(error => {
      console.error("Error searching for dogs:", error);
      alert("Det gick inte att söka efter hundar. Försök igen.");
    });
  }
});

const handleButtonClick = (event) => {
  const button = event.target;
  const dogId = Number(button.getAttribute('data-id'));

  if (button.dataset.type === 'remove') {
    const updatedDogs = favoriteDogs.filter(dog => dog.id !== dogId);
    api_service.deleteFavoriteById(dogId).then(() => {
      favoriteDogs.length = 0;
      favoriteDogs.push(...updatedDogs);
      renderDogs(favoriteDogs);
    }).catch(error => {
      console.error("Error removing dog from favorites:", error);
      alert("Det gick inte att ta bort hunden. Försök igen.");
    });
  }
  else if (button.dataset.type === 'details') {
    const dogId = button.getAttribute('data-id');
    showModal(dogId);
    console.log("Show details of dog with ID:", dogId);
  }
  else if (button.dataset.type === 'close-modal') {
    document.getElementById("dialog").close();
  }
};

document.addEventListener('click', handleButtonClick);

document.addEventListener('DOMContentLoaded', () => {
  api_service.getFavorites().then((data) => {
    favoriteDogs.push(...data);
    renderDogs(favoriteDogs);
  });
});

