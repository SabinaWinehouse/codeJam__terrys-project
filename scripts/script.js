const initialCards = [
  {
    name: "String of hearts",
    link: "https://images.unsplash.com/photo-1602761265250-08beab2b989b?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
  },
  {
    name: "Snakeplant",
    link: "https://images.pexels.com/photos/9412363/pexels-photo-9412363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Peace Lily",
    link: "https://images.unsplash.com/photo-1616690248297-1ec539dd910f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=377",
  },
  {
    name: "Monstera",
    link: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464",
  },
  {
    name: "Philodendron",
    link: "https://images.unsplash.com/photo-1609142621730-db3293839541?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464",
  },
  {
    name: "Succulents, varied",
    link: "https://images.unsplash.com/photo-1459156212016-c812468e2115?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=405",
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
  cardImage.style.backgroundImage = `url("${data.link}")`;

  function toggleLikeButton(evt) {
    if (evt.target === likeButton) {
      evt.target.classList.toggle("card__like-button_active");
    }
  }

  likeButton.addEventListener("click", toggleLikeButton);

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
