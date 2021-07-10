/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
"use strict";

function addListenerToSeries() {
  const allSeries = document.querySelectorAll(".js-li");
  for (const serie of allSeries) {
    serie.addEventListener("click", handleClickSeries);
  }
}

function handleClickSeries(event) {
  const selectedSeries = event.currentTarget;
  let serieId = parseInt(event.currentTarget.id);

  const searchFavouritesIndex = favourites.findIndex(
    (show) => show.show.id === serieId
  );

  if (searchFavouritesIndex === -1) {
    const searchSerieData = globalData.find((show) => show.show.id === serieId);
    favourites.push(searchSerieData);
  } else {
    favourites.splice(searchFavouritesIndex, 1);
  }

  showSeries(globalData);
  showSeriesFav(favourites);
  addLocalStorage();
}

function showSeriesFav(data) {
  favouritesList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const show = data[i].show;

    if (show.image === null) {
      favouritesList.innerHTML += `
        <li class= "listStyle js-li" ><div class="flex-btn">
            <h2 class="serie_titleFav">${show.name}
              </h2>
              <input id="${show.id}" class="btn-delete  js-inputDelete" type="button" value="x" />
            </div>
            <img class="serie_imgFav" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="not image available"></img></li>`;
    } else {
      favouritesList.innerHTML += `
        <li class= "listStyle js-li">
          <div class="flex-btn">
            <h2 class="serie_titleFav">${show.name}</h2>
            <input id="${show.id}" class="btn-delete js-inputDelete" type="button" value="x" />
          </div>
          <img class="serie_imgFav" src="${show.image.medium}" alt="Tv Show ${show.name}"></li>
    `;
    }
    addListenerToSeriesFav();
  }
}

function addLocalStorage() {
  localStorage.setItem("favoriteStorage", JSON.stringify(favourites));
}

function renderFavSeriesStorage() {
  const getLocalStoarage = JSON.parse(localStorage.getItem("favoriteStorage"));
  if (getLocalStoarage !== null) {
    favourites = getLocalStoarage;
    showSeriesFav(favourites);
  }
}
renderFavSeriesStorage();

function addListenerToSeriesFav() {
  const allDeleteButton = document.querySelectorAll(".js-inputDelete");
  for (const buttonDelete of allDeleteButton) {
    buttonDelete.addEventListener("click", handleClickSeries);
  }
}

/* function deleteFav(event) {
  const serieToDelete = event.currentTarget;
  let buttonDeleteId = parseInt(event.currentTarget.id);

  const searchDeletedId = favourites.findIndex(
    (show) => show.show.id === buttonDeleteId
  );

  if (searchDeletedId === -1) {
    const searchSerieData = globalData.find((show) => show.show.id === serieId);
    favourites.push(searchSerieData);
  } else {
    favourites.splice(searchDeletedId, 1);
  }
  showSeriesFav(favourites);
  addLocalStorage();
} */
function resetFavSeries() {
  favouritesList.innerHTML = "";
}

function emptyStorage() {
  localStorage.removeItem("favoriteStorage");
}

function handleResetFav() {
  resetFavSeries();
  emptyStorage();
}

buttonResetFav.addEventListener("click", handleResetFav);
