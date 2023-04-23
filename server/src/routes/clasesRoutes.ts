import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { clasesController } from  '../controllers/clasesController'
import { validarToken } from '../middleware/auth';
class ClasesRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //Create
        this.router.post('/create', clasesController.create);
        //Read
        this.router.get('/listOne/:id',validarToken, clasesController.listOne);
        this.router.get('/list', validarToken, clasesController.list);
        this.router.post('/lookName', validarToken,clasesController.lookName);
        //Uptade
        this.router.put('/update/:id',clasesController.update);
        //Delete
        this.router.delete('/delete/:id',clasesController.delete);
    }

}
export const clasesRoutes = new ClasesRoutes();

export default clasesRoutes.router;