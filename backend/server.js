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

                res.send([]);
            }
        }
    );
});

/* OBTENER CANCIONES */

app.get('/canciones',(req,res)=>{

    const sql =
    `SELECT * FROM canciones`;

    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            res.send(err);

        }else{

            res.send(result);
        }
    });
});

/* CREAR PLAYLIST */

app.post('/crear-playlist',(req,res)=>{

    const {
        nombre,
        usuario_id
    } = req.body;

    const sql = `
    INSERT INTO playlists
    (nombre,usuario_id)
    VALUES(?,?)
    `;

    db.query(
        sql,
        [nombre,usuario_id],
        (err,result)=>{

            if(err){

                console.log(err);

                res.send(err);

            }else{

                res.send(
                "Playlist creada"
                );
            }
        }
    );
});

/* OBTENER PLAYLISTS */

app.get('/playlists',(req,res)=>{

    const sql =
    `SELECT * FROM playlists`;

    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            res.send(err);

        }else{

            res.send(result);
        }
    });
});

/* AGREGAR CANCION A PLAYLIST */

app.post('/agregar-cancion',(req,res)=>{

    const {
        playlist_id,
        cancion_id
    } = req.body;

    const sql = `
    INSERT INTO playlist_canciones
    (playlist_id,cancion_id)
    VALUES(?,?)
    `;

    db.query(
        sql,
        [playlist_id,cancion_id],
        (err,result)=>{

            if(err){

                console.log(err);

                res.send(err);

            }else{

                res.send(
                "Canción agregada"
                );
            }
        }
    );
});

app.listen(3000,()=>{

    console.log("Servidor corriendo");
});