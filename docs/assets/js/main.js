"use strict";const inputSearch=document.querySelector(".js-input"),inputSerachValue=inputSearch.value.toLowerCase();let seriesList=document.querySelector(".js-list");const favouritesList=document.querySelector(".js-favouriteList"),buttonSearch=document.querySelector(".js-button");let favourites=[],globalData=[];const deleteButton=document.querySelector(".js-inputDelete"),buttonResetFav=document.querySelector(".js-resetFav"),btnTest=document.querySelector(".js-btnTest");function seriesSearch(){fetch("https://api.tvmaze.com/search/shows?q="+inputSearch.value.toLowerCase()).then(e=>e.json()).then(e=>{globalData=[];for(const t of e)globalData.push(t);showSeries(globalData)})}function showSeries(e){seriesList.innerHTML="";for(let t=0;t<e.length;t++){const i=e[t].show;let a;a=void 0===favourites.find(e=>e.show.id===i.id)?"":"card--favourite",null===i.image?seriesList.innerHTML+=`\n          <li id="${i.id}"  class= "main__list--item ${a} js-li " >\n              <h2 class="main__card--title">${i.name} ${i.genres}</h2>\n             <img class="main__card--img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="not image available"></img></a></li>\n      `:seriesList.innerHTML+=`\n        <li id="${i.id}" class= " main__list--item ${a} js-li ">\n          <h2 class="main__card--title">${i.name} ${i.genres.join(" - ")}</h2>\n          <img class="main__card--img" src="${i.image.medium}" alt="Tv Show ${i.name}"></img></a></li>\n      `}addListenerToSeries()}function addListenerToSeries(){const e=document.querySelectorAll(".js-li");for(const t of e)t.addEventListener("click",handleClickSeries)}function handleClickSeries(e){e.currentTarget;let t=parseInt(e.currentTarget.id);const i=favourites.findIndex(e=>e.show.id===t);if(-1===i){const e=globalData.find(e=>e.show.id===t);favourites.push(e)}else favourites.splice(i,1);showSeries(globalData),showSeriesFav(favourites),addLocalStorage()}function showSeriesFav(e){favouritesList.innerHTML="";for(let t=0;t<e.length;t++){const i=e[t].show;null===i.image?favouritesList.innerHTML+=`\n        <li class= "main__list--item main__list--item-faved js-li" ><div class="flex-btn">\n            <h2 class="main__card--title-faved">${i.name}\n              </h2>\n              <i id="${i.id}" class="fas fa-times btn-delete js-delete"></i>\n            </div>\n            <img class="main__card--img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="not image available"></img></li>`:favouritesList.innerHTML+=`\n        <li class= "main__list--item main__list--item-faved js-li">\n          <div class="flex-btn">\n            <h2 class="main__card--title-faved">${i.name}</h2>\n            <i id="${i.id}" class="fas fa-times btn-delete js-delete"></i>\n          </div>\n          <img class="main__card--img" src="${i.image.medium}" alt="Tv Show ${i.name}"></li>\n    `,addListenerToSeriesFav()}}function addLocalStorage(){localStorage.setItem("favoriteStorage",JSON.stringify(favourites))}function renderFavSeriesStorage(){const e=JSON.parse(localStorage.getItem("favoriteStorage"));null!==e&&(favourites=e,showSeriesFav(favourites))}function addListenerToSeriesFav(){const e=document.querySelectorAll(".js-delete");for(const t of e)t.addEventListener("click",handleClickSeries)}function resetFavSeries(){favouritesList.innerHTML=""}function emptyStorage(){localStorage.removeItem("favoriteStorage")}function handleResetFav(){resetFavSeries(),emptyStorage()}buttonSearch.addEventListener("click",seriesSearch),renderFavSeriesStorage(),buttonResetFav.addEventListener("click",handleResetFav);