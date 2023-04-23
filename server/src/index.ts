import express, { Application } from 'express'; //aplication
import morgan from 'morgan';
import cors from 'cors';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import indexRoutes from './routes/indexRoutes';
import clientesRoutes from './routes/clientesRoutes';
import objetivoRoutes from './routes/objetivoRoutes';
import tareaRoutes from './routes/tareaRoutes';
import clasesRoutes from './routes/clasesRoutes';
import diaRoutes from './routes/diaRoutes';
import notesRoutes from './routes/notesRoutes';
import fs from 'fs'; //libreria para guardar archivos
class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use(express.static(__dirname + "/img"));
        console.log(__dirname);

    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }
    routes(): void {
        this.app.use(indexRoutes);
        this.app.use("/api/cliente", clientesRoutes);
        this.app.use("/api/objetivo", objetivoRoutes);
        this.app.use("/api/tarea", tareaRoutes);
        this.app.use("/api/clases",clasesRoutes);
        this.app.use("/api/dia",diaRoutes);
        this.app.use("/api/notes",notesRoutes)
        this.app.post('/uploadImagen', (req, res) => {
            console.log("lo hizo");
            
            const file = req.body.src;
            const carpeta = req.body.carpeta;
            const name = req.body.id;
            console.log(file,carpeta,name);
    
            const binaryData =
            Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""),
            'base64').toString('binary');
            fs.writeFile(`${__dirname}/img/`+ carpeta +'/' + name + '.jpg', binaryData,
            "binary", (err) =>
            {
            console.log(err);
            });
            
            res.json({ fileName: name + '.jpg' });
            });
    
    }
    start (): void{
    this.app.listen(this.app.get('port'), () =>
        {console.log('Servidor se encuentra en el puerto: ',this.app.get('port'));});
}
}
const server = new Server();
server.start();