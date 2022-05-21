const headerMain = document.getElementById('header')
const containerMain = document.getElementById('main__animations');
const footerMain = document.getElementById('footer');
const body = document.querySelector('body');

export function newContainer(e) {
    e.preventDefault;
    // Hace que al ingresar a la nueva pantalla la vista se vea desde el comienzo del html.
    window.scroll(0, 0);
    // Desaparece la pantalla donde se despliegan las tarjetas de peliculas(Main)
    headerMain.classList.remove('header');
    const headerP = headerMain.querySelector('.header__p');
    const headerRow = headerMain.querySelector('.header__container-img')
    const headerH1 = document.querySelector('#header__h1')
    headerMain.removeChild(headerP);
    headerMain.removeChild(headerRow)
    headerMain.classList.add('movie__header');
    headerH1.classList.add('movie__header__h1')
    containerMain.style.display = 'none';

    //Crea el nuevo contenedor main que abarcara las pestañas
    let peliContainer = document.createElement("main");
    // Agrego el estilo para el contenedor main creado en css.
    peliContainer.classList.add('movie__container');
    // Creo la sección de sidebar (Bloque lateral)
    let sideBar = document.createElement("section");
    // Agrega clase al sidebar
    sideBar.classList.add('movie__sidebar')
    // Crea contenido dinamico al sidebar.
    sideBar.innerHTML = `<h4>${e.title}</h4>
    <img class="movie__sidebar__img" src="${e.poster}"alt="Poster de la animación">
    <p><spam class="black">Año:</spam> ${e.release_date}</p>
    <p><spam class="black">Director:</spam> ${e.director}</p>
    <p><spam class="black">Productor:</spam> ${e.producer}</p>
    <p><spam class="black">Score:</spam> ${e.rt_score} </p>
    <a class="movie__sidebar__button" href="index.html">VOLVER</a>`;
    // Container de pestañas Tab
    let tabContainer = document.createElement("section");
    tabContainer.classList.add('movie__mainContent');

    // Sección Descripción pelicula.
    let inputDescription = document.createElement('input');
    let labelDescription = document.createElement('label');
    let divDescription = document.createElement('div');
    divDescription.classList.add('tab');
    inputDescription.setAttribute("type", "radio");
    inputDescription.setAttribute("name", "tabs");
    inputDescription.setAttribute("id", "tabone");
    inputDescription.setAttribute("checked", "checked");
    labelDescription.setAttribute("for", "tabone");
    labelDescription.innerHTML = `Descripción`;
    divDescription.classList.add('movie__description')
    divDescription.innerHTML = `<p>${e.description}</p>`;

    // Sección Personajes.
    //  personajes
    const characters = e.people;
    let inputCharacters = document.createElement('input');
    let labelCharacters = document.createElement('label');
    let divCharacters = document.createElement('div');
    let divFilterAndCount = document.createElement('div');
    divFilterAndCount.classList.add('characters__filtersAndCount');
    divFilterAndCount.innerHTML = `<p id="countFilms"><spam class="countBlue">Estas visualizando:</spam> ${e.people.length} personajes</p>`
    divCharacters.classList.add('tab');
    let divCharactersSub = document.createElement('div');
    divCharactersSub.classList.add('movie__mainContent__card');
    inputCharacters.setAttribute("type", "radio");
    inputCharacters.setAttribute("name", "tabs");
    inputCharacters.setAttribute("id", "tabtwo");
    labelCharacters.setAttribute("for", "tabtwo");
    labelCharacters.innerHTML = `Personajes`;
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie__div');


    for (let i = 0; i < characters.length; i++) {
        movieDiv.innerHTML += `
        <img class="movie__img" src="${characters[i].img}" alt="Imagen de personaje totoro">`;

        let movieImg = movieDiv.querySelector('.movie__img');
        // const charactersId = characters[i].id;
        // movieImg.setAttribute("id", charactersId);

        // POPUP / MODAL
        let divCharacters = document.createElement('div');
        divCharacters.classList.add('overlay');
        divCharacters.setAttribute('id', 'overlay');
        let divPopupCharacters = document.createElement('div');
        divPopupCharacters.classList.add('popup');
        divPopupCharacters.setAttribute('id', 'popup');
        let divPopupImgCharacters = document.createElement('img');
        divPopupImgCharacters.setAttribute('src', characters[i].img);
        divPopupImgCharacters.setAttribute('alt', "imagen del personaje");
        let divPopupDescriptionChar = document.createElement('div');
        divPopupDescriptionChar.classList.add('character__description');
        let datePopupH5Char = document.createElement('h5');
        datePopupH5Char.innerHTML = `${characters[i].name}`;
        let datePopupAgeChar = document.createElement('p');
        datePopupAgeChar.innerHTML = `<spam class="black">Edad:</spam> ${characters[i].age}`;
        let datePopupGenderChar = document.createElement('p');
        datePopupGenderChar.innerHTML = `<spam class="black">Género:</spam> ${characters[i].gender}`;
        let datePopupEyeChar = document.createElement('p');
        datePopupEyeChar.innerHTML = `<spam class="black">Color de ojos:</spam> ${characters[i].eye_color}`;
        let datePopupHair = document.createElement('p');
        datePopupHair.innerHTML = `<spam class="black">Color de pelo:</spam> ${characters[i].hair_color}`;
        let datePopupspecieChar = document.createElement('p');
        datePopupspecieChar.innerHTML = `<spam class="black">Especie:</spam> ${characters[i].specie}`;

        let buttonClose = document.createElement('button');
        buttonClose.classList.add('btn__cerrar__popup');
        buttonClose.innerHTML = 'CERRAR';

        divCharactersSub.appendChild(movieImg);
        divCharactersSub.appendChild(divCharacters);
        divCharacters.appendChild(divPopupCharacters);
        divPopupCharacters.appendChild(divPopupImgCharacters);
        divPopupCharacters.appendChild(divPopupDescriptionChar);
        divPopupDescriptionChar.appendChild(datePopupH5Char);
        divPopupDescriptionChar.appendChild(datePopupAgeChar);
        divPopupDescriptionChar.appendChild(datePopupGenderChar);
        divPopupDescriptionChar.appendChild(datePopupEyeChar);
        divPopupDescriptionChar.appendChild(datePopupHair);
        divPopupDescriptionChar.appendChild(datePopupspecieChar);
        divPopupDescriptionChar.appendChild(buttonClose);

        //ABRIR Y CERRAR POP UP / MODAL
        movieImg.addEventListener("click", function (e) {
            e.preventDefault();
            divCharacters.classList.add("active");
            divPopupCharacters.classList.add("active");
        });
        buttonClose.addEventListener("click", function (e) {
            e.preventDefault();
            divCharacters.classList.remove("active");
            divPopupCharacters.classList.remove("active");
        });
    }

    // Sección Vehiculos y locación;
    let location = e.locations;
    let vehicle = e.vehicles;

    let inputOther = document.createElement('input');
    let labelOther = document.createElement('label');
    let divOther = document.createElement('div');
    let divOtherSub = document.createElement('div');
    divOtherSub.classList.add('movie__mainContent__card');
    divOther.classList.add('tab');
    inputOther.setAttribute("type", "radio");
    inputOther.setAttribute("name", "tabs");
    inputOther.setAttribute("id", "tabthree");
    labelOther.setAttribute("for", "tabthree");
    labelOther.innerHTML = `Locación y Vehículo`;

    let movieDivLocation = document.createElement('div');
    movieDivLocation.classList.add('movie__div');

    if (location.length === 0 && vehicle.length === 0) {
        divOtherSub.innerHTML = `<p> Aquí no hay nada !</p>
        <div><img class="movie__img" src="https://i.pinimg.com/originals/11/8b/cf/118bcfbcdf6a8ffd86b4691b6a622f85.gif" alt="No hay locaciones ni vehiculos!"></div>`
    } else {
        for (let i = 0; i < location.length; i++) {
            movieDivLocation.innerHTML += `<img class="movie__img" src="${location[i].img}" alt="imagen de locaciones">`;

            let movieDivImg = movieDivLocation.querySelector('.movie__img');
            // const locationId = location[i].id;
            // movieDivImg.setAttribute("id", locationId);

            // Mostrar array de los residentes
            const arrayResidents = location[i].residents;
            let arrayNamesResidents = arrayResidents.map((habitantes) => {
                if (habitantes === "TODO") {
                    return "Todos los personajes";
                } else {
                    return habitantes.name;
                }
            });

            // POPUP / MODAL
            let divPopupContainer = document.createElement('div');
            divPopupContainer.classList.add('overlay');
            divPopupContainer.setAttribute('id', 'overlay');
            let divPopup = document.createElement('div');
            divPopup.classList.add('popup');
            divPopup.setAttribute('id', 'popup');
            let divPopupImg = document.createElement('img');
            divPopupImg.setAttribute('src', location[i].img);
            divPopupImg.setAttribute('alt', "imagen del personaje");
            let divPopupDescription = document.createElement('div');
            divPopupDescription.classList.add('character__description');
            let datePopupH5 = document.createElement('h5');
            datePopupH5.innerHTML = `${location[i].name}`;
            let datePopupClimate = document.createElement('p');
            datePopupClimate.innerHTML = `<spam class="black">Clima:</spam> ${location[i].climate}`;
            let datePopupTerrain = document.createElement('p');
            datePopupTerrain.innerHTML = `<spam class="black">Terreno:</spam> ${location[i].terrain}`;
            let datePopupWater = document.createElement('p');
            datePopupWater.innerHTML = `<spam class="black">Superficie de agua:</spam> ${location[i].surface_water}`;
            let datePopupresidents = document.createElement('p');
            datePopupresidents.innerHTML = `<spam class="black">Habitantes:</spam> ${arrayNamesResidents}`;

            let buttonClose = document.createElement('button');
            buttonClose.classList.add('btn__cerrar__popup');
            buttonClose.innerHTML = 'CERRAR';

            divOtherSub.appendChild(movieDivImg);
            divOtherSub.appendChild(divPopupContainer);
            divPopupContainer.appendChild(divPopup);
            divPopup.appendChild(divPopupImg);
            divPopup.appendChild(divPopupDescription);
            divPopupDescription.appendChild(datePopupH5);
            divPopupDescription.appendChild(datePopupClimate);
            divPopupDescription.appendChild(datePopupTerrain);
            divPopupDescription.appendChild(datePopupWater);
            divPopupDescription.appendChild(datePopupresidents);
            divPopupDescription.appendChild(buttonClose);

            //ABRIR Y CERRAR POPUP / MODAL
            movieDivImg.addEventListener("click", function (e) {
                e.preventDefault();
                divPopupContainer.classList.add("active");
                divPopup.classList.add("active");
            });
            buttonClose.addEventListener("click", function (e) {
                e.preventDefault();
                divPopupContainer.classList.remove("active");
                divPopup.classList.remove("active");
            });

        }
        for (let i = 0; i < vehicle.length; i++) {
            movieDivLocation.innerHTML += `<img class="movie__img" src="${vehicle[i].img}" alt="imagen de vehiculos">`;

            let movieVehicle = movieDivLocation.querySelector('.movie__img');
            // const vehicleId = vehicle[i].id;
            // movieVehicle.setAttribute("id", vehicleId);

            // POPUP / MODAL
            let divPopupContainer = document.createElement('div');
            divPopupContainer.classList.add('overlay');
            divPopupContainer.setAttribute('id', 'overlay');
            let divPopup = document.createElement('div');
            divPopup.classList.add('popup');
            divPopup.setAttribute('id', 'popup');
            let divPopupImg = document.createElement('img');
            divPopupImg.setAttribute('src', vehicle[i].img);
            divPopupImg.setAttribute('alt', "imagen del personaje");
            let divPopupDescription = document.createElement('div');
            divPopupDescription.classList.add('character__description');
            let datePopupH5 = document.createElement('h5');
            datePopupH5.innerHTML = `${vehicle[i].name}`;
            let datepopupDescripcion = document.createElement('p');
            datepopupDescripcion.innerHTML = `<spam class="black">Descripción:</spam> ${vehicle[i].description}`;
            let datePopupClass = document.createElement('p');
            datePopupClass.innerHTML = `<spam class="black">Clase:</spam> ${vehicle[i].vehicle_class}`;
            let datePopuplength = document.createElement('p');
            datePopuplength.innerHTML = `<spam class="black">Length:</spam> ${vehicle[i].length}`;
            let datePopupPiloto = document.createElement('p');
            datePopupPiloto.innerHTML = `<spam class="black">Piloto:</spam> ${vehicle[i].pilot.name}`;

            let buttonClose = document.createElement('button');
            buttonClose.classList.add('btn__cerrar__popup');
            buttonClose.innerHTML = 'CERRAR';

            divOtherSub.appendChild(movieVehicle);
            divOtherSub.appendChild(divPopupContainer);
            divPopupContainer.appendChild(divPopup);
            divPopup.appendChild(divPopupImg);
            divPopup.appendChild(divPopupDescription);
            divPopupDescription.appendChild(datePopupH5);
            divPopupDescription.appendChild(datepopupDescripcion);
            divPopupDescription.appendChild(datePopupClass);
            divPopupDescription.appendChild(datePopuplength);
            divPopupDescription.appendChild(datePopupPiloto);
            divPopupDescription.appendChild(buttonClose);

            //ABRIR Y CERRAR POP UP / MODAL
            movieVehicle.addEventListener("click", function (e) {
                e.preventDefault();
                divPopupContainer.classList.add("active");
                divPopup.classList.add("active");
            });
            buttonClose.addEventListener("click", function (e) {
                e.preventDefault();
                divPopupContainer.classList.remove("active");
                divPopup.classList.remove("active");
            });

        }

    }

    // Despliega en la pantalla el contenedor del Main
    body.appendChild(peliContainer);
    // Despliega en la pantalla el contenedor del sidebar.
    peliContainer.appendChild(sideBar);
    // Despliega en la pantalla el contenedor donde iras las pestallas tab.
    peliContainer.appendChild(tabContainer);
    // Despliegue sección descripción:
    tabContainer.appendChild(inputDescription);
    tabContainer.appendChild(labelDescription);
    tabContainer.appendChild(divDescription);
    //Despliegue sección imagenes personajes:
    tabContainer.appendChild(inputCharacters);
    tabContainer.appendChild(labelCharacters);
    tabContainer.appendChild(divCharacters);
    divCharacters.appendChild(divFilterAndCount);
    divCharacters.appendChild(divCharactersSub);
    // Despliegue sección vehiculos y locación:
    tabContainer.appendChild(inputOther);
    tabContainer.appendChild(labelOther);
    tabContainer.appendChild(divOther);
    divOther.appendChild(divOtherSub);
    // Despliega el footer
    body.appendChild(footerMain);
}
