import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { notesController } from '../controllers/notesConroller';
import { validarToken } from '../middleware/auth';
class NotesRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //Create
        this.router.post('/create', notesController.create);
        //read
        this.router.get('/list/:id', validarToken,notesController.list);
        //Uptade
        this.router.put('/update/:id', notesController.update);
    }

}
export const notesRoutes = new NotesRoutes();

export default notesRoutes.router;