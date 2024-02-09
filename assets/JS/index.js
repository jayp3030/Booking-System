
let destinations;


// reading JSOn data stored in json file
const url = '../data/data.json';
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    destinations = data.destinations;
    console.log(destinations[0]);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });