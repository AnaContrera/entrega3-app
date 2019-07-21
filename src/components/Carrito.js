import React from 'react';
import "../App.js";
import Addedproducts from "./Addedproduct.js";
import Button from '@material-ui/core/Button';


        

class Carrito extends React.Component {
       constructor (props) {
      super(props);
  
    }   
       
    ConfirmOrder=() => {
        alert('Muchas gracias por tu compra. Nos contactaremos contigo a la brevedad.');
    
}    

     render() {
       
        return ( 
            
        <div className="Carritodecompras">
            <div class="container">
        <div className="row">
            <div className="col-12">
            <div className="row">
            <div className="col-8">
                <h2>Tus productos:</h2>
            </div>
            
            <table id="products-list" className="table">
                    <thead>
                  <div>
                   <div>
                        <th> Eliminar</th>
                        
                        <th>   Producto</th>
                       
                        <th>  Precio </th>
                        
                        <th>    Cantidad </th>
                        
                        <th>    Subtotal
                            </th>
                            <th>    Total
                            </th>
                           </div>
</div>
                    </thead>
                    
                    
        <tbody>
                                 
                    {this.props.Productsadded.map(item => <Addedproducts                        
                   productadded={item} key={item.Id}                  
                   deleteProduct={this.props.deleteProduct}
                   Productsadded={this.props.Productsadded}
                   
                   
                   />)
                   }   
                
              
               </tbody>
 
              </table>
           
              </div>     
        </div>
        </div>
      
                     
        </div>
        <br></br>
                            <br></br>
                      
                      < Button variant="contained" color="primary" value='Confirm Order' onClick={this.ConfirmOrder} >Confirmar compra</Button>
                      
                        < Button variant="contained" value='Confirm Order' onClick={this.props.gotolist} >Cancelar</Button> 

                        <br></br>
                        <br></br>
        </div>
            )}};
     export default Carrito;