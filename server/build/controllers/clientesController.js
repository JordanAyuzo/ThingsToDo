"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientesController = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ClientesController {
    buscaliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const user = req.body.nombre;
            const consulta = `SELECT * FROM cliente WHERE nombre ='${user}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log("Verificando");
            if (respuesta.length == 0) {
                console.log("null");
                res.json(null);
                return;
            }
            else {
                res.json(respuesta[0]);
                return;
            }
        });
    }
    recuperacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const user = req.body.nombre;
            const words = req.body.word;
            const consulta = `SELECT * FROM cliente WHERE nombre ='${user}' and word = '${words}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log("Verificando");
            if (respuesta.length == 0) {
                console.log("null");
                res.json(null);
                return;
            }
            else {
                res.json(respuesta[0]);
                return;
            }
        });
    }
    logcliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const user = req.body.nombre;
            const passw = req.body.pasword;
            const consulta = `SELECT * FROM cliente WHERE nombre ='${user}'`;
            const respuesta = yield database_1.default.query(consulta);
            console.log("Verificando");
            if (respuesta.length == 0) {
                console.log("null");
                res.json(null);
                return;
            }
            else {
                const isMatch = yield bcryptjs_1.default.compare(passw, respuesta[0].pasword);
                if (isMatch) {
                    res.json(respuesta[0]);
                    return;
                }
                else {
                    console.log("encontrado pero contrase;a incorrecta");
                    res.json(null);
                    return;
                }
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const consulta = 'SELECT * FROM cliente';
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const id = req.body.id;
            const consulta = 'SELECT * FROM cliente WHERE id_cliente = ' + id;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.pasword = yield bcryptjs_1.default.hash(req.body.pasword, salt);
            const resp = yield database_1.default.query("INSERT INTO cliente set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.pasword = yield bcryptjs_1.default.hash(req.body.pasword, salt);
            const resp = yield database_1.default.query("UPDATE cliente set ? WHERE id_cliente = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM cliente WHERE id_cliente= ${id}`);
            res.json(resp);
        });
    }
}
exports.clientesController = new ClientesController();
