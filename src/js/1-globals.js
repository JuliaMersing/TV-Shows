"use strict";

const inputSearch = document.querySelector(".js-input");
const inputSerachValue = inputSearch.value.toLowerCase();
let seriesList = document.querySelector(".js-list");
const favouritesList = document.querySelector(".js-favouriteList");
const buttonSearch = document.querySelector(".js-button");
let favourites = [];
let globalData = [];
const deleteButton = document.querySelector(".js-inputDelete");
const buttonResetFav = document.querySelector(".js-resetFav");
const btnTest = document.querySelector(".js-btnTest");
