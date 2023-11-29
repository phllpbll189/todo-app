const express = require('express');
const CatagoryRouter = express.Router();
const {GetCatagories, InsertCat, UpdateCat, DeleteCat} = require('../Controllers/CatagoryController');

CatagoryRouter.get('/:id', GetCatagories);
CatagoryRouter.post('/:id', InsertCat);
CatagoryRouter.put('/:id', UpdateCat);
CatagoryRouter.delete('/:id', DeleteCat);

module.exports = {
    CatagoryRouter: CatagoryRouter
}