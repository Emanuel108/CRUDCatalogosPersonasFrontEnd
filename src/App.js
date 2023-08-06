import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';
import MyNavbar from './components/MyNavbar';


const url = 'http://localhost:57678/People/';

class App extends Component {

  state = {
    data: [],
    modalAgregar: false,
    modalEliminar: false,
    form: {
      id: '',
      name: '',
      lastName: '',
      address: '',
      email: '',
      phone: '',
      gender: '',
      tipoModal: ''
    }
  }

  //función que realiza una petición para obtener un listado de personas
  getPeople = () => {
    axios.get(url, {
    })
    .then(response => {
      this.setState({data: response.data.people})
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.message);
    })
  }

  //función que realiza una petición para crear un nuevo registro de persona
  postPeople = async () => {
    delete this.state.form.id;
    axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      name: this.state.form.name,
      lastName: this.state.form.lastName,
      address: this.state.form.address,
      email: this.state.form.email,
      phone: this.state.form.phone,
      gender: this.state.form.gender
    })
    .then(response => {
      this.modalAgregar();
      this.getPeople();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.message);
    })
  }

  //función que realiza una petición para actualizar un registro de persona
  putPeople = async () => {
    axios.put(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      id: this.state.form.id,
      name: this.state.form.name,
      lastName: this.state.form.lastName,
      address: this.state.form.address,
      email: this.state.form.email,
      phone: this.state.form.phone,
      gender: this.state.form.gender
    })
    .then(response => {
      this.modalAgregar();
      this.getPeople();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.message);
    })
  }

   //función que realiza una petición para eliminar un registro
  deletePeople = async () => {
    axios.delete(url + this.state.form.id, {
    })
    .then(response => {
      this.setState({modalEliminar: false});
      this.getPeople();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.message);
    })
  }

  modalAgregar = () => {
    this.setState({modalAgregar: !this.state.modalAgregar})
  }

  seleccionarPersona = (persona) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: persona.id,
        name: persona.name,
        lastName: persona.lastName,
        address: persona.address,
        email: persona.email,
        phone: persona.phone,
        gender: persona.gender
      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  componentDidMount() {
    this.getPeople();
  }

  render() {
    const {form} = this.state;
    return (
      <div className="App">
        <MyNavbar />
        <div className='container'>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button className='btn btn-primary' onClick={() => {this.setState({form: null, tipoModal: 'agregar'}); this.modalAgregar()}}>Agregar nueva persona</button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Domicilio</th>
                <th>Correo electrónico</th> 
                <th>Teléfono</th>
                <th>Genero</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(people => {
                return (
                  <tr>
                    <td>{people.id}</td>
                    <td>{people.name}</td>
                    <td>{people.lastName}</td>
                    <td>{people.address}</td>
                    <td>{people.email}</td>
                    <td>{people.phone}</td>
                    <td>{people.gender}</td>
                    <td>
                      <button className='btn btn-secondary' onClick={() => {this.seleccionarPersona(people); this.modalAgregar()}}>Editar</button>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => {this.seleccionarPersona(people); this.setState({modalEliminar: true})}}>Eliminar</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        <Modal isOpen = {this.state.modalAgregar}>
            <ModalHeader style={{display: 'block'}}>
              <h2>{this.state.tipoModal == 'agregar' ? 'Agregar nueva persona' : 'Editar persona'}</h2>
            </ModalHeader>
            <ModalBody>
              <div className='form-group'>
                <input className='form-control' type='hidden' name='id' id='id' disabled={true} onChange={this.handleChange} value={form?form.id: ''}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Nombre: </label>
                <input className='form-control' type='text' name='name' id='name' onChange={this.handleChange} value={form?form.name: ''}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='lastName'>Apellidos: </label>
                <input className='form-control' type='text' name='lastName' id='lastName' onChange={this.handleChange} value={form?form.lastName: ''}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='address'>Domicilio: </label>
                <input className='form-control' type='text' name='address' id='address' onChange={this.handleChange} value={form?form.address: ''}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Correo electrónico: </label>
                <input className='form-control' type='text' name='email' id='email' onChange={this.handleChange} value={form?form.email: ''}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Teléfono: </label>
                <input className='form-control' type='text' name='phone' id='phone' onChange={this.handleChange} value={form?form.phone: ''}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='gender'>Género: </label>
                <input className='form-control' type='text' name='gender' id='gender' onChange={this.handleChange} value={form?form.gender: ''}></input>
              </div>
            </ModalBody>
            <ModalFooter>
              {
                this.state.tipoModal == 'agregar' ? <button className='btn btn-primary' onClick={() => this.postPeople()}>Agregar</button> :
                <button className='btn btn-success' onClick={() => this.putPeople()}>Actualizar</button>
               
              }
              <button className='btn btn-secondary' onClick={() => this.modalAgregar()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen = {this.state.modalEliminar}>
            <ModalBody>
              <h2>¿Está usted seguro de eliminar a la persona {form && form.name}</h2>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={() => this.deletePeople()}>Si, eliminar</button>
              <button className='btn btn-secondary' onClick={() => this.setState({modalEliminar: false})}>Cancelar</button>
            </ModalFooter>
        </Modal>



        </div>
      </div>
    );
  }
}



export default App;
