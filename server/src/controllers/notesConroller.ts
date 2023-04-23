import { Request, Response } from 'express';
import pool from '../database';
class NotesController {
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO block set ?", [req.body]);
        res.json(resp);
    }
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.params);
        const { id } = req.params;
        const consulta = 'SELECT * FROM block WHERE id_cliente =' + id;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta);
            return;
        }else{
            res.json(null)
            return;
        }
        res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE block set ? WHERE id_cliente = ?", [req.body, id]);
        res.json(resp);
    }
}

export const notesController = new NotesController();