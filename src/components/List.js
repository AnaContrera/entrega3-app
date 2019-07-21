import React from 'react';
import "./List.css";
import "../App.js";
import Cardsm from "./Card.js";
import Carrito from"./Carrito.js";
import { Grid, Paper, Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



class Lists extends React.Component {
  
    constructor (props) {
      super(props);

    
      this.state = {
        CategoriaFilter: ''
      }
     };
  
      handleCategoriaFilterChange1 = (event) => {
        this.setState({
          CategoriaFilter: "Sanitaria"
        })
      }
      handleCategoriaFilterChange2 = (event) => {
        this.setState({
          CategoriaFilter: "Iluminación"
        })
      }
      handleCategoriaFilterChange3 = (event) => {
        this.setState({
          CategoriaFilter: "Herramientas"
        })
      }
      handleCategoriaFilterChange4 = (event) => {
        this.setState({
          CategoriaFilter: ""
        })
      }

    
    render() { 
     
      const filteredProducts = this.props.Products.filter(item => item.Categoría.includes(this.state.CategoriaFilter));
    
      return (

        <div className="container" id="categoriaycatalogo" >
         <div className="row">             
         
         <div className="col-3" id="categoria">
         <List>
        <ListItem className="Categoria" onClick={this.handleCategoriaFilterChange1} value={this.state.CategoriaFilter}>
        <ListItemText>Sanitaria</ListItemText></ListItem>
        <ListItem className="Categoria" onClick={this.handleCategoriaFilterChange2} value={this.state.CategoriaFilter}><ListItemText>Iluminación</ListItemText></ListItem>
        <ListItem className="Categoria" onClick={this.handleCategoriaFilterChange3} value={this.state.CategoriaFilter}><ListItemText>Herramientas</ListItemText></ListItem>
        <ListItem className="Categoria" onClick={this.handleCategoriaFilterChange4} value={this.state.CategoriaFilter}><ListItemText>Todo</ListItemText></ListItem>
        
         </List>
         </div>
       
      
      {filteredProducts.map(item => <Cardsm product={item} key={item.Id}   
        gotocarrito={this.props.gotocarrito} 
        addtocart={this.props.addtocart}
        Productsadded={this.props.Productsadded}
        setCantidad={this.props.setCantidad}
        />)}
        </div>
        
        </div>
  
      )
    }     
  }
export default Lists;