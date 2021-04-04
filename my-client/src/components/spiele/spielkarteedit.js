import React, { Component } from 'react';
import {saveSpiel} from '../../services/SpieleService.js';
import {deleteSpiel} from '../../services/SpieleService.js';
import {updateSpiel} from '../../services/SpieleService.js';
import {saveImage} from '../../services/SpieleService.js';

import { Image, ButtonToolbar, ButtonGroup, Button, Form, FormGroup, FormControl, Container, Row, Col, FormLabel} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash, faUserFriends, faClock, faSave, faUndo, faTimes} from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash, faUserFriends, faClock, faSave, faUndo, faTimes )

// class ConfirmDelete extends Component {
//   render() {
//     return(
//       <React.Fragment>
//         <div className='confirm-inner'>
//           <h5>Möchtest Du das Spiel wirklich löschen? </h5>
//           <ButtonToolbar>
//               <Button variant="secondary">
//                 Abbrechen
//               </Button>
//               {' '}
//               <Button variant="danger">
//                 Löschen
//               </Button>
//
//           </ButtonToolbar>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

export default class SpielKarteEdit extends Component {

  constructor(props) {
      super(props);
      this.state = {
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
        uploading: false,
        images: [],
        selectedFile: null,
      };

      // This binding is necessary to make `this` work in the callback
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.inputOpenFileRef = React.createRef();
  }

  showOpenFileDlg = (e) => {
    console.log("showOpenFileDlg start");
    this.inputOpenFileRef.current.click();
    console.log("showOpenFileDlg end");
  }

  onChange = (e) => {
    console.log("onChange start" + e.target.files[0]);

    this.setState({
      selectedFile: e.target.files[0]
    });

    this.setState({ uploading: true });

    console.log("onChange end");
  }

  handleUpdate(e){
    // Speichert das geaenderte Spiel in die DB

    //const formData = new FormData();
    //formData.append('image', this.state.selectedFile, this.state.selectedFile.name);

    //saveImage(formData);
    //console.log('FormData: '+ formData);
    //console.log('FormData.image: '+ formData.getAll('image'));

    updateSpiel(this.state.aktuellesSpiel);
    this.props.updateSpiel(this.state.aktuellesSpiel);
    this.props.hideModal();
  }

  handleDelete(e){
    // Löscht das Spiel aus dem Speicher und der DB
    if(window.confirm('Möchtest Du das Spiel "'+ this.state.aktuellesSpiel.titel +'" wirklich löschen?')){
      deleteSpiel(this.state.aktuellesSpiel);
      this.props.removeSpiel(this.state.aktuellesSpiel);
    }
    this.props.hideModal();
  }

  handleCancel(e){
    // Verwirft die Aenderungen
    this.state.aktuellesSpiel = this.state.originalSpiel;
    this.props.hideModal();
  }

  handleChange(e, field){
    // Behandelt Aenderungen in der Eingabemaske
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
        <div>
          <div>
            <ButtonToolbar className="float-right">
              <ButtonGroup>
                <Button variant='light' onClick={this.handleCancel}>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <input ref={this.inputOpenFileRef} type="file" accept=".jpg" style={{display:"none"}} onChange={this.onChange}/>
          <Image className="card-img-top"
            src={"../images/spiel_" + this.props.spiel.id + ".jpg"}
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
          <div className="spiel-card-edit-footer" align="center">
            <Container>
              <Row className="justify-content-md-center">
                <Col xs lg="2">
                  <Button onClick={this.handleDelete}>Löschen</Button>
                </Col>
                <Col md="auto"></Col>
                <Col xs lg="2">
                  <Button disabled={JSON.stringify(this.state.originalSpiel) == JSON.stringify(this.state.aktuellesSpiel)} onClick={this.handleUpdate}>Speichern</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
      );
    }
}
