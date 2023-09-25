<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

$response = ['status' => 'erro', 'message' => 'Erro desconhecido']; // Inicialização padrão

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexao->beginTransaction();

    $dadosRecebidos = json_decode(file_get_contents('php://input'), true);
    $idSolicitacao = $dadosRecebidos['id'];
    $novoStatusSolicitacao = $dadosRecebidos['statusSolicitacao'];

    $sql = "SELECT * FROM solicitacoes WHERE id = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bindParam(1, $idSolicitacao);
    $stmt->execute();

    $solicitacaoEncontrada = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($solicitacaoEncontrada) {
        $statusAtual = $solicitacaoEncontrada['status'];
        $emailAluno = base64_decode($solicitacaoEncontrada['email_aluno']);

        if (($novoStatusSolicitacao == 'Cancelado') && ($statusAtual == 'Pendente' || $statusAtual == null)) {
            //$response = ['mes' => $solicitacaoEncontrada, 'id'=> $idSolicitacao, 'atual' => $statusAtual, 'novoStatus'=> $novoStatusSolicitacao];
            $sql2 = "UPDATE solicitacoes SET status = ? WHERE id = ?";
                $stmt2 = $conexao->prepare($sql2);
                $stmt2->bindParam(1, $novoStatusSolicitacao);
                $stmt2->bindParam(2, $idSolicitacao);
                if ($stmt2->execute()) {
                    $response =  ['status' => 'ok', 'message' => 'Solicitação Cancelada com Sucesso', 'email' => $emailAluno];
                } else {
                    $response =  ['status' => 'erro', 'message' => 'Erro ao Cancelar Solicitação, Tente novamente!'];
                }
            
        } else {
            $response = ['status' => 'erro', 'message' => 'Erro ao Atualizar Solicitação, Saia da pagina e tente novamente!'];
        }
    } else {
        $response = ['status' => 'erro', 'message' => 'solicitacao não encontrada'];
    }

    $conexao->commit();
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
    $conexao->rollback();
}

echo json_encode($response);