import express, { Request, Response, NextFunction, response } from 'express';
import { request } from 'http';
import { MongoClient, Collection, Db } from "mongodb";
import { connectMongo,} from "./functions";
import { Ranger } from "./types";
import { v4 as uuidv4 } from "uuid";
const bodyParser = require('body-parser');

//To access from terminal: curl http://localhost:6969/

//Inicio express
const app = express();

//Conexión a mongoDB
const cole = connectMongo();

//Contexto
app.set("db", cole);

let x:number = 7;
app.set("numero", x);

//--------------------------> Acción antes de cada request

app.use(async (req, res, next) => {

    next();
});
//Pasar body a json entendible
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------> Test Ok
app.get("/test", async (req:Request, res:Response)=>{
    res.status(200).send("Recruit a team of teenagers with attitude.");
})



//--------------------------> SignIn into mongo
app.post("/SignIn", async (req:Request, res:Response)=>{
    const db = await req.app.get("db");
    
    const RangerDB: Ranger = await db.collection("Rangers").findOne({ user: req.body.user }) as Ranger;

    //Existe ranger ---> Error
    if (RangerDB) {
        res.status(409).send(`Zordon has already called a Power Ranger named ${RangerDB.user}`);
    }

    //No existe ranger ---> Ok, se registra en db
    else {
        const RangerIn: Ranger = {
            color: req.body.color,
            user: req.body.user,
            zord: req.body.zord
        }

        const registrar = db.collection("Rangers").insertOne(RangerIn).then((elem: any) => {
            res.status(200).send(`You've been choosen to fight Rita Repulsa evil forces\rName: ${RangerIn.user}\rColor: ${RangerIn.color}\rZord: ${RangerIn.zord}`);
        }).catch((error: any) => {
            res.status(500).send(`Something went wrong, wait for Alpha 5 to fix it\nError:${error}`);
        });

    }
})



//--------------------------> Devolver todos los Rangers
app.get('/MorphinTime', async(req:Request, res:Response)=>{
    const db = await req.app.get("db");
    const RangersDB: Ranger[] = await db.collection("Rangers").find().toArray() as Ranger[];
    res.json(RangersDB);
})



//--------------------------> Delete ranger on mongo
app.delete("/Delete", async (req:Request, res:Response)=>{
    const db = await req.app.get("db");
    
    const RangerDB: Ranger = await db.collection("Rangers").findOne({ user: req.body.user }) as Ranger;

    //Existe ranger ---> Eliminarlo de la db
    if (RangerDB) {
        db.collection("Rangers").deleteOne({ user: req.body.user}).then(
            res.status(200).send(`Zordon will never call again the Ranger ${RangerDB.user}`)
        )
        
    }

    //No existe ranger ---> Error
    else {
        res.status(404).send(`The ranger ${req.body.user} has never been called by Zordon`);
    }
})




//--------------------------> Ejecución de servidor
const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Express working on port ${port}\n\r`)
});