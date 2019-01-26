
// import spiele from './spiele.json';
//
// export default class SpieleService {
//   fetchSpiele() {
//     return fetch('/api/spiele')
//       .then( (response) => response.json() );
//     }
// }

export function fetchSpiele() {
  return fetch('/api/spiele')
    .then( (response) => response.json() );
}

export function saveSpiel(props) {
  return fetch('/api/spiele', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props)
  })
  .then( (response) => response.json() );
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
