import { Request, Response } from 'express';
import pool from '../database';
class ClasesController {

    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO clase set ?",
            [req.body]);
        res.json(resp);
    }


    public async lookName(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const nombre = req.body.nombre;
        const consulta = `SELECT * FROM clase WHERE nombre ='${nombre}'`
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

    public async listOne(req: Request, res: Response): Promise<void> {
        console.log(req.params);
        const { id } = req.params;
        const consulta = 'SELECT * FROM clase WHERE id_cliente = ' + id;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta);
            return;
        }
        res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
    }
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const consulta = `SELECT * FROM clase;`
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

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE clase set ? WHERE id_clase = ?", [req.body, id]);
        res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM clase WHERE id_clase= ${id}`);
        res.json(resp);
    }


}

export const clasesController = new ClasesController();