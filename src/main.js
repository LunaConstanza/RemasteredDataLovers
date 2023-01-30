import { /*filterAZ, filterZA, filterDataYearAsc, filterDataYearDesc,*/ filterDataDirector, filterDataProducer, compute, sortAlphabetic, sortDataYear } from './data.js';
import { newContainer } from './template.js';

const containerAnimationes = document.getElementById('animations');
const filterXDirector = document.getElementById('filters__director');
const filterXProducer = document.getElementById('filters__producer');
const filterLetterOrder = document.getElementById('filters__initial');
const filterYear = document.getElementById('filters__year');
const btnClean = document.getElementById('clean');

//Volumen de la música del sitio
const reproducer = document.getElementById("reproducer");
reproducer.volume = 0.05; //5% de volumen


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
                // Despligue tarjetas de peliculas.
                containerAnimationes.appendChild(cardAnimations);

                // Tiene que ir adentro para que funcione al dar click en todas las tarjetas, incluso a las que se toman con filtro. 
                cardAnimations.addEventListener("click", () => {
                    console.log("cliiiiick")
                    newContainer(arr);
                });

            })
        };
        displayCardGhibli(dataStudioGhibli);

        //filtrar por director
        filterXDirector.addEventListener('change', () => {
            if (filterXDirector.value == 'all') {
                displayCardGhibli(dataStudioGhibli);                
            } else {
                displayCardGhibli(filterDataDirector(dataStudioGhibli, filterXDirector.value));                
            }
        })

        //filtrar por productor
        filterXProducer.addEventListener('change', () => {
            if (filterXProducer.value == 'all') {
                displayCardGhibli(dataStudioGhibli);                
            } else {
                displayCardGhibli(filterDataProducer(dataStudioGhibli, filterXProducer.value));                
            }
        })

                // Filtrar de la A a la Z y de la Z a la A
        filterLetterOrder.addEventListener('change', () => {
            switch (filterLetterOrder.value) {
                case '0':
                    const filterLetterAZ = sortAlphabetic(dataStudioGhibli, 0);
                    displayCardGhibli(filterLetterAZ);
                    break;
            
                case '1':
                    const filterLetterZA = sortAlphabetic(dataStudioGhibli, 1);
                    displayCardGhibli(filterLetterZA);
                    break;
            }
        })

        // Ordenar los años de menor a mayor y viceversa
        filterYear.addEventListener('change', () => {
            switch (filterYear.value) {
                case '0':
                    const yearAsc = sortDataYear(dataStudioGhibli, 0)
                    displayCardGhibli(yearAsc)                    
                    break;
                case '1':
                    const yearDesc = sortDataYear(dataStudioGhibli, 1)
                    displayCardGhibli(yearDesc)
                    break;
            }
        })

        btnClean.addEventListener('click', (e) => {
            e.preventDefault();
            filterXDirector.value = 'all';
            filterXProducer.value = 'all';
            //seguir evaluando
            displayCardGhibli(dataStudioGhibli);
        })

        //Mejores peliculas 
        const elementMovies = compute(dataStudioGhibli);
        let nameBestMovies = elementMovies.map((element) => {
            let titleBestMovies = element.title;
            return titleBestMovies;
        })
        let scoreBestMovies = elementMovies.map((element) => {
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


