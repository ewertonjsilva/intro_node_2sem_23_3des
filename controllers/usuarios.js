const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = 'SELECT usu_id, usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo FROM usuarios;'; 
            const usuarios = await db.query(sql);
            const nReg = usuarios[0].length; // mostrar na apostila somente numero de itens no resultado, itens como objeto e itens com registros
            return response.status(200).json({'nItens': nReg, 'itens': usuarios[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async cadastrarUsuarios(request, response) {
        try {
            const { usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo } = request.body;
            const sql = 'INSERT INTO usuarios (usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo) VALUES (?, ?, ?, ?, ?);';
            const values = [usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo];
            const confirmacao = await db.query(sql, values); 
            const usu_id = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Cadastro de produto realizado com sucesso', message: usu_id});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async editarUsuarios(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo } = request.body;
            // parâmetro recebido pela URL via params (valor direto na url ex: /usuarios/1). 
            const { usu_id } = request.params; 
            // instrução SQL para atualização dos valores
            const sql = 'UPDATE usuarios SET usu_nome = ?, usu_email = ?, usu_senha = ?, usu_tipo = ?, usu_ativo = ? WHERE usu_id = ?;';  
            // preparo do array com dados que serão atualizados
            const values = [usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo, usu_id];    
            // execução e obtenção de confirmação da atualização realizada
            const atualizacao = await db.query(sql, values);
            // reponde a requisição com a mensagem confirmando o nº de registros atualizados
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados', "registrosAtualizados": atualizacao[0].affectedRows});         
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async apagarUsuarios(request, response) {
        try {
            return response.status(200).json({confirma: 'Apagar Usuarios'});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};