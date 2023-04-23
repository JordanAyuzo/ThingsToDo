"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diaRoutes = void 0;
const express_1 = require("express");
const diaController_1 = require("../controllers/diaController");
const auth_1 = require("../middleware/auth");
class DiaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Create
        this.router.post('/create', diaController_1.diaController.create);
        //Read
        this.router.get('/list', auth_1.validarToken, diaController_1.diaController.list);
        this.router.post('/lookName', auth_1.validarToken, diaController_1.diaController.lookName);
        //Uptade
        this.router.put('/update/:id', diaController_1.diaController.update);
        //Delete
        this.router.delete('/delete/:id', diaController_1.diaController.delete);
    }
}
exports.diaRoutes = new DiaRoutes();
exports.default = exports.diaRoutes.router;
