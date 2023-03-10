import { filterAZ, filterZA, filterDataDirector, filterDataProducer, filterDataYearAsc, filterDataYearDesc, compute } from '../src/data.js';

/*
 Referencia para aprender los distintos matches
 https://jestjs.io/docs/using-matchers
 para objetos se recomienda usar toEqual;
 toBe utiliza Object.is para probar la igualdad exacta, generamentel se ocupa en valores primitivos.
 toEqual comprueba recursivamente cada campo de un objeto o matriz.
*/
// Cree una pequeña data aleatoria que servira para probar los test
const dataGhibli = [
  {
    "title": "Castle in the Sky",
    "director": "Hayao Miyazaki",
    "producer": "Isao Takahata",
    "release_date": "1986",
    "rt_score": "95"

  },
  {
    "title": "From Up on Poppy Hill",
    "director": "Gorō Miyazaki",
    "producer": "Toshio Suzuki",
    "release_date": "2011",
    "rt_score": "83"
  },
  {
    "title": "My Neighbor Totoro",
    "director": "Hayao Miyazaki",
    "producer": "Hayao Miyazaki",
    "release_date": "1988",
    "rt_score": "93"
  },
  {
    "title": "Spirited Away",
    "director": "Hayao Miyazaki",
    "producer": "Toshio Suzuki",
    "release_date": "2001",
    "rt_score": "97"
  }
]

// Test filtrado en orden alfabetico 

describe('filterAZ ordena todas las peliculas en orden de la A a la Z', () => {
  it('Debería retornar una función', () => {
    expect(typeof filterAZ).toBe('function');
  });

  it('Debería retornar las peliculas en orden asc [Castle in the Sky],[From Up on Poppy Hill],[My Neighbor Totoro],[Spirited Away]', () => {
    let dataAscendente = filterAZ(dataGhibli);
    expect(dataAscendente[0].title).toEqual('Castle in the Sky');
    expect(dataAscendente[1].title).toEqual('From Up on Poppy Hill');
    expect(dataAscendente[2].title).toEqual('My Neighbor Totoro');
    expect(dataAscendente[3].title).toEqual('Spirited Away');
  });
});

describe('filterZA ordena todas las peliculas en orden de la Z a la A', () => {
  it('Debería retornar una función', () => {
    expect(typeof filterZA).toBe('function');
  });

  it('Debería retornar todas las peliculas en forma descendente [Spirited Away],[My Neighbor Totoro],[From Up on Poppy Hill],[Castle in the Sky]', () => {

    let dataDescendente = filterZA(dataGhibli);

    expect(dataDescendente[3].title).toEqual('Castle in the Sky');
    expect(dataDescendente[2].title).toEqual('From Up on Poppy Hill');
    expect(dataDescendente[1].title).toEqual('My Neighbor Totoro');
    expect(dataDescendente[0].title).toEqual('Spirited Away');
  });
});

// Prueba filtrado por director

describe('filterDataDirector retorna las peliculas según el director seleccionado', () => {
  it('Debería retornar una función', () => {
    expect(typeof filterDataDirector).toBe('function');
  });

  it('Debería retornar para el director Gorō Miyazaki: la pelicula [From Up on Poppy Hill]', () => {

    let dataDirector = filterDataDirector(dataGhibli, ["Gorō Miyazaki"]);
    expect(dataDirector[0].title).toEqual('From Up on Poppy Hill');
  });

  it('Debería retornar el director seleccionado: Gorō Miyazaki', () => {
    let dataDirector = filterDataDirector(dataGhibli, ["Gorō Miyazaki"]);
    expect(dataDirector[0].director).toEqual('Gorō Miyazaki');
  });

});

// Prueba filtrado por Productor:

describe('productor retorna las peliculas según el productor seleccionado', () => {
  it('Debería retornar una función', () => {
    expect(typeof filterDataProducer).toBe('function');
  });

  it('Debería retornar para el productor Isao Takahata: la pelicula [Castle in the Sky]', () => {

    let dataProductor = filterDataProducer(dataGhibli, ["Isao Takahata"]);
    expect(dataProductor[0].title).toEqual('Castle in the Sky');
  });
  it('Debería retornar al productor seleccionado', () => {

    let dataProductor = filterDataProducer(dataGhibli, ["Toshio Suzuki"]);
    expect(dataProductor[0].producer).toEqual('Toshio Suzuki');
  });
});

// Test filtrado por orden de año.

describe('filterDataYearAsc retorna las peliculas ordenadas según año Ascendente', () => {
  it('Debería retornar una función', () => {
    expect(typeof filterDataYearAsc).toBe('function');
  });

  it('Debería retornar peliculas en orden [Castle in the Sky],[My Neighbor Totoro],[Spirited Away],[From Up on Poppy Hill] ', () => {

    let dataYear = filterDataYearAsc(dataGhibli);

    expect(dataYear[0].title).toEqual('Castle in the Sky');
    expect(dataYear[1].title).toEqual('My Neighbor Totoro');
    expect(dataYear[2].title).toEqual('Spirited Away');
    expect(dataYear[3].title).toEqual('From Up on Poppy Hill');
  });
});

describe('filterDataYearDesc retorna las peliculas ordenadas según año Descendente', () => {
  it('Debería retornar una función', () => {
    expect(typeof filterDataYearDesc).toBe('function');
  });

  it('Debería retornar las peliculas en orden [From Up on Poppy Hill],[Spirited Away], [My Neighbor Totoro], [Castle in the Sky]', () => {
    let dataYear = filterDataYearDesc(dataGhibli);

    expect(dataYear[0].title).toEqual('From Up on Poppy Hill');
    expect(dataYear[1].title).toEqual('Spirited Away');
    expect(dataYear[2].title).toEqual('My Neighbor Totoro');
    expect(dataYear[3].title).toEqual('Castle in the Sky');


  });
});

// Test funcción compute

describe('compute retorna las peliculas con puntaje mayor o igual a 96', () => {
  it('Debería retornar una función', () => {
    expect(typeof compute).toBe('function');
  });
  it('Debería retornar todas las peliculas con mayor puntaje', () => {
    let filterComputeData = compute(dataGhibli);

    expect(filterComputeData[0].title).toEqual('Spirited Away');
  });
});