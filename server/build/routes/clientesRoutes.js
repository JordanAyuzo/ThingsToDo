"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientesRoutes = void 0;
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
const auth_1 = require("../middleware/auth");
class ClientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Create
        this.router.post('/create/', clientesController_1.clientesController.create);
        //Read
        //this.router.get('/', clientesController.list);
        this.router.post('/listOne/', auth_1.validarToken, clientesController_1.clientesController.listOne);
        this.router.post('/login/', auth_1.validarToken, clientesController_1.clientesController.logcliente);
        this.router.post('/find/', auth_1.validarToken, clientesController_1.clientesController.buscaliente);
        this.router.post('/recover/', auth_1.validarToken, clientesController_1.clientesController.recuperacion);
        //Uptade
        this.router.put('/update/:id', clientesController_1.clientesController.update);
        //Delete
        this.router.delete('/delete/:id', clientesController_1.clientesController.delete);
    }
}
exports.clientesRoutes = new ClientesRoutes();
exports.default = exports.clientesRoutes.router;
