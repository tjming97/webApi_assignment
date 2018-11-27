//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

export class CharacterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let {
      my_id,
      name,
      gender,
      culture,
      born,
      aliases,
      character_image,
      father,
      mother,
      spouse
    } = this.props.character;
    return (
      <div>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>
                <center>ID</center>
              </th>
              <th>
                <center>Profile</center>
              </th>
              <th>
                <center>Gender</center>
              </th>
              <th>
                <center>Culture</center>
              </th>
              <th>
                <center>Aliases</center>
              </th>

              <th>
                <center>Action</center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '20px' }}>{my_id}</td>
              <td style={{ width: '200px' }}>
                <Card style={{ width: '200px' }}>
                  <CardImg top width="100%" src={character_image} />
                  <CardBody>
                    <CardTitle style={{ color: 'black' }}>{name}</CardTitle>
                  </CardBody>
                </Card>
              </td>
              <td style={{ width: '180px' }}>{gender}</td>
              <td style={{ width: '180px' }}>{culture}</td>

              <td style={{ width: '350px' }}>{aliases}</td>

              <td style={{ width: '80px' }}>
                {' '}
                <Button
                  color="danger"
                  onClick={() => this.props.removeCharacter(my_id)}
                >
                  Delete
                </Button>
                <div>
                  <Button
                    scolor="primary"
                    style={{ marginTop: '7px' }}
                    onClick={this.toggle}
                  >
                    {this.props.buttonLabel}
                    Details
                  </Button>{' '}
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.toggle}>{name}</ModalHeader>
                    <CardImg top width="100%" src={character_image} />
                    <ModalBody>{aliases}</ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CharacterCard;
