import { filterAZ, filterZA, filterDataYearAsc, filterDataYearDesc, filterDataDirector, filterDataProducer, compute } from './data.js';
import { newContainer } from './template.js';

const containerAnimationes = document.getElementById('animations');
const filterLetterOrder = document.getElementById('filters__initial');
const filterXDirector = document.getElementById('filters__director');
const filterXProducer = document.getElementById('filters__producer');
const filterYear = document.getElementById('filters__year');

// Volumen de la música del sitio
const reproducer = document.getElementById("reproducer");
reproducer.volume = 0.05;


// // https://www.youtube.com/watch?v=xqBvtvXh9Z4&ab_channel=C%C3%B3digoconJuan video para estudiar llamado a json; 
fetch("./data/ghibli/ghibli.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        const dataStudioGhibli = data.films;
        // Creación de tarjetas dinamicas que llama información del objeto.data.ghibli
        // Se crea una función que lleva dentro un forEach que recorre el parametro que le de creando así las tarjetas

        const displayCardGhibli = (ghibliData) => {
            containerAnimationes.innerHTML = "";
            //contador de peliculas segun filtro
            document.getElementById("countFilms").innerHTML = `<spam class="countBlue">Estas visualizando:</spam> ${ghibliData.length} peliculas`;
            ghibliData.forEach((arr) => {
                // Article donde ira cada tarjeta
                const cardAnimations = document.createElement("article"); //article para cada tarjeta
                // Le agrego los estilos de css a cada card.
                cardAnimations.classList.add("animations__card");
                // Se agrega el contenido a la tarjeta.
                cardAnimations.innerHTML += `<img class="animations__card__img" src="${arr.poster}"alt="Imagen de la película de animación">
                <h4>${arr.title}</h4>
                <p><spam class="black">Año:</spam> ${arr.release_date}</p>
                <p><spam class="black">Director:</spam> ${arr.director}</p>
                <p><spam class="black">Productor:</spam> ${arr.producer}</p>
                <p><spam class="black">Score:</spam> ${arr.rt_score} </p>`;
                // Guardo el id del objeto en una nueva constante.
                const idObjetCard = arr.id;
                // A la tarjeta le agrego el nuevo atributo de ID que toma el valor del id unico que trae el objeto. 
                cardAnimations.setAttribute("id", idObjetCard);
                // Despligue tarjetas de peliculas.
                containerAnimationes.appendChild(cardAnimations);

                // Tiene que ir adentro para que funcione al dar click en todas las tarjetas, incluso a las que se toman con filtro. 
                cardAnimations.addEventListener("click", () => {
                    newContainer(arr);
                });

            })
        };
        displayCardGhibli(dataStudioGhibli);

        // Filtrar de la A a la Z y de la Z a la A
        filterLetterOrder.addEventListener('change', () => {
            if (filterLetterOrder.value === "0") {
                const filterLetterAZ = filterAZ(dataStudioGhibli);
                displayCardGhibli(filterLetterAZ);
            }
            if (filterLetterOrder.value === "1") {
                const filterLetterZA = filterZA(dataStudioGhibli);
                displayCardGhibli(filterLetterZA);
            }
        })

        //filtrar por director
        filterXDirector.addEventListener('change', () => {
            switch (filterXDirector.value) {
                case 'all':
                    displayCardGhibli(dataStudioGhibli);
                    break;
                case '0':
                    displayCardGhibli(filterDataDirector(dataStudioGhibli, "Hayao Miyazaki"));
                    break;
                case '1':
                    displayCardGhibli(filterDataDirector(dataStudioGhibli, "Gorō Miyazaki"));
                    break;
                case '2':
                    displayCardGhibli(filterDataDirector(dataStudioGhibli, "Isao Takahata"));
                    break;
                case '3':
                    displayCardGhibli(filterDataDirector(dataStudioGhibli, "Hiroyuki Morita"));
                    break;
                case '4':
                    displayCardGhibli(filterDataDirector(dataStudioGhibli, "Hiromasa Yonebayashi"));
                    break;
                case '5':
                    displayCardGhibli(filterDataDirector(dataStudioGhibli, "Yoshifumi Kondō"));
                    break;
            }
        })

        //filtrar por productor
        filterXProducer.addEventListener('change', () => {
            switch (filterXProducer.value) {
                case 'all':
                    displayCardGhibli(dataStudioGhibli);
                    break;
                case '0':
                    displayCardGhibli(filterDataProducer(dataStudioGhibli, "Isao Takahata"));
                    break;
                case '1':
                    displayCardGhibli(filterDataProducer(dataStudioGhibli, "Toshio Suzuki"));
                    break;
                case '2':
                    displayCardGhibli(filterDataProducer(dataStudioGhibli, "Toru Hara"));
                    break;
                case '3':
                    displayCardGhibli(filterDataProducer(dataStudioGhibli, "Hayao Miyazaki"));
                    break;
                case '4':
                    displayCardGhibli(filterDataProducer(dataStudioGhibli, "Yoshiaki Nishimura"));
                    break;
            }
        })

        // Ordenar los años de menor a mayor y viceversa
        filterYear.addEventListener('change', () => {
            if (filterYear.value === '0') {
                const filterXYear = filterDataYearAsc(dataStudioGhibli)
                displayCardGhibli(filterXYear)
            }
            if (filterYear.value === '1') {
                const filterXYear = filterDataYearDesc(dataStudioGhibli)
                displayCardGhibli(filterXYear)
            }
        })

        //Mejores peliculas 
        const nameMovies = compute(dataStudioGhibli);
        let nameBestMovies = nameMovies.map((element) => {
            let titleBestMovies = element.title;
            return titleBestMovies;
        })
        let scoreBestMovies = nameMovies.map((element) => {
            let score = element.rt_score;
            return score;
        })
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nameBestMovies,
                datasets: [{
                    label: 'Score',
                    data: scoreBestMovies,
                    backgroundColor: [
                        'rgba(135,183,197,0.8)',
                        'rgba(95,104,144, 0.8)',
                        'rgba(23,71,124, 0.8)',
                        'rgba(163,102,102, 0.8)',
                        'rgba(223,196,82, 0.8)',
                    ],
                    borderColor: [
                        'rgba(135,183,197,1)',
                        'rgba(95,104,144, 1)',
                        'rgba(23,71,124,1)',
                        'rgba(163,102,102, 1)',
                        'rgba(223,196,82, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


    })


