"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoutes = void 0;
const express_1 = require("express");
const notesConroller_1 = require("../controllers/notesConroller");
const auth_1 = require("../middleware/auth");
class NotesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Create
        this.router.post('/create', notesConroller_1.notesController.create);
        //read
        this.router.get('/list/:id', auth_1.validarToken, notesConroller_1.notesController.list);
        //Uptade
        this.router.put('/update/:id', notesConroller_1.notesController.update);
    }
}
exports.notesRoutes = new NotesRoutes();
exports.default = exports.notesRoutes.router;
