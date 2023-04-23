"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tareaRoutes = void 0;
const express_1 = require("express");
const tareaController_1 = require("../controllers/tareaController");
const auth_1 = require("../middleware/auth");
class TareaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Create
        this.router.post('/create', tareaController_1.tareaController.create);
        //Read
        this.router.post('/list', auth_1.validarToken, tareaController_1.tareaController.list);
        this.router.post('/listOne/', auth_1.validarToken, tareaController_1.tareaController.listOne);
        //Uptade
        this.router.put('/update/:id', tareaController_1.tareaController.update);
        //Delete
        this.router.post('/delete', tareaController_1.tareaController.delete);
    }
}
exports.tareaRoutes = new TareaRoutes();
exports.default = exports.tareaRoutes.router;
