import { Request, Response } from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs'

class ClientesController {
    public async buscaliente(req: Request, res: Response): Promise<void> {
        console.log(req.body);        
        const user = req.body.nombre;
        const consulta = `SELECT * FROM cliente WHERE nombre ='${user}'`
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log("Verificando");
        if (respuesta.length == 0) {
            console.log("null")
            res.json(null);
            return;
        } else {
            res.json(respuesta[0])
            return;
        }
    }
    public async recuperacion(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const user = req.body.nombre;
        const words = req.body.word;
        const consulta = `SELECT * FROM cliente WHERE nombre ='${user}' and word = '${words}'`
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log("Verificando");
        if (respuesta.length == 0) {
            console.log("null")
            res.json(null);
            return;
        } else {
            res.json(respuesta[0])
            return;
        }
    }

    public async logcliente(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const user = req.body.nombre;
        const passw = req.body.pasword;

        const consulta = `SELECT * FROM cliente WHERE nombre ='${user}'`
        const respuesta = await pool.query(consulta);
        console.log("Verificando");
        if (respuesta.length == 0) {
            console.log("null")
            res.json(null);
            return;
        } else {
            const isMatch= await bcrypt.compare(passw,respuesta[0].pasword)
            if(isMatch){
                res.json(respuesta[0])
                return;
            }else{
                console.log("encontrado pero contrase;a incorrecta")
                res.json(null);
            return;
            }
                
        }
    }
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        const consulta = 'SELECT * FROM cliente';
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        console.log(req.params);
        const id = req.body.id;
        const consulta = 'SELECT * FROM cliente WHERE id_cliente = ' + id;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
    }
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        req.body.pasword = await bcrypt.hash(req.body.pasword, salt);

        const resp = await pool.query("INSERT INTO cliente set ?",
            [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const salt = await bcrypt.genSalt(10);
        req.body.pasword = await bcrypt.hash(req.body.pasword, salt);
        const resp = await pool.query("UPDATE cliente set ? WHERE id_cliente = ?", [req.body, id]);
        res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM cliente WHERE id_cliente= ${id}`);
        res.json(resp);
    }


}

export const clientesController = new ClientesController();