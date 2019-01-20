import React, { Component } from 'react';
import {saveSpiel} from '../../services/SpieleService.js';
import {deleteSpiel} from '../../services/SpieleService.js';
import {updateSpiel} from '../../services/SpieleService.js';

import { Image, ButtonToolbar, ButtonGroup, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock, faSave, faUndo} from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash, faUserFriends, faClock, faSave, faUndo)

export default class SpielKarteEdit extends Component {

  constructor(props) {
      super(props);
      this.state = {
        spiel: {},
        aktuellesSpiel: {
          id: this.props.spiel.id,
          titel: this.props.spiel.titel,
          autor: this.props.spiel.autor,
          mitspieler: this.props.spiel.mitspieler,
          dauer: this.props.spiel.dauer
        },
        originalSpiel: {
          id: this.props.spiel.id,
          titel: this.props.spiel.titel,
          autor: this.props.spiel.autor,
          mitspieler: this.props.spiel.mitspieler,
          dauer: this.props.spiel.dauer
        },
      };

      // This binding is necessary to make `this` work in the callback
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleUpdate(e){
    updateSpiel(this.state.aktuellesSpiel);
    this.props.hideModal();
  }

  handleDelete(e){
    deleteSpiel(this.state.aktuellesSpiel);
    this.props.hideModal();
  }

  handleCancel(e){
    //Reset state
    this.state.aktuellesSpiel = this.state.originalSpiel;
    this.props.hideModal();
  }

  handleChange(e, field){
    let value = e.target.value;
    this.setState(
      prevState =>({
        aktuellesSpiel: {
          ...prevState.aktuellesSpiel,
          [field]: value
        }
      }),
      () => console.log(this.state.aktuellesSpiel)
    );
  }


  render() {

    return(
      <React.Fragment>
      <div className="spiel-card-edit">
          <div className="card">
            <Image className="card-img-top"
              src={"../images/spiel_" + this.state.aktuellesSpiel.id + ".jpg"}
              onError={(e)=>{
                e.target.onerror = null;
                e.target.src="../images/spiel_0.jpg"
              }} responsive />
              <div className="spiel-card-body card-body ">
                <Form inline>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Titel
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        placeholder="Titel"
                        value={this.state.aktuellesSpiel.titel}
                        onChange={e => this.handleChange(e,"titel")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Autor
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        placeholder="Autor"
                        value={this.state.aktuellesSpiel.autor}
                        onChange={e => this.handleChange(e,"autor")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Mitspieler
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        placeholder="Mitspieler"
                        value={this.state.aktuellesSpiel.mitspieler}
                        onChange={e => this.handleChange(e,"mitspieler")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Dauer
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        placeholder="Dauer"
                        value={this.state.aktuellesSpiel.dauer}
                        onChange={e => this.handleChange(e,"dauer")}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </div>
              <div>
                <ButtonToolbar className="float-right">
                  <ButtonGroup>
                    <Button onClick={this.handleDelete}>
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                    <Button onClick={this.handleCancel}>
                      <FontAwesomeIcon icon="undo" />
                    </Button>
                    <Button disabled={JSON.stringify(this.state.originalSpiel) == JSON.stringify(this.state.aktuellesSpiel)} onClick={this.handleUpdate}>
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
