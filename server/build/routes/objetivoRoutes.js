"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objetivoRoutes = void 0;
const express_1 = require("express");
const objetivoController_1 = require("../controllers/objetivoController");
const auth_1 = require("../middleware/auth");
class ObjetivoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Create
        this.router.post('/create', objetivoController_1.objetivoController.create);
        //Read
        this.router.post('/list', auth_1.validarToken, objetivoController_1.objetivoController.list);
        this.router.post('/listOne/', auth_1.validarToken, objetivoController_1.objetivoController.listOne);
        //Uptade
        this.router.put('/update/:id', objetivoController_1.objetivoController.update);
        //Delete
        this.router.post('/delete', objetivoController_1.objetivoController.delete);
    }
}
exports.objetivoRoutes = new ObjetivoRoutes();
exports.default = exports.objetivoRoutes.router;
