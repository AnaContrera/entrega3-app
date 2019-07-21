import React from 'react';
import './App.css';
import './bootstrap/dist/css/bootstrap.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import Lists from './components/List.js';
import Registro from './components/Registro.js';
import Blog from './components/Blog.js';
import Contacto from './components/Contacto.js';
import Inicial from './components/Inicial.js';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Navbar } from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Carrito from "./components/Carrito.js";
import Addedproducts from "./components/Addedproduct.js";


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSection: "Inicial",
      Products: [
        {
          Id: "1",
          Name: <h5>"Lijadora Roto orbital 350w Prescott"</h5>,
          Imagen: "../images/producto1.JPG",
          Descripción: "POTENCIA 350 W     MEDIDA PAD 115 MM  220-240V 50/60 Hz VELOCIDAD 13000 r/min Garantía oficial de 1 año",
          Precio: "1506",
          Categoría: "Herramientas"

        },
        {
          Id: "2",
          Name: <h5>"Faroles Coloniales"</h5>,
          Imagen: "../images/producto2.png",
          Descripción: "DESDE $ 480 !!! ENVIOS A TODO EL PAÍS!",
          Precio: "480",
          Categoría: "Iluminación"
        },
        {
          Id: "3",
          Name: <h5>"Faroles Coloniales2"</h5>,
          Imagen: "../images/producto2.png",
          Descripción: "DESDE $ 480 !!! ENVIOS A TODO EL PAÍS!",
          Precio: "480",
          Categoría: "Sanitaria"
        },
        {
          Id: "4",
          Name: <h5>"Faroles Coloniales3"</h5>,
          Imagen: "../images/producto2.png",
          Descripción: "DESDE $ 480 !!! ENVIOS A TODO EL PAÍS!",
          Precio: "480",
          Categoría: "Sanitaria"
        }],
      Productsadded: [{
        Id: '',
        Name: '',
        Precio: ""
        

      }
      ],
  };
  }


  
  addtocart = (productadded) => {
    
    this.setState({
      Productsadded: [...this.state.Productsadded, {
        Id: productadded.Id,
        Name: productadded.Name,
        Precio: productadded.Precio
      }]
    })

    this.gotocarrito();
  };


  gotolist = () => {
    this.setState({ currentSection: "list" });
  };

  gotocarrito = () => {
    this.setState({ currentSection: "carrito" });
  };

  gotoinicial = () => {
    this.setState({ currentSection: "Inicial" });
  };
  gotoregistro = () => {
    this.setState({ currentSection: "Contacto" });
  };

  deleteProduct = (Id) => {
    this.setState({
      Productsadded: this.state.Productsadded.filter(item => item.Id !== Id)
    })
    this.gotocarrito();
  }


  renderCurrentSection() {

    switch (this.state.currentSection) {
      
      case 'list':
        return (
          <Lists Products={this.state.Products}
            gotocarrito={this.gotocarrito}
            addtocart={this.addtocart}
            Productsadded={this.state.Productsadded}
            setCantidad={this.setCantidad}

          />);

      case 'Contacto':
        return (
          <Contacto
          gotolist={this.gotolist}/>
        );
      case 'carrito':
        return (
          <Carrito gotocarrito={this.gotocarrito}
            Productsadded={this.state.Productsadded}
            deleteProduct={this.deleteProduct}
            gotolist={this.gotolist}
          />
        );
      case 'Inicial':
      default:
        return <Inicial />;
    }
  }
  render() {
    return (
      <div className="App1">
        <div className="HeaderyNavbar">

          <header>

            <div>

              <img src="images/logo.png" className="logo" id="imagenpequena"></img>

              <button className="btn btn-secondary" type="button" id="botonnav" onClick={this.gotoinicial}>Inicio</button>
              <button className="btn btn-secondary" type="button" id="botonnav" onClick={this.gotolist}>Productos</button>
              <button className="btn btn-secondary" type="button" id="botonnav" onClick={this.gotoregistro}>Contacto</button>
              <button onClick={this.gotocarrito}><AddShoppingCartIcon /></button>

            </div>

          </header>

        </div>
        <div className="body">
          {this.renderCurrentSection()}
        </div>
        <div className="Footer"> <label For="email">Recibir ofertas:</label>

          <input type="email" id="email" placeholder="Ingrese email" />
          <label For="email">Cuentanos tu experiencia</label>
          <label For="email">Sobre nosotros</label>
        </div>
      </div>

    );
  }
}

export default App;
