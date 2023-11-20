const express = require('express');
const CatagoryRouter = express.Router();

CatagoryRouter.get('/:id', (req, res) => {
    res.send("hello from api/todo!")
});

module.exports = {
    CatagoryRouter: CatagoryRouter
}