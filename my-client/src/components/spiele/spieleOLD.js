import React, { Component } from 'react';
import Spielliste from './spielliste';
import SpieleService from '../../services/SpieleService';
import Toolbar from './toolbar';
import SpielKarteNeu from './spielkarteneu';

import { Grid, Row, Col } from 'react-bootstrap';

import {fetchSpiele} from '../../services/SpieleService.js';
import neuesSpiel from '../../services/spiele.json';

const Modal = ({ handleClose, show, children }) => {
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

  //First solution
  // constructor() {
  //     super();
  //     this.state = {
  //         spiele: [],
  //     };
  // }
  //
  // async componentDidMount() {
  //   try {
  //     console.log('spiele: componentDidMount start' + this.state.spiele);
  //     const response = await fetch('/api/spiele');
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     }
  //     const json = await response.json();
  //     this.setState({ spiele: json });
  //     console.log('spiele: componentDidMount end' + this.state.spiele);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  //
  // render() {
  //   if (this.state.spiele === null) {
  //     return (<div>"loading ... "</div>);
  //   } else {
  //     return (
  //     <div className="container-fluid" style={{marginLeft: '-15px'}}>
  //         <div className="d-flex flex-row">
  //             <div className="col-sm-12">
  //                 {console.log('spiele: render start' + this.state.spiele)}
  //                 <Spielliste spiele={this.state.spiele} />
  //                 {console.log('spiele: render end' + this.state.spiele)}
  //             </div>
  //         </div>
  //     </div>
  //   )};
  // }

  //Second solution
  constructor() {
      super();
      this.state = {
          isLoading: true,
          spiele: [],
          error: null,
          show: false,
      };
  }

  // fetchSpiele() {
  //   fetch('/api/spiele')
  //     .then(response => response.json())
  //     .then(data => this.setState({
  //       spiele: data,
  //       isLoading: false,
  //     }))
  //
  //   .catch(error => this.setState({error, isLoading: false}));
  // }

  componentDidMount() {
    //fetchSpiele in gleicher Klasse
    // this.fetchSpiele();

    //fetchSpiele in SpieleService
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

  render() {
    const { isLoading, spiele, error } = this.state;

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
                      <Modal show={this.state.show}> <SpielKarteNeu hideModal={this.hideModal}/></Modal>
                      <Spielliste spiele={this.state.spiele} />
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
