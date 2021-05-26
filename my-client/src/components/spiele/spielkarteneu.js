import React, { Component } from 'react';
import {saveSpiel} from '../../services/SpieleService.js';
import {saveImage} from '../../services/SpieleService.js';
import { Image, ButtonToolbar, ButtonGroup, Button, Form, FormGroup, FormControl, Container, Row, Col} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock, faUndo, faBan, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash, faUserFriends, faClock, faUndo, faBan, faSave, faTimes)

export default class SpielKarteNeu extends Component {

  //private readonly inputOpenFileRef : RefObject<HTMLInputElement>

  constructor(props) {
      super(props);
      this.state = {
        neuesSpiel: {
          titel: '',
          autor: '',
          minspieler: '',
          maxspieler: '',
          dauer: '',
          imageFile: null
        },
        selectedFile: null
      };

      // This binding is necessary to make `this` work in the callback
      this.handleSave = this.handleSave.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.inputOpenFileRef = React.createRef();
  }

  showOpenFileDlg = (e) => {
    console.log("showOpenFileDlg start");
    this.inputOpenFileRef.current.click();
    console.log("showOpenFileDlg end");
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files[0]) {

      // speichere das handle des bildes wenn es ausgewählt ist
      // das neueSpiel temporär speichern
      var neuesSpielTemp = {...this.state.neuesSpiel}

      // das bild in die neueSpiel Struktur speichern
      neuesSpielTemp.imageFile = e.target.files[0];
      this.setState({neuesSpiel: neuesSpielTemp});

      console.log("neuesSpiel mit imageFile " + this.state.neuesSpiel);

      // lade das bild
      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({selectedFile: event.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleSave(e){
    const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));

    console.log('handleSave - neuesSpiel', this.state.neuesSpiel);

    // bereite die formData vor
    const formData = new FormData();
    formData.append('titel', this.state.neuesSpiel.titel);
    formData.append('autor', this.state.neuesSpiel.autor);
    formData.append('minspieler', this.state.neuesSpiel.minspieler);
    formData.append('maxspieler', this.state.neuesSpiel.maxspieler);
    formData.append('dauer', this.state.neuesSpiel.dauer);
    formData.append('imageFile', this.state.neuesSpiel.imageFile);

    //neues Spiel speichern in der DB
    saveSpiel(formData)

    //mit dem wait(1000) warten wir 1 Sekunde befvor wir das neue Spiel in die
    //Liste anhängen, weil wir sonst die ID des neuen Spiels nicht haben
    wait(2000).then(() => {
        console.log("waited for 2 seconds");
        throw new Error("error occurred");
    }).catch(() => {
      //neuse Spiel in die vorhandene SpieleListe anhängen
      this.props.attachSpiel(this.state.neuesSpiel);

      //Schliesse das modal
      this.props.hideModal();
    });
  }

  handleCancel(e){
    //Reset state
    this.state.neuesSpiel.titel = '';
    this.state.neuesSpiel.autor = '';
    this.state.neuesSpiel.minspieler = '';
    this.state.neuesSpiel.maxspieler = '';
    this.state.neuesSpiel.dauer = '';
    this.state.neuesSpiel.imageFile = null;

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
            <div>
              <input ref={this.inputOpenFileRef} type="file" accept="image/*" name="cover" style={{display:"none"}} onChange={this.onSelectFile}/>

              {/* x-Button in Toolbar zum Schliessen des Fensters */}
              <div>
                <ButtonToolbar className="float-right">
                  <ButtonGroup>
                    <Button variant='light' onClick={this.handleCancel}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>

              <Image onClick={this.showOpenFileDlg} className="card-img-top"
                src={this.state.selectedFile == null ? "../images/spiel_0.jpg" : this.state.selectedFile} responsive />

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
              <div className="spiel-card-edit-footer" align="center">
                <Container>
                  <Row className="justify-content-md-center">
                    <Col xs lg="2">
                      <Button onClick={this.handleSave}>Speichern</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
        </div>
      </React.Fragment>
      );
    }
}
