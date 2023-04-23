import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { tareaController } from '../controllers/tareaController';
import { validarToken } from '../middleware/auth';
class TareaRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //Create
        this.router.post('/create', tareaController.create);
        //Read
        this.router.post('/list',validarToken, tareaController.list);
        this.router.post('/listOne/', validarToken,tareaController.listOne);
        //Uptade
        this.router.put('/update/:id', tareaController.update);
        //Delete
        this.router.post('/delete',tareaController.delete);
    }

}
export const tareaRoutes = new TareaRoutes();

export default tareaRoutes.router;