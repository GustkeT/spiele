import React, { Component } from 'react';
import {saveSpiel} from '../../services/SpieleService.js';
import {deleteSpiel} from '../../services/SpieleService.js';
import {updateSpiel} from '../../services/SpieleService.js';

import { Image, ButtonToolbar, ButtonGroup, Button, Form, FormGroup, FormControl, Col, FormLabel} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock, faSave, faUndo, faBan} from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash, faUserFriends, faClock, faSave, faUndo, faBan)

const Modal = ({ show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='confirm'>
        {children}
      </section>
    </div>
  );
};

class ConfirmDelete extends Component {
  render() {
    return(
      <React.Fragment>
        <div className='confirm-inner'>
          <h5>Möchtest Du das Spiel wirklich löschen? </h5>
          <ButtonToolbar>
              <Button variant="secondary">
                Abbrechen
              </Button>
              {' '}
              <Button variant="danger">
                Löschen
              </Button>

          </ButtonToolbar>
        </div>
      </React.Fragment>
    );
  }
}

export default class SpielKarteEdit extends Component {

  constructor(props) {
      super(props);
      this.state = {
        show: false,
        spiel: {},
        aktuellesSpiel: {
          id: this.props.spiel.id,
          titel: this.props.spiel.titel,
          autor: this.props.spiel.autor,
          minspieler: this.props.spiel.minspieler,
          maxspieler: this.props.spiel.maxspieler,
          dauer: this.props.spiel.dauer
        },
        originalSpiel: {
          id: this.props.spiel.id,
          titel: this.props.spiel.titel,
          autor: this.props.spiel.autor,
          minspieler: this.props.spiel.minspieler,
          maxspieler: this.props.spiel.maxspieler,
          dauer: this.props.spiel.dauer
        },
      };

      // This binding is necessary to make `this` work in the callback
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  handleUpdate(e){
    updateSpiel(this.state.aktuellesSpiel);
    this.props.updateSpiel(this.state.aktuellesSpiel);
    this.props.hideModal();
  }

  handleDelete(e){
    //this.showModal();
    if(window.confirm('Möchtest Du das Spiel "'+ this.state.aktuellesSpiel.titel +'" wirklich löschen?')){
      deleteSpiel(this.state.aktuellesSpiel);
      this.props.removeSpiel(this.state.aktuellesSpiel);
    }
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
            <Modal show={this.state.show}> <ConfirmDelete hideModal={this.hideModal}/></Modal>
            <Image className="card-img-top"
              src={"../images/spiel_" + this.state.aktuellesSpiel.id + ".jpg"}
              onError={(e)=>{
                e.target.onerror = null;
                e.target.src="../images/spiel_0.jpg"
              }} responsive />
              <div className="spiel-card-body card-body ">
                <Form>
                  <FormGroup>
                    <Col componentClass={FormLabel} className="cardEditLabel">
                      Titel
                    </Col>
                    <Col>
                      <FormControl
                        type="text"
                        placeholder="Titel"
                        value={this.state.aktuellesSpiel.titel}
                        onChange={e => this.handleChange(e,"titel")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={FormLabel} className="cardEditLabel">
                      Autor
                    </Col>
                    <Col>
                      <FormControl
                        type="text"
                        placeholder="Autor"
                        value={this.state.aktuellesSpiel.autor}
                        onChange={e => this.handleChange(e,"autor")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={FormLabel} className="cardEditLabel">
                      Mitspieler min
                    </Col>
                    <Col>
                      <FormControl
                        type="text"
                        placeholder="Mitspieler min"
                        value={this.state.aktuellesSpiel.minspieler}
                        onChange={e => this.handleChange(e,"minspieler")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={FormLabel} className="cardEditLabel">
                      Mitspieler max
                    </Col>
                    <Col>
                      <FormControl
                        type="text"
                        placeholder="Mitspieler max"
                        value={this.state.aktuellesSpiel.maxspieler}
                        onChange={e => this.handleChange(e,"maxspieler")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={FormLabel} className="cardEditLabel">
                      Dauer
                    </Col>
                    <Col>
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
                      <FontAwesomeIcon icon="ban" />
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
