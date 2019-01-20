import React, { Component } from 'react';
import {saveSpiel} from '../../services/SpieleService.js';

import { Image, ButtonToolbar, ButtonGroup, Button, FormGroup, FormControl} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash, faUserFriends, faClock, faUndo, faSave)


export default class SpielKarteNeu extends Component {

  constructor(props) {
      super(props);
      this.state = {
        neuesSpiel: {
          titel: '',
          autor: 'Rudi Hoffmann',
          mitspieler: '',
          dauer: ''
        },
      };

      // This binding is necessary to make `this` work in the callback
      this.handleSave = this.handleSave.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleSave(e){
    //neues Spiel speichern in der DB
    var neuesSpielId = saveSpiel(this.state.neuesSpiel);
    console.log(neuesSpielId);

    //TBD: wir vermuten, dass neuesSpielId die ID ist aber wir bekommen undefined (promisse)

    //kopiere neuesSpiel in lokaler Variable
    var tempSpiel = this.state.neuesSpiel;
    //neuesSpiel in der Liste anhängen
    this.props.attachSpiel(tempSpiel, neuesSpielId);

    //SpielKarteNeu wieder schließen
    this.props.hideModal();
  }

  handleCancel(e){
    //Reset state
    this.state.neuesSpiel.titel = '';
    this.state.neuesSpiel.autor = 'Rudi Hoffmann';
    this.state.neuesSpiel.mitspieler = '';
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
    return(
      <React.Fragment>
      <div className="spiel-card-neu">
          <div className="card">
            <Image className="card-img-top"
              src={"../images/spiel_0.jpg"} responsive />
              <div className="spiel-card-body card-body ">
                <form>
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
                      placeholder="Mitspieler"
                      value={this.state.neuesSpiel.mitspieler}
                      onChange={e => this.handleChange(e,"mitspieler")}
                    />
                    <FormControl
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Dauer"
                      value={this.state.neuesSpiel.dauer}
                      onChange={e => this.handleChange(e,"dauer")}
                    />
                  </FormGroup>
                </form>
              </div>
              <div>
                <ButtonToolbar className="float-right">
                  <ButtonGroup>
                    <Button onClick={this.handleCancel}>
                      <FontAwesomeIcon icon="undo" />
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
