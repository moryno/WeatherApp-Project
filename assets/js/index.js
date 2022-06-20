// const init = () => {
//     fetchDefaultData()
// }

// const fetchDefaultData = () => {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'de8a4e002fmsh2ca3932a2a0910bp1100d5jsn05d96592f9f8',
//             'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//         }
//     };
//     fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', options)
//         .then(response => response.json())
//         .then(response => findEx(response))
//         .catch(err => console.error(err));
// }

// init();



const init = () => {
    fetchDefaultData()
}

const fetchDefaultData = () => {
  
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd8b0d12ba3msh38e30c06b42d375p1ba990jsne3b6255da171',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };
    
    fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=Nairobi', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

init();

