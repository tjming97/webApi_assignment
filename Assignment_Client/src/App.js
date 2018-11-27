// heroku : serene-fortress-82984
import React, { Component } from 'react';
import './App.css';
import CharacterCard from './CharacterCard';
import Carousal from './Carousal';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      alertVisible_addedSuccess: false,
      alertVisible_DeleteSuccess: false,
      name: '',
      my_id: '',
      characters: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ alertVisible_addedSuccess: false });
    this.setState({ alertVisible_DeleteSuccess: false });
  }

  getAllCharacters = () => {
    axios
      .get('https://sleepy-castle-28951.herokuapp.com/getallcharacters')
      .then(result => {
        this.setState({ characters: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCharacters();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://sleepy-castle-28951.herokuapp.com/addCharacter?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data == 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ alertVisible_addedSuccess: true });
          setTimeout(() => {
            this.setState({ alertVisible_addedSuccess: false });
          }, 2000);

          this.getAllCharacters();
        }
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeCharacter(my_id) {
    this.setState({ alertVisible_DeleteSuccess: true });
    setTimeout(() => {
      this.setState({ alertVisible_DeleteSuccess: false });
    }, 1000);

    this.setState({
      characters: this.state.characters.filter(character => {
        if (character.my_id !== my_id) return character;
      })
    });
    const query = `https://sleepy-castle-28951.herokuapp.com/deletecharacter?my_id=${my_id}`;

    axios
      .get(query)
      .then(result => {
        console.log(result);
        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let characterCards = this.state.characters.map(character => {
      return (
        <Col sm="12" key={character.my_id}>
          <CharacterCard
            removeCharacter={this.removeCharacter.bind(this)}
            character={character}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <h1 style={{ padding: '20px', color: '#996600' }} />
        <Container>
          <Jumbotron id="jumboheader" />

          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.alertVisible_addedSuccess}
                toggle={this.onDismiss}
              >
                Character Added
              </Alert>

              <Alert
                color="warning"
                isOpen={this.state.alertVisible_DeleteSuccess}
                toggle={this.onDismiss}
              >
                Character Deleted
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit} inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter character name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{characterCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
