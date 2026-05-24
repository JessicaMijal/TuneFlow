const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* RUTA PRINCIPAL */

app.get('/',(req,res)=>{

    res.send("Servidor funcionando");
});

/* REGISTRO */

app.post('/register',(req,res)=>{

    const {
        nombre,
        correo,
        password
    } = req.body;

    const sql = `
    INSERT INTO usuarios
    (nombre,correo,password)
    VALUES(?,?,?)
    `;

    db.query(
        sql,
        [nombre,correo,password],
        (err,result)=>{

            if(err){

                console.log(err);

                res.send("Error");

            }else{

                res.send("Usuario registrado");
            }
        }
    );
});

/* LOGIN */

app.post('/login',(req,res)=>{

    const {
        correo,
        password
    } = req.body;

    const sql = `
    SELECT * FROM usuarios
    WHERE correo=? AND password=?
    `;

    db.query(
        sql,
        [correo,password],
        (err,result)=>{

            if(result.length > 0){

                res.send(result);

            }else{

                res.send("Usuario no encontrado");
            }
        }
    );
});

app.listen(3000,()=>{

    console.log("Servidor corriendo");
});