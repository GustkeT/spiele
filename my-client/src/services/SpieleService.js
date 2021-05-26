
// import spiele from './spiele.json';
//
// export default class SpieleService {
//   fetchSpiele() {
//     return fetch('/api/spiele')
//       .then( (response) => response.json() );
//     }
// }

window.neuesSpielId = 0;

export function fetchSpiele() {
  return fetch('/api/spiele')
    .then( (response) => response.json() );
}

export async function saveSpiel(props) {

  var spieleProps = {
    titel: props.get("titel"),
    autor: props.get("autor"),
    minspieler: props.get("minspieler"),
    maxspieler: props.get("maxspieler"),
    dauer: props.get("dauer")
  };

  await fetch('/api/spiele', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spieleProps)
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
      }
      return Promise.reject(new Error(response.statusText))
    })    // Dieses .then(response...) ist dafür da um auf den http Status zu reagieren. Bei Erfog wird ein Promise zurückgegeben
  .then(response => response.json())      // Diese Zeile ist wichtig, damit wir mit dem nächsten .then(data) an die Rückgabewerte kommen
  .then(data => {  // ... und jetzt ist der Rückgabewert (Id des gespeicherten Spiels) in der Variable data verfügbar
    console.log('Request succeeded with JSON response', data)

    //Speichern in einer globalen Variablen
    window.neuesSpielId = data;

    const formData = new FormData();
    //Die Reihenfolge ist wichtig! In der Reihenfolge verarbeitet die Server api Seite die Informationen
    formData.append('imageID', data);
    formData.append('imageFile', props.get("imageFile"));
    saveImage(formData);
  })
  .catch(error => {
    console.log('Request failed', error)
  })
}

export function saveImage(props) {
  console.log("SpieleService - saveImage " + JSON.stringify(props))
  return fetch('/api/saveimage', {
    method: 'POST',
    body: props
  })
  .catch(console.error);
}

export function updateSpiel(props) {
  return fetch('/api/spiele/' + props.id, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(props)
})
.catch(console.error);
}

export function deleteSpiel(props) {
  return fetch('/api/spiele/' + props.id, {
    method: 'DELETE'
    })
    .catch(console.error);
}
