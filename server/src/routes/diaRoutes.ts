import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { diaController } from '../controllers/diaController';
import { validarToken } from '../middleware/auth';
class DiaRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //Create
        this.router.post('/create', diaController.create);
        //Read
        this.router.get('/list', validarToken,diaController.list);
        this.router.post('/lookName',validarToken, diaController.lookName);
        //Uptade
        this.router.put('/update/:id', diaController.update);
        //Delete
        this.router.delete('/delete/:id',diaController.delete);
    }

}
export const diaRoutes = new DiaRoutes();

export default diaRoutes.router;