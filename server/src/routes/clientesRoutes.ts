import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { clientesController } from '../controllers/clientesController';
import { validarToken } from '../middleware/auth';
class ClientesRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //Create
        this.router.post('/create/', clientesController.create);
        //Read
        //this.router.get('/', clientesController.list);
        this.router.post('/listOne/', validarToken,clientesController.listOne);
        this.router.post('/login/', validarToken,clientesController.logcliente);
        this.router.post('/find/', validarToken,clientesController.buscaliente);
        this.router.post('/recover/',validarToken, clientesController.recuperacion);
        //Uptade
        this.router.put('/update/:id', clientesController.update);
        //Delete
        this.router.delete('/delete/:id',clientesController.delete);
    }

}
export const clientesRoutes = new ClientesRoutes();

export default clientesRoutes.router;