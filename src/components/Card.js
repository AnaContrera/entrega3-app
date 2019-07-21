import React from 'react';
import '../bootstrap/dist/css/bootstrap.css';
import "../App.js";
import "./Card.css";
import "./List.js";
import Button from '@material-ui/core/Button';


class Cardsm extends React.Component {
  constructor(props) {
    super(props);
    
    
   
  }

  
    render() { 

  return (

    <div className="col" id="listacatalogo">
    <div className="container">
    <div className="row">
     <div className="card" >
          <div className={this.props.product.Id} >
                
    <img src={this.props.product.Imagen} className="card-img-top"/><br/>
    <div className="card-body">
    
    <h5 className="card-title">{this.props.product.Name}</h5>
     <div className="card-text"><p>
     {this.props.product.Descripción}
     <br/>
     Precio: {this.props.product.Precio}</p>
     
     <br/>
    
          <br/>
     <Button variant="contained" color="primary" onClick={(e) => this.props.addtocart(this.props.product, e)}>
          Agregar </Button> 
     <br/></div>
     </div></div></div>
    </div></div></div>
   

          
         
     
  );

}}

export default  Cardsm;