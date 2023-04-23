import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { objetivoController } from '../controllers/objetivoController';
import { validarToken } from '../middleware/auth';
class ObjetivoRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //Create
        this.router.post('/create', objetivoController.create);
        //Read
        this.router.post('/list', validarToken,objetivoController.list);
        this.router.post('/listOne/', validarToken,objetivoController.listOne);
        //Uptade
        this.router.put('/update/:id', objetivoController.update);
        //Delete
        this.router.post('/delete',objetivoController.delete);
    }

}
export const objetivoRoutes = new ObjetivoRoutes();

export default objetivoRoutes.router;