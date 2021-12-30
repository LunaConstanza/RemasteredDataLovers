// estas funciones son de ejemplo

export const example = () => {
  return 'example';
};


// Ordena las peliculas de la A a la Z y de la Z a la A

/*Si son iguales, devolveremos 0.
Si "a" debe ir ordenado antes que "b", entonces devolvemos un número menor que 0.
Si "a" debe ir ordenado después que "b", entonces devolvemos un número mayor que 0.

'localeCompare' permite comprarar dos cadenas teniendo en cuenta acentos y otras características específicas de cada idioma para la ordenación. Lo mejor de todo, es que esta función devuelve -1, 1 o 0 según si es mayor, menor o igual, que es exactamente lo que necesitamos:

*/
export const filterAZ = (data) => {
  const sortLettersAZ = data.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  return sortLettersAZ;
}
export const filterZA = (data) => {
  const sortLetterZA = data.sort((a, b) => {
    return b.title.localeCompare(a.title);
  });
  return sortLetterZA;
}

/* 
export const filterDirector = (data) => {
  const filterDataDirector
}

*/


//Ordenar por año Asc
export const filterDataYearAsc = (data) => {
  const filterDataYear = data.sort((a, b) => {
    return a.release_date - b.release_date;
  });
  return filterDataYear;
}

// Ordenar por año Desc
export const filterDataYearDesc = (data) => {
  const filterDataYearDes = data.sort((a, b) => {
    return b.release_date - a.release_date;
  });
  return filterDataYearDes;
} 