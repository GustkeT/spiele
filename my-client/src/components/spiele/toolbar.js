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
          <Col sm={3}>
            <DropdownButton id="dropdown-basic-button" title="Anzahl der Spieler">
              <Dropdown.Item href="#/action-1">egal</Dropdown.Item>
              <Dropdown.Item href="#/action-2">1 bis 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">3 bis 4</Dropdown.Item>
              <Dropdown.Item href="#/action-4">5 bis ...</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col sm={1}>
            <button onClick={this.props.anzahlfilter0} type="button" className="btn btn-outline-secondary">Alle</button>
          </Col>
          <Col sm={1}>
            <button onClick={this.props.anzahlfilter12} type="button" className="btn btn-outline-secondary">1-2</button>
          </Col>
          <Col sm={1}>
            <button onClick={this.props.anzahlfilter34} type="button" className="btn btn-outline-secondary">3-4</button>
          </Col>
          <Col sm={1}>
            <button onClick={this.props.anzahlfilter56} type="button" className="btn btn-outline-secondary">5+</button>
          </Col>
          <Col sm={3}>
            <button onClick={this.props.showModal} type="button" className="btn btn-outline-secondary">Neues Spiel</button>
          </Col>
          <Col sm={3}>
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
