"use strict";const inputSearch=document.querySelector(".js-input"),inputSerachValue=inputSearch.value.toLowerCase();let seriesList=document.querySelector(".js-list");const favouritesList=document.querySelector(".js-favouriteList"),buttonSearch=document.querySelector(".js-button");let favourites=[],globalData=[];const deleteButton=document.querySelector(".js-inputDelete"),buttonResetFav=document.querySelector(".js-resetFav");function seriesSearch(){fetch("https://api.tvmaze.com/search/shows?q="+inputSearch.value.toLowerCase()).then(e=>e.json()).then(e=>{globalData=[];for(const t of e)globalData.push(t);showSeries(globalData),console.log(globalData)})}function showSeries(e){seriesList.innerHTML="";for(let t=0;t<e.length;t++){const s=e[t].show;let i;i=void 0===favourites.find(e=>e.show.id===s.id)?"":"favourite",null===s.image?seriesList.innerHTML+=`\n        <li id="${s.id}"  class= "${i} js-li " >\n            <h2 class="serie_title">${s.name}</h2>\n           <img class="serie_img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="not image available"></img></a></li>\n      `:seriesList.innerHTML+=`\n        <li id="${s.id}" class= "${i} js-li ">\n          <h2 class="serie_title">${s.name}</h2>\n          <img class="serie_img" src="${s.image.medium}" alt="Tv Show ${s.name}"></img></a></li>\n      `}addListenerToSeries()}function addListenerToSeries(){const e=document.querySelectorAll(".js-li");for(const t of e)t.addEventListener("click",handleClickSeries)}function handleClickSeries(e){e.currentTarget;let t=parseInt(e.currentTarget.id);const s=favourites.findIndex(e=>e.show.id===t);if(-1===s){const e=globalData.find(e=>e.show.id===t);favourites.push(e)}else favourites.splice(s,1);showSeries(globalData),showSeriesFav(favourites),addLocalStorage()}function showSeriesFav(e){favouritesList.innerHTML="";for(let t=0;t<e.length;t++){const s=e[t].show;null===s.image?favouritesList.innerHTML+=`\n        <li class= "listStyle js-li" ><div class="flex-btn">\n            <h2 class="serie_titleFav">${s.name}\n              </h2>\n              <input id="${s.id}" class="btn-delete  js-inputDelete" type="button" value="x" />\n            </div>\n            <img class="serie_imgFav" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="not image available"></img></li>`:favouritesList.innerHTML+=`\n        <li class= "listStyle js-li">\n          <div class="flex-btn">\n            <h2 class="serie_titleFav">${s.name}</h2>\n            <input id="${s.id}" class="btn-delete js-inputDelete" type="button" value="x" />\n          </div>\n          <img class="serie_imgFav" src="${s.image.medium}" alt="Tv Show ${s.name}"></li>\n    `,addListenerToSeriesFav()}}function addLocalStorage(){localStorage.setItem("favoriteStorage",JSON.stringify(favourites))}function renderFavSeriesStorage(){const e=JSON.parse(localStorage.getItem("favoriteStorage"));null!==e&&(favourites=e,showSeriesFav(favourites))}function addListenerToSeriesFav(){const e=document.querySelectorAll(".js-inputDelete");for(const t of e)t.addEventListener("click",deleteFav)}function deleteFav(e){const t=e.currentTarget;console.log(t);let s=parseInt(e.currentTarget.id);const i=favourites.findIndex(e=>e.show.id===s);if(-1===i){const e=globalData.find(e=>e.show.id===serieId);favourites.push(e)}else favourites.splice(i,1);showSeriesFav(favourites),addLocalStorage()}function resetFavSeries(){favouritesList.innerHTML=""}function emptyStorage(){localStorage.removeItem("favoriteStorage")}function handleResetFav(){resetFavSeries(),emptyStorage()}buttonSearch.addEventListener("click",seriesSearch),renderFavSeriesStorage(),buttonResetFav.addEventListener("click",handleResetFav);