import { Request, Response } from 'express';
import pool from '../database';
class ObjetivoController {
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO objetivo set ?",
            [req.body]);
        res.json(resp); 
    }
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const idCliente = req.body.idCliente;
        const consulta = `SELECT * FROM objetivo WHERE id_cliente ='${idCliente}'`
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
        const idObjetivo = req.body.idObjetivo;
        const consulta =`SELECT * FROM objetivo WHERE id_objetivo = '${idObjetivo}'`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'objetivo no encontrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE objetivo set ? WHERE id_objetivo = ?", [req.body, id]);
        res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const idObjetivo = req.body.id_objetivo;
        const resp = await pool.query(`DELETE FROM objetivo WHERE id_objetivo= ${idObjetivo}`);
        res.json(resp);
    }
}
export const objetivoController = new ObjetivoController();