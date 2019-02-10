import React, { Component } from 'react';
import {saveSpiel} from '../../services/SpieleService.js';

import { Image, ButtonToolbar, ButtonGroup, Button, Form, FormGroup, FormControl} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock, faUndo, faBan, faSave } from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash, faUserFriends, faClock, faUndo, faBan, faSave)


export default class SpielKarteNeu extends Component {

  constructor(props) {
      super(props);
      this.state = {
        neuesSpiel: {
          titel: '',
          autor: '',
          minspieler: '',
          maxspieler: '',
          dauer: ''
        },
        isLoading: true,
        neuesSpielId: 0,
      };

      // This binding is necessary to make `this` work in the callback
      this.handleSave = this.handleSave.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  reloadSpiel(){
    var tempSpiel = this.state.neuesSpiel;
    //neuesSpiel in der Liste anhängen
    this.props.attachSpiel(tempSpiel, this.state.neuesSpielId);
    //SpielKarteNeu wieder schließen
    this.props.hideModal();
    this.setState({isLoading : true});

    //Reset state
    this.state.neuesSpiel.titel = '';
    this.state.neuesSpiel.autor = '';
    this.state.neuesSpiel.minspieler = '';
    this.state.neuesSpiel.maxspieler = '';
    this.state.neuesSpiel.dauer = '';
  }

  handleSave(e){
    //neues Spiel speichern in der DB
    saveSpiel(this.state.neuesSpiel)
    .then( data => {this.setState({
        neuesSpielId: data,
        isLoading : false,
      })
    })
    .catch(error => this.setState({error, isLoading: false}));
  }

  handleCancel(e){
    //Reset state
    this.state.neuesSpiel.titel = '';
    this.state.neuesSpiel.autor = '';
    this.state.neuesSpiel.minspieler = '';
    this.state.neuesSpiel.maxspieler = '';
    this.state.neuesSpiel.dauer = '';

    this.props.hideModal();
  }

  handleChange(e, field){
    let value = e.target.value;
    //check if entered value is valid (checks the pattern in FormControl)
    if(e.target.validity.valid) {
      this.setState(
        prevState =>({
          neuesSpiel: {
            ...prevState.neuesSpiel,
            [field]: value
          }
        }),
        () => console.log(this.state.neuesSpiel)
      );
    }
  }

  render() {
    const { isLoading, error } = this.state;

    return(
      <React.Fragment>
      {!isLoading ? (
        this.reloadSpiel()
      ) : (console.log('Loading...'))}

        <div className="spiel-card-neu">
            <div className="card">
              <Image className="card-img-top"
                src={"../images/spiel_0.jpg"} responsive />
                <div className="spiel-card-body card-body ">
                  <Form>
                    <FormGroup>
                      <FormControl
                        type="text"
                        placeholder="Titel"
                        value={this.state.neuesSpiel.titel}
                        onChange={e => this.handleChange(e, "titel")}
                      />
                      <FormControl
                        type="text"
                        placeholder="Autor"
                        value={this.state.neuesSpiel.autor}
                        onChange={e => this.handleChange(e,"autor")}
                      />
                      <FormControl
                        type="text"
                        pattern="[0-9]*"
                        placeholder="Mitspieler min"
                        value={this.state.neuesSpiel.minspieler}
                        onChange={e => this.handleChange(e,"minspieler")}
                      />
                      <FormControl
                        type="text"
                        pattern="[0-9]*"
                        placeholder="Mitspieler max"
                        value={this.state.neuesSpiel.maxspieler}
                        onChange={e => this.handleChange(e,"maxspieler")}
                      />
                      <FormControl
                        type="text"
                        pattern="[0-9]*"
                        placeholder="Dauer"
                        value={this.state.neuesSpiel.dauer}
                        onChange={e => this.handleChange(e,"dauer")}
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div>
                  <ButtonToolbar className="float-right">
                    <ButtonGroup>
                      <Button onClick={this.handleCancel}>
                        <FontAwesomeIcon icon="ban" />
                      </Button>
                      <Button onClick={this.handleSave}>
                        <FontAwesomeIcon icon="save" />
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </div>
            </div>
        </div>
      </React.Fragment>
      );
    }
}
