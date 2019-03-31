import React from 'react';
import PropTypes from 'prop-types';
import SpielKarte from './spielkarte';


const getSpiele = (spiele, removeSpiel, updateSpiel, anzahlfilter) => {
  const result = (anzahlfilter == 0 ? spiele
               : (anzahlfilter == 6 ? spiele.filter(spiele => spiele.maxspieler >= anzahlfilter)
               : (spiele.filter(spiele => spiele.minspieler <= anzahlfilter && spiele.maxspieler >= anzahlfilter ))));
  return (
    <div className="card-deck">
      {result.map(spiele => <SpielKarte removeSpiel={removeSpiel} updateSpiel={updateSpiel} key={spiele.id} spiel={spiele} />)}
    </div>
  );
};

const Spielliste = (props) => (
  <div>
      {getSpiele(props.spiele, props.removeSpiel, props.updateSpiel, props.anzahlfilter)}
  </div>
);

Spielliste.defaultProps = {
    spiele: [],
    anzahlfilter: 0,
};

Spielliste.propTypes = {
    spiele: PropTypes.array
};

export default Spielliste;
