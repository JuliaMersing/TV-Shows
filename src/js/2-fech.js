/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
"use strict";

function seriesSearch() {
  fetch(
    `https://api.tvmaze.com/search/shows?q=${inputSearch.value.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((data) => {
      globalData = [];
      for (const itemData of data) {
        globalData.push(itemData);
      }
      showSeries(globalData);
    });
}

//Paint Series

function showSeries(data) {
  seriesList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const show = data[i].show;

    const isFavouriteClass = favourites.find(
      (favouriteId) => favouriteId.show.id === show.id
    );

    let classFavourite;
    if (isFavouriteClass === undefined) {
      classFavourite = "";
    } else {
      classFavourite = "card--favourite";
    }

    if (show.image === null) {
      seriesList.innerHTML += `
          <li id="${show.id}"  class= "main__list--item ${classFavourite} js-li " >
              <h2 class="main__card--title">${show.name} ${show.genres}</h2>
             <img class="main__card--img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="not image available"></img></a></li>
      `;
    } else {
      seriesList.innerHTML += `
        <li id="${show.id}" class= " main__list--item ${classFavourite} js-li ">
          <h2 class="main__card--title">${show.name} ${show.genres.join(
        " - "
      )}</h2>
          <img class="main__card--img" src="${
            show.image.medium
          }" alt="Tv Show ${show.name}"></img></a></li>
      `;
    }
  }
  addListenerToSeries();
}
buttonSearch.addEventListener("click", seriesSearch);
