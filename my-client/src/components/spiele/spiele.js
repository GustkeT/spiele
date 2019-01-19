import React, { Component } from 'react';
import Spielliste from './spielliste';
import SpieleService from '../../services/SpieleService';
import Toolbar from './toolbar';
import SpielKarteNeu from './spielkarteneu';

import {fetchSpiele} from '../../services/SpieleService.js';
import neuesSpiel from '../../services/spiele.json';

const Modal = ({ show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
      </section>
    </div>
  );
};

export default class Spiele extends Component {

  constructor() {
      super();
      this.state = {
          isLoading: true,
          spiele: [],
          error: null,
          show: false,
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

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  attachSpiel = (neuesSpiel) => {
    this.setState(({spiele}) => ({spiele: [...spiele, neuesSpiel]}));
  }

  removeSpiel = (spielToRemove) => {
    let filteredArray = this.state.spiele.filter(item => item != spielToRemove)
    this.setState({spiele: filteredArray});
  }

  render() {
    const { isLoading, error } = this.state;

    return(
      <React.Fragment>
        {error ? <p>{error.message}</p> : null}
        <Toolbar/>
        <button onClick={this.showModal} type="button" className="btn btn-outline-secondary">Neues Spiel</button>
        {!isLoading ? (
          <div className="container-fluid" style={{marginLeft: '-15px'}}>
              <div className="d-flex flex-row">
                  <div className="col-sm-12">
                      {console.log('spiele: render start' + this.state.spiele)}
                      <Modal show={this.state.show}> <SpielKarteNeu attachSpiel={this.attachSpiel} hideModal={this.hideModal}/></Modal>
                      <Spielliste removeSpiel={this.removeSpiel} spiele={this.state.spiele} />
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
