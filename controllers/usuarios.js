const db = require('../database/connection'); 

module.exports = {
    async listarUsuarios(request, response) {
        try {
            // armazena instruções SQL na constante
            const sql = 'SELECT usu_id, usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo = 1 as usu_ativo FROM usuarios;'; 
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena na constante o número de registros que a instrução SELECT retornou
            const nReg = usuarios[0].length;
            // retorna os registros no formato JSON
            return response.status(200).json(
                {
                    confirma: 'Sucesso', 
                    message: 'Usuários cadastrados', 
                    nItens: nReg, 
                    itens: usuarios[0]
                }
            );
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async cadastrarUsuarios(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo } = request.body;
            // instrução SQL para inserção do registro
            const sql = 'INSERT INTO usuarios (usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo) VALUES (?, ?, ?, ?, ?);';
            // preparo do array com dados que serão atualizados
            const values = [usu_nome, usu_email, usu_senha, usu_tipo, usu_ativo];
            // execução e obtenção de confirmação da atualização realizada
            const confirmacao = await db.query(sql, values); 
            // identificação do id do registro inserido
            const usu_id = confirmacao[0].insertId;
            // reponde a requisição com a mensagem confirmando o ID do registro inserido
            return response.status(200).json(
                {
                    confirma: 'Sucesso', 
                    message: 'Cadastro de usuário efetuado.', 
                    usu_id                    
                }
            );
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
            return response.status(200).json(
                {
                    confirma: 'Sucesso', 
                    message: 'Usuário ' + usu_id + " atualizado com sucesso!", 
                    registrosAtualizados: atualizacao[0].affectedRows
                }
            );         
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async apagarUsuarios(request, response) {
        try {            
            // parâmetro passado via url na chamada da api pelo front-end
            const { usu_id } = request.params;    
            // comando de exclusão
            const sql = 'DELETE FROM usuarios WHERE usu_id = ?'; 
            // definição de array com os parâmetros que receberam os valores do front-end
            const values = [usu_id];
            // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
            // mensagem de retorno no formato JSON
            return response.status(200).json(
                {
                    confirma: 'Sucesso', 
                    message: 'Usuário com id ' + usu_id + ' excluído com sucesso'
                }
            ); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async ocultarUsuarios(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const usu_ativo = false;
            const { usu_id } = request.params; 
            const sql = 'UPDATE usuarios SET usu_ativo = ? WHERE usu_id = ?;';  
            const values = [usu_ativo, usu_id];    
            const atualizacao = await db.query(sql, values);
            return response.status(200).json(
                {
                    confirma: 'Sucesso', 
                    message: 'Usuário ' + usu_id + " excluído com sucesso!", 
                    registrosAtualizados: atualizacao[0].affectedRows
                }
            );         
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};

