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
exports.diaController = void 0;
const database_1 = __importDefault(require("../database"));
class DiaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO clase_dia set ?", [req.body]);
            res.json(resp);
        });
    }
    lookName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const nombre = req.body.nombre;
            const consulta = `SELECT * FROM dia WHERE nombre ='${nombre}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log("Verificando");
            if (respuesta.length == 0) {
                console.log("null");
                res.json(null);
                return;
            }
            else {
                res.json(respuesta);
                return;
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT dia.id_dia, dia.nombre AS nombre_dia, clase.id_clase, clase.nombre AS nombre_clase, clase_dia.id_relacion
        FROM clase_dia
        INNER JOIN dia ON clase_dia.id_dia = dia.id_dia
        INNER JOIN clase ON clase_dia.id_clase = clase.id_clase
        ORDER BY dia.id_dia;
        `;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log("Verificando");
            if (respuesta.length == 0) {
                console.log("null");
                res.json(null);
                return;
            }
            else {
                res.json(respuesta);
                return;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE clase_dia set ? WHERE id_relacion = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM clase_dia WHERE id_relacion = ${id}`);
            res.json(resp);
        });
    }
}
exports.diaController = new DiaController();
