import React from 'react';
import PropTypes from 'prop-types';
import SpielKarte from './spielkarte';


const getSpiele = (spiele, removeSpiel, updateSpiel, anzahlfilter, suchbegriff) => {
  // Wenn kein Suchbegriff angegeben ist und kein Filter --> zeige alle Spiele
  //                                     und ein Filter  --> Zeige auf Spielerzahl gefilterte Liste an
  // Wenn Suchbegriff angegeben --> Zeige auf Suchbegriff gefilterte Liste an
  const result = (suchbegriff == '' ?
                 ((anzahlfilter == 0 ? spiele
                  : (anzahlfilter == 6 ? spiele.filter(spiele => spiele.maxspieler >= anzahlfilter)
                    : (spiele.filter(spiele => spiele.minspieler <= anzahlfilter && spiele.maxspieler >= anzahlfilter )))))
                : (spiele.filter(spiele => spiele.titel.toLowerCase().includes(suchbegriff.toLowerCase()))))
               ;
// TODO Lösung für: Filtern nach Anzahl, dann Buchstaben eintippen, dann Buchstaben löschen --> Anzahl-Filter bleibt gemerkt
  return (
    <div className="card-deck">
      {result.map(spiele => <SpielKarte removeSpiel={removeSpiel} updateSpiel={updateSpiel} key={spiele.id} spiel={spiele} />)}
    </div>
  );
};

const Spielliste = (props) => (
  <div>
      {getSpiele(props.spiele, props.removeSpiel, props.updateSpiel, props.anzahlfilter, props.suchbegriff)}
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
