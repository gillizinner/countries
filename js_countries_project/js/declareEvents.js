import { createCountriesBySearch, createCountryByCode, previewFirstCountries, createCountryBySelect } from "./countryManager.js";
export const declareEvents = () => {
    let usaLink = document.querySelector("#usa_link");
    let israelLink = document.querySelector("#israel_link");
    let ukLink = document.querySelector("#uk_link");
    let franceLink = document.querySelector("#france_link");
    let thailandLink = document.querySelector("#thailand_link");
    usaLink.addEventListener("click", () => {
        createCountryByCode("USA");
    });
    israelLink.addEventListener("click", () => {
        createCountryByCode("ISR");
    });
    ukLink.addEventListener("click", () => {
        createCountryByCode("GBR");
    });
    franceLink.addEventListener("click", () => {
        createCountryByCode("FRA");
    });
    thailandLink.addEventListener("click", () => {
        createCountryByCode("THA");
    });

    let logo = document.querySelector(".logo");
    logo.addEventListener("click", () => {
        previewFirstCountries();
    })

    let searchbtn = document.querySelector("#search_btn");
    searchbtn.addEventListener("click", () => {
        let searchVal = document.querySelector("#search_box").value;
        createCountriesBySearch(searchVal);
    })

    let selectBox = document.querySelector("#select_countries");
    selectBox.addEventListener("change", () => {
        // console.log(selectBox.value);
        createCountryBySelect(selectBox.value);
    })
}