import React from 'react';
import PropTypes from 'prop-types';
import SpielKarte from './spielkarte';


const getSpiele = (spiele, removeSpiel, updateSpiel) => {
    return (
        <div className="card-deck">
          {spiele.map(spiele => <SpielKarte removeSpiel={removeSpiel} updateSpiel={updateSpiel} key={spiele.id} spiel={spiele} />)}
        </div>
    );
};

const Spielliste = (props) => (
  <div>
      {getSpiele(props.spiele, props.removeSpiel, props.updateSpiel)}
  </div>
);

Spielliste.defaultProps = {
    spiele: []
};

Spielliste.propTypes = {
    spiele: PropTypes.array
};

export default Spielliste;
