import React from 'react';
import "./Inicial.css";
import '../bootstrap/dist/css/bootstrap.css';
import Gridinicial from "./gridinicial.js"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {carousel} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';



class Inicial extends React.Component {
    constructor (props) {
      super(props);
        
     }
    
  render() {
             
     return ( 
     <div className="Inicialmodelo">
     <div className="Carrusell" >
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="images/portada.png" alt="First slide"></img>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="images/carrusell2.jpg" alt="Second slide"></img>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="images/carrusell3.jpg" alt="Third slide"></img>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
  </div>
  </div>
<div classname="Grid" >
      <Gridinicial />
      </div> 
     </div>)}}
     

export default Inicial;