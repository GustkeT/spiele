import React from 'react';
import { Image, ButtonToolbar, ButtonGroup, Button, Col, Form, FormGroup, FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons'

class ToolBar extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     test: true,
     suchbegriff: '',
   };
   this.handleChange = this.handleChange.bind(this);
 }

 handleChange(e) {
   this.setState({ suchbegriff: e.target.value }); // zur Anzeige im Suchfeld wichtig
   this.props.suchbegriff(e.target.value); // zur Übergabe an spiele.js
   }

  render() {
    return (
      <div className="btn-toolbar justify-content-around">
      <Form inline>
        <FormGroup>
          <Col sm={7}>
            <FontAwesomeIcon icon="user-friends" margin-right="1em"/>
            <button onClick={()=>this.props.anzahlfilter(0)} type="button" className="btn btn-outline-secondary">Alle</button>
            <button onClick={()=>this.props.anzahlfilter(1)} type="button" className="btn btn-outline-secondary">1</button>
            <button onClick={()=>this.props.anzahlfilter(2)} type="button" className="btn btn-outline-secondary">2</button>
            <button onClick={()=>this.props.anzahlfilter(3)} type="button" className="btn btn-outline-secondary">3</button>
            <button onClick={()=>this.props.anzahlfilter(4)} type="button" className="btn btn-outline-secondary">4</button>
            <button onClick={()=>this.props.anzahlfilter(5)} type="button" className="btn btn-outline-secondary">5</button>
            <button onClick={()=>this.props.anzahlfilter(6)} type="button" className="btn btn-outline-secondary">6+</button>
          </Col>
          <Col sm={2}>
            <button onClick={this.props.showModal} type="button" className="btn btn-outline-secondary">Neues Spiel</button>
          </Col>
          <Col sm={3}>
              <FormControl
                type="text"
                placeholder="Suche"
                onChange={this.handleChange}
                value={this.state.suchbegriff}
              />
          </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default ToolBar;
