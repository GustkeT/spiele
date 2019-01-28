import React from 'react';
import { Image, ButtonToolbar, ButtonGroup, Button, Col, Form, FormGroup, FormControl } from 'react-bootstrap';

class ToolBar extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     test: true,
   };
 }

  render() {
    return (
      <div className="btn-toolbar justify-content-between">
      <Form inline>
        <FormGroup>
          <Col lg={4}>
            <button onClick={this.props.showModal} type="button" className="btn btn-outline-secondary">Neues Spiel</button>
          </Col>
          <Col lg={8}>
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
