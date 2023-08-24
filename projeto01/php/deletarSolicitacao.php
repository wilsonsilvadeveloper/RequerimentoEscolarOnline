<?php

$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";


try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $requestData = json_decode(file_get_contents("php://input"), true);
        $idSolicitacao = $requestData['idSolicitacao'];

        $sql = "DELETE FROM solicitacoes WHERE id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $idSolicitacao);
        if($stmt->execute()){
            $response = ['status'=> 'ok', 'message'=> 'Solicitacao Deletada com Sucesso'];
        } else {
            $response = ['status'=> 'erro', 'message'=> ' Erro ao deletar Solicitacao'];
        }
        echo json_encode($response);
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
