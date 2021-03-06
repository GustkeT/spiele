import React, { Component } from 'react';
import Spielliste from './spielliste';
import SpieleService from '../../services/SpieleService';
import Toolbar from './toolbar';
import SpielKarteNeu from './spielkarteneu';
import {Form, FormGroup, FormControl, Col, Modal} from 'react-bootstrap';


import {fetchSpiele} from '../../services/SpieleService.js';
import neuesSpiel from '../../services/spiele.json';

export default class Spiele extends Component {

  constructor() {
      super();
      this.state = {
          isLoading: true,
          spiele: [],
          error: null,
          show: false,
          anzahlSpieler: 0,
          suchbegriff: '',
      };
  }

  componentDidMount() {
    fetchSpiele()
      .then( data => {this.setState({
          spiele: data,
          isLoading : false,
        });
      })
      .catch(error => this.setState({error, isLoading: false}));
  }

  anzahlfilter  = (anzahlSpieler) => {
      this.setState({ anzahlSpieler: anzahlSpieler });
  }

  suchbegriff  = (suchbegriff) => {
      this.setState({ suchbegriff: suchbegriff });
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  attachSpiel = (neuesSpiel) => {

    console.log("attachSpiel " + window.neuesSpielId);

    var tempSpiel= {
      id: window.neuesSpielId,
      titel: neuesSpiel.titel,
      autor: neuesSpiel.autor,
      minspieler: neuesSpiel.minspieler,
      maxspieler: neuesSpiel.maxspieler,
      dauer: neuesSpiel.dauer
    };

    this.setState(({spiele}) => ({spiele: [...spiele, tempSpiel]}));

    //sortiere die Spieleliste nach titel
    this.state.spiele.sort(function(a, b) {
      var nameA = a.titel.toUpperCase(); // Gro�-/Kleinschreibung ignorieren
      var nameB = b.titel.toUpperCase(); // Gro�-/Kleinschreibung ignorieren
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // Namen m�ssen gleich sein
      return 0;
    });
  }

  removeSpiel = (spielToRemove) => {
    var index = this.state.spiele.findIndex(item => item.id === spielToRemove.id);
    if (index > -1) {
      this.state.spiele.splice(index,1);
    }
    this.setState(({spiele}) => ({spiele: spiele}));
    console.log('spiel to Remove' + JSON.stringify(spielToRemove) + index);
    console.log('removeSpiel !!!' + JSON.stringify(this.state.spiele));
  }

  updateSpiel = (spielToUpdate) => {
    var index = this.state.spiele.findIndex(item => item.id === spielToUpdate.id);
    if (index > -1) {
      this.state.spiele[index] = spielToUpdate;
    }
    this.setState(({spiele}) => ({spiele: spiele}));
    console.log('spiel to update' + JSON.stringify(spielToUpdate) + index);
    console.log('updateSpiel !!!' + JSON.stringify(this.state.spiele));
  }

  render() {
    const { isLoading, error } = this.state;

    return(
      <React.Fragment>
        {error ? <p>{error.message}</p> : null}
        <Toolbar showModal={this.showModal} anzahlfilter={this.anzahlfilter} suchbegriff={this.suchbegriff} />
        <div>
          <p>
          </p>
        </div>
        {!isLoading ? (
          <div className="container-fluid" style={{marginLeft: '-15px'}}>
              <div className="d-flex flex-row">
                  <div className="col-sm-12">
                      {console.log('spiele: render start' + this.state.spiele)}
                      <Modal show={this.state.show} onHide={this.hideModal}>
                        <SpielKarteNeu attachSpiel={this.attachSpiel} hideModal={this.hideModal}/>
                      </Modal>
                      <Spielliste removeSpiel={this.removeSpiel} updateSpiel={this.updateSpiel} spiele={this.state.spiele} anzahlfilter={this.state.anzahlSpieler} suchbegriff={this.state.suchbegriff} />
                      {console.log('spiele: render end' + this.state.spiele)}
                  </div>
              </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}
