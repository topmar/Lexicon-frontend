export const renderCard = (dog) => {

  const card = document.createElement('div');
  card.classList.add('dog-card');

  const image = document.createElement('img');
  image.src = dog.image.url;
  image.alt = dog.breed;

  const breed = document.createElement('h3');
  breed.textContent = dog.breed;

  const description = document.createElement('p');
  description.textContent = dog.description || 'Brak opisu';

  card.appendChild(image);
  card.appendChild(breed);
  card.appendChild(description);

  return card;
};