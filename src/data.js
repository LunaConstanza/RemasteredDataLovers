// Ordena las peliculas de la A a la Z y de la Z a la A
// 'localeCompare' permite comprarar dos cadenas teniendo en cuenta acentos y otras características específicas de cada idioma para la ordenación. Lo mejor de todo, es que esta función devuelve -1, 1 o 0 según si es mayor, menor o igual, que es exactamente lo que necesitamos:

export const sortAlphabetic = (data, key) => {
  const sortLetters = data.sort((a, b) => {
    if (key === 0) {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });
  return sortLetters;
}

//filtro por director
export const filterDataDirector = (data, nameDirector) => {
  const newDataDirector = data.filter(movie => movie.director == nameDirector);
  return newDataDirector;
}

//filtro por productor
export const filterDataProducer = (data, nameProducer) => {
  const newDataProducer = data.filter(movie => movie.producer == nameProducer);
  return newDataProducer;
}

export const sortDataYear = (data, key) => {
  const dataYear = data.sort((a, b) => {
    if (key === 0) {
      return a.release_date - b.release_date;
    } else {
      return b.release_date - a.release_date;
    }
  });
  return dataYear;
}

// Filter los con mejores puntaje
export const compute = (data) => {
  let scoreCompute = data.filter(movie => movie.rt_score >= 96);
  return scoreCompute;
}
