
import { Request, Response } from 'express';
import pool from '../database';
class DiaController {
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO clase_dia set ?",[req.body]);
        res.json(resp);
    }

    public async lookName(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const nombre = req.body.nombre;
        const consulta = `SELECT * FROM dia WHERE nombre ='${nombre}'`
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

    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const consulta = `SELECT dia.id_dia, dia.nombre AS nombre_dia, clase.id_clase, clase.nombre AS nombre_clase, clase_dia.id_relacion
        FROM clase_dia
        INNER JOIN dia ON clase_dia.id_dia = dia.id_dia
        INNER JOIN clase ON clase_dia.id_clase = clase.id_clase
        ORDER BY dia.id_dia;
        `
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
        const resp = await pool.query("UPDATE clase_dia set ? WHERE id_relacion = ?", [req.body, id]);
        res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM clase_dia WHERE id_relacion = ${id}`);
        res.json(resp);
    }
}

export const diaController = new DiaController();