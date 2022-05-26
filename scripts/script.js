const initialCards = [
  {
    name: "String of hearts",
    link: "https://unsplash.com/photos/xGpYDi-0348",
  },
  {
    name: "Snakeplant",
    link: "https://www.pexels.com/photo/person-holding-green-plant-in-pot-9412363/",
  },
  {
    name: "Peace Lily",
    link: "https://unsplash.com/photos/2y8kIVvvC0w",
  },
  {
    name: "Monstera",
    link: "https://unsplash.com/photos/bwsTJMnhcwE",
  },
  {
    name: "Philodendron",
    link: "https://unsplash.com/photos/IjVvZCY2qmU",
  },
  {
    name: "Succulents, varied",
    link: "https://unsplash.com/photos/ncQ2sguVlgo",
  },
];

const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");

const cardWrap = document.querySelector(".gallery__list");
const cardPopup = document.querySelector(".card-popup");
const cardPopupClose = document.querySelector(".card-popup__close-button");

function handleEscEvent(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_open");
    closePopup(activePopup);
  }
}

function closePopupOnRemoteClick(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    const activePopup = document.querySelector(".popup_open");
    closePopup(activePopup);
  }
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_open");
  document.addEventListener("keydown", handleEscEvent);
  document.addEventListener("mousedown", closePopupOnRemoteClick);
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscEvent);
  document.removeEventListener("mousedown", closePopupOnRemoteClick);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url('${data.link}')`;

  function toggleLikeButton(evt) {
    if (evt.target === likeButton) {
      evt.target.classList.toggle("card__like-button_active");
    }
  }

  likeButton.addEventListener("click", toggleLikeButton);

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    const cardPopupImage = cardPopup.querySelector(".card-popup__image");
    const cardPopupCaption = cardPopup.querySelector(".card-popup__subtitle");
    cardPopupCaption.textContent = data.name;
    cardPopupImage.src = data.link;
    cardPopupImage.alt = "Photo of " + data.name;

    openPopup(cardPopup);
  });

  return cardElement;
}

const renderCard = (data, wrapper) => {
  const newCard = getCardElement(data);
  wrapper.prepend(newCard);
};

initialCards.forEach((data) => {
  renderCard(data, cardWrap);
});
