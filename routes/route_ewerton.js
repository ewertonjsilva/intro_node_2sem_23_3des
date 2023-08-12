const db = require('../database/connection'); 
const express = require('express'); 
const router = express.Router(); 

// referência a controllers que serão utilizados nas rotas
const MesasController = require('../controllers/mesas'); 
const CidadesController = require('../controllers/cidades');
const ClientesController = require('../controllers/clientes');
const EnderecoClientesController = require('../controllers/enderecoClientes'); 
const PedidoProdutosController = require('../controllers/pedidoProdutos'); 
const PedidosController = require('../controllers/pedidos'); 
const ProdutosController = require('../controllers/produtos'); 
const ProdutoTiposController = require('../controllers/produtoTipos'); 
const UsuariosController = require('../controllers/usuarios'); 

// definição das rotas
router.get('/mesas', MesasController.listarMesas); 
// post
// patch
// delete

router.get('/cidades', CidadesController.listarCidades); 


router.get('/clientes', ClientesController.listarClientes); 
// post
// patch

router.get('/enderecoclientes', EnderecoClientesController.listarEnderecoClientes); 
// post
// patch
// delete

router.get('/pedidoprodutos', PedidoProdutosController.listarpedidoProdutos); 
// post
// patch
// delete

router.get('/pedidos', PedidosController.listarPedidos); 
// post
// patch
// delete

router.get('/produtos', ProdutosController.listarProdutos); 
// post
// patch
// delete

router.get('/produtotipos', ProdutoTiposController.listarProdutosTipos); 
// post
// patch
// delete

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios', UsuariosController.editarUsuarios); 
router.delete('/usuarios', UsuariosController.apagarUsuarios); 

module.exports = router;

