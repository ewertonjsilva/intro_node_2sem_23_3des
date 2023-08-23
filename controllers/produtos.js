const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {
            const sql = 'SELECT prd_id, prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao FROM produtos;'; 
            const produtos = await db.query(sql);
            return response.status(200).json(produtos[0]);
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
            const { prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao } = request.body;
            const sql = 'INSERT INTO produtos (prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
            const values = [prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao];
            const confirmacao = await db.query(sql, values); 
            const prd_id = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Cadastro de produto realizado com sucesso', message: prd_id});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};