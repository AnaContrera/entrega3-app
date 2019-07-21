import React from 'react';
import "../App.js";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    paper: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(2, 0),
      width: '100%'
    },
    textField: {
      marginRight: theme.spacing(4),
      width: 300,
    },
    textArea: {
    },
    dense: {
      marginTop: 19,
    },
    button: {
      margin: theme.spacing(1),
    },
    menu: {
      width: 200,
    }
  });

class Contacto extends React.Component {
  
     constructor (props) {
      super(props);
    
      this.state = {
       Contact:{
          name: "",
          email: "",
          phone: "",
          description: ""
        }
      };
      
}    
Envio=() => {
    alert('Muchas gracias! Nos contactaremos contigo a la brevedad.');   
      
    
    }
      render() { 
      return (<div className="Contacto">

<form className={this.props.classes.container} noValidate autoComplete="off">
        <Paper className={this.props.classes.paper}>
            <Typography variant="h5">
            Escríbenos tu consulta
          </Typography>

          <TextField
            id="contactName"
            label="Nombre"
            className={this.props.classes.textField}
           
            
            margin="normal"
          />

          <TextField
            id="contactEmail"
            label="Email"
            className={this.props.classes.textField}
            
            
            margin="normal"
          />

          <TextField
            id="contactPhone"
            label="Teléfono"
            className={this.props.classes.textField}
            
            
            margin="normal"
          />
    <TextField
            id="description"
            label="Descripción"
            className={this.props.classes.textArea}
            placeholder="Escribe aquí tus comentarios"
            helperText="Escribe aquí tus comentarios"
            fullWidth
            margin="normal"
            
           
          />

        </Paper>

        <div>
          <Button variant="contained" className={this.props.classes.button} onClick={this.props.gotolist}>
            Cancelar
        </Button>
          <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.Envio}>
            Enviar
          </Button>
        </div>
      </form>

      </div>

      )
    }     
  }
      export default withStyles(styles)(Contacto);