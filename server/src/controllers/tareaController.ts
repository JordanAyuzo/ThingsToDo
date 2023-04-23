import { Request, Response } from 'express';
import pool from '../database';
class TareaController {
    public async listOne(req: Request, res: Response): Promise<void> {
        console.log(req.params);
        const idtarea = req.body.idTarea;
        const idCliente= req.body.idCliente
        const consulta =`SELECT * FROM tarea WHERE id_tarea = '${idtarea}'  and id_cliente ='${idCliente}'`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
    }
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const idCliente = req.body.idCliente;
        const consulta = `SELECT * FROM tarea WHERE id_cliente ='${idCliente}'`
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log("Verificando");
        if (respuesta.length == 0) {
            console.log("null")
            res.json(null);
            return;
        } else {
            res.json(respuesta)
            return;
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO tarea set ?",[req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE tarea set ? WHERE id_tarea = ?", [req.body, id]);
        res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const idTarea = req.body.id_tarea;
        const resp = await pool.query(`DELETE FROM tarea WHERE id_tarea= ${idTarea}`);
        res.json(resp);
    }


}

export const tareaController = new TareaController();