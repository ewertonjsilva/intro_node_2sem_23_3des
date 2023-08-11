const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarpedidoProdutos(request, response) {
        try {
            return response.status(200).json({confirma: 'Produtos no pedido'});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};