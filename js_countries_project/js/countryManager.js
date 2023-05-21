import Country from "./countryClass.js";
import { hideLoading } from "./appCountries.js";

let allCountries = [];
let firstCountries = ["United States", "United Kingdom", "France", "Thailand", "Israel"];
export const createAllCountries = (data) => {
    allCountries = data;
    firstCountries = allCountries.filter((item) => firstCountries.includes(item.name.common));
}

export const previewCountries = () => { //displays all countries
    document.querySelector("#countries").innerHTML = "";
    let sortedArr = _.sortBy(allCountries, "name.common")
    sortedArr.forEach(item => {
        let country = new Country("#countries", item, previewCountries, createCountryByCode, getNameByCode);
        country.previewRender();
    });
}
export const previewFirstCountries = () => { //displays first 5 countries
    hideLoading();
    document.querySelector("#countries").innerHTML = "";
    let sortedArr = _.sortBy(firstCountries, "name.common");
    sortedArr.forEach(item => {
        let country = new Country("#countries", item, previewFirstCountries, createCountryByCode, getNameByCode);
        country.previewRender();
    });
}

export const createCountriesBySearch = (input) => { //display countries by search input
    document.querySelector("#countries").innerHTML = "";
    console.log(input);
    let searchedCountries = allCountries.filter((item) => {
        return item.name.common.toLowerCase().includes(input.toLowerCase());
    });
    console.log(searchedCountries);
    if (searchedCountries.length >= 1) {
        searchedCountries.forEach((item) => {
            let country = new Country("#countries", item, previewFirstCountries, createCountryByCode, getNameByCode);
            country.previewRender();
        })
    } else {
        document.querySelector("#countries").innerHTML = "<h2 class=m-3 style=color:white>Country not found</h2>";
    }
}

export const createCountryByCode = (code) => {
    document.querySelector("#countries").innerHTML = "";
    let filteredCountries = allCountries.filter((item) => {
        // console.log("cca3 "+item.cca3);
        // console.log("code "+code);
        return item.cca3 == code;
    });
    console.log(filteredCountries);
    filteredCountries.forEach((item) => {
        let country = new Country("#countries", item, previewFirstCountries, createCountryByCode, getNameByCode);
        country.render();
    });
}

export const getNameByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
}

export const fillSelectBox = () => {
    let select = document.querySelector("#select_countries");
    let sortedArr = _.sortBy(allCountries, "name.common");
    sortedArr.forEach((item) => select.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`)

}

export const createCountryBySelect = (countryName) => {
    let selectedCountry = allCountries.filter(item => item.name.common == countryName);
    // console.log(selectedCountry[0]);
    createCountryByCode(selectedCountry[0].cca3);
}