// import { createCountryByCode, getNameByCode, previewFirstCountries } from "./countryManager.js";


export default class Country {
    constructor(_parent, _item, previewFirstCountries, createCountryByCode, getNameByCode) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.population = _item.population ? _item.population : "None";
        this.region = _item.region;
        this.languages = Object.values(_item.languages) ? Object.values(_item.languages) : "None";
        // this.coin = Object.keys(_item.currencies);
        this.flag = _item.flags.png ? _item.flags.png : "None";
        this.capital = _item.capital ? _item.capital : "None";
        this.borders = _item.borders ? _item.borders : [];
        this.map = _item.maps.googleMaps;
        this.lat = _item.latlng[0];
        this.lng = _item.latlng[1];
        this.code = _item.cca3;
        this.previewFirstCountries = previewFirstCountries;
        this.createCountryByCode = createCountryByCode;
        this.getNameByCode = getNameByCode;
    }

    previewRender() {
        let div = document.createElement("div");
        div.className = "col-md-3 col-sm-4 m-3 p-0 preview-box overflow-hidden h-100";
        div.style = "cursor:pointer; ";
        div.addEventListener("click", () => {
            document.querySelector("#countries").innerHTML = "";
            this.render();
        });
        // div.innerHTML = `<img src="${this.flag}">
        //                  ${this.name}
        //                  Capital: ${this.capital}
        //                  Pop: ${this.population}
        //                  Region: ${this.region}
        //                  Coin: ${this.coin}
        //                  Lang:${this.languages}`;
        // div.innerHTML = `<h1 class="p-1" style="background:rgba(255, 255, 255, 0.489); width:100%">${this.name}</h1>`;
        div.innerHTML = `<div>
                            <img src="${this.flag}" height="200px">
                            <h2 style="background:rgba(255, 255, 255, 0.489); width:100%"> ${this.name}</h2>
                        </div>`;
        document.querySelector(this.parent).append(div);
    }

    render() {
        let div = document.createElement("div");
        div.className = "col-8 m-3 p-0 row box";
        div.style = "min-height:70vh";
        div.innerHTML = `
                            <div class="p-0 col-md-4 col-sm-5">
                                <img src="${this.flag}" width=100% style="height:200px">
                                <div class="center flex-column p-3">
                                    <h2>${this.name}</h2>
                                    <h4>Capital: ${this.capital}</h4>
                                    <h4>Pop: ${Number(this.population).toLocaleString()}</h4>
                                    <h4>Languages: ${this.languages}</h4>
                                    <h4 id="borders">Borders:  </h4>
                                    <button id="home_btn">GO HOME</button>
                                </div>
                                
                            </div>
                            <div class="col-md-8 col-sm-7 p-0">
                                <iframe width="100%" height="100%" src="https://maps.google.com/maps?q=${this.lat},${this.lng}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" >
                                </iframe>
                            </div>
                        
                        `;
        if (this.borders.length > 0) {
            this.borders.forEach(async (item) => {
                let countryName = await this.getNameByCode(item);
                let bordersList = div.querySelector("#borders");
                let borderName = document.createElement("span");
                borderName.innerHTML = countryName + " ";
                borderName.addEventListener("click", () => {
                    this.createCountryByCode(item);
                });
                bordersList.append(borderName);
            });
        } else {
            let bordersList = div.querySelector("#borders");
            let borderName = document.createElement("span");
            borderName.innerHTML = "No Borders";
            bordersList.append(borderName);
        }
        // <iframe class="col-8" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${this.map}"></iframe>
        // <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/?q=${this.lat},${this.lng}"></iframe>


        div.querySelector("#home_btn").addEventListener("click", () => {
            this.previewFirstCountries();
            // previewFirstCountries();
        });
        document.querySelector(this.parent).append(div);
    }
}