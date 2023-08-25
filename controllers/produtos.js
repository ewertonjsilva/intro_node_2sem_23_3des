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
    async editarProdutos(request, response) { 
        try {
            const { prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao } = request.body;
            const { prd_id } = request.params; 
            const sql = 'UPDATE produtos SET prd_nome = ?, prd_valor = ?, prd_unidade = ?, ptp_id = ?, prd_disponivel = ?, prd_img = ?, prd_destaque = ?, prd_img_destaque = ?, prd_descricao = ? WHERE prd_id = ?;';  
            const values = [prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao, prd_id];    
            const atualizacao = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados', "itensAtualizados": atualizacao[0].affectedRows});            

        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    }, 
    async apagarProdutos(request, response) { 
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { prd_id } = request.params;
            //const usu_id = request.headers.authorization; // Controle de acesso para execução das funções
    
            // comando de exclusão
            const sql = 'DELETE FROM produtos WHERE prd_id = ?'; 
            // definição de array com os parâmetros que receberam os valores do front-end
            const values = [prd_id];
            // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
            // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message:'Produto com id ' + prd_id + ' excluído com sucesso'}); 
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    }, 
};

