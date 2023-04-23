"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clasesRoutes = void 0;
const express_1 = require("express");
const clasesController_1 = require("../controllers/clasesController");
const auth_1 = require("../middleware/auth");
class ClasesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Create
        this.router.post('/create', clasesController_1.clasesController.create);
        //Read
        this.router.get('/listOne/:id', auth_1.validarToken, clasesController_1.clasesController.listOne);
        this.router.get('/list', auth_1.validarToken, clasesController_1.clasesController.list);
        this.router.post('/lookName', auth_1.validarToken, clasesController_1.clasesController.lookName);
        //Uptade
        this.router.put('/update/:id', clasesController_1.clasesController.update);
        //Delete
        this.router.delete('/delete/:id', clasesController_1.clasesController.delete);
    }
}
exports.clasesRoutes = new ClasesRoutes();
exports.default = exports.clasesRoutes.router;
