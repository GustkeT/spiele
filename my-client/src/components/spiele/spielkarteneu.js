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
          dauer: ''
        },
        isLoading: true,
        neuesSpielId: 0,
        uploading: false,
        images: [],
        selectedFile: null,
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

  onChange = (e) => {
    console.log("onChange start");
    this.setState({
      selectedFile: e.target.files[0]
    });

    const files = Array.from(e.target.files);
    console.log('files array: '+ files);

    this.setState({ uploading: true });
    console.log(e.target.files[0]);


    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file)
    });

    saveImage(formData);
    console.log(formData);

    console.log("onChange end");
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
    .catch(
      error => this.setState({error, isLoading: false})
    )
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
            <div>
              <input ref={this.inputOpenFileRef} type="file" accept=".jpg" style={{display:"none"}} onChange={this.onChange}/>
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
                //src={"../images/spiel_0.jpg"} responsive />
                src={this.state.selectedFile == null ? "../images/spiel_0.jpg" : "../images/temp.jpg"} responsive />
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
