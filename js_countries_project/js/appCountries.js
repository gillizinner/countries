// import Country from "./countryClass.js";
import { createAllCountries, previewFirstCountries, fillSelectBox } from "./countryManager.js";
import { declareEvents } from "./declareEvents.js";
const init = () => {
    doApi();
    declareEvents();
}

const doApi = async () => {
    showLoading();
    let url = "https://restcountries.com/v3.1/all";
    let resp = await fetch(url);
    // console.log(resp);
    let data = await resp.json();
    // console.log(data);
    createAllCountries(data);
    previewFirstCountries();
    fillSelectBox();
}

export const showLoading = () => {
    document.querySelector("#loading").style.display = "block";
    document.querySelector("#countries").style.display = "none";
}
export const hideLoading = () => {
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#countries").style.display = "flex";
}


init();