import React from 'react';
import { Image, ButtonToolbar, ButtonGroup, Button, Col, Form, FormGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';

class ToolBar extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     test: true,
   };
 }

  render() {
    return (
      <div className="btn-toolbar justify-content-around">
      <Form inline>
        <FormGroup>
          <Col sm={4}>
            <DropdownButton id="dropdown-basic-button" title="Anzahl der Spieler">
              <Dropdown.Item href="#/action-1">alle</Dropdown.Item>
              <Dropdown.Item href="#/action-2">bis zu 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">3 bis 4</Dropdown.Item>
              <Dropdown.Item href="#/action-4">mindestens 5</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col sm={4}>
            <button onClick={this.props.showModal} type="button" className="btn btn-outline-secondary">Neues Spiel</button>
          </Col>
          <Col sm={4}>
            <FormControl
              type="text"
              placeholder="Suche"
            />
          </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default ToolBar;
