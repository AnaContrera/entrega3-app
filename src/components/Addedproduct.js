import React from 'react';
import "../App.js";
import "./Carrito.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class Addedproducts extends React.Component {
       constructor (props) {
      super(props);
      this.state = {Numbers: [{
          Cantidad:"1",
          Subtotal:"",
          Total:""
        }
        ]
      }
      
       }

       multiplicar =(state) => { 
this.setState((state) => {
  return {Subtotal:state.Cantidad*this.props.productadded.Precio}}); 
}



handleChange = Cantidad => event => {
this.setState({ [Cantidad]: event.target.value });
  this.multiplicar();
  this.calculateTotal();
   }


calculateTotal = (state) => {
this.setState((state)=>{
    return {Total: this.state.Numbers.reduce((accumulator) => {
        return accumulator + (state.Cantidad*this.props.productadded.Precio)
    }, 0)}});
    
    
}

render() {
             
        return (
            
               
          
     <div> 
         <tr> 
              
 <td><IconButton  aria-label="Delete" onClick={(e) => this.props.deleteProduct(this.props.productadded.Id,e)}> <DeleteIcon /> </IconButton>    </td> 
 
<td>{this.props.productadded.Name}</td>

<td > {this.props.productadded.Precio}</td>

<td>   
          <input name="Cantidad" type="number" placeholder="Indica la cantidad" value={this.Cantidad} onChange={this.handleChange("Cantidad")}/></td>
          <td>{this.state.Subtotal}</td>
          <td>{this.state.Total}</td>
         
          </tr>
        
</div>


            )}};
    export default Addedproducts;