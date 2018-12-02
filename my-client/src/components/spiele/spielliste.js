import React from 'react';
import PropTypes from 'prop-types';
import SpielKarte from './spielkarte';


const getSpiele = (spiele) => {
    return (
        <div className="card-deck">
          {spiele.map(spiele => <SpielKarte key={spiele.id} spiele={spiele} />)}
        </div>
    );
};

const Spielliste = (props) => (
  <div>
      {getSpiele(props.spiele)}
  </div>
);

Spielliste.defaultProps = {
    spiele: []
};

Spielliste.propTypes = {
    spiele: PropTypes.array
};

export default Spielliste;
