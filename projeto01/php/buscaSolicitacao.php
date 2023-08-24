<?php

$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

$response = array(); // Array para armazenar a resposta

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $requestData = json_decode(file_get_contents("php://input"), true);
        $alunoId = $requestData['aluno'];

        $sql = "SELECT solicitacoes.id AS solicitacao_id, solicitacoes.status AS solicitacao_status,
        disciplinas.codigo AS disciplina_codigo, disciplinas.nome AS disciplina_nome,
        professores.nome AS professor_nome, solicitacoes.data_pedido, solicitacoes.justificativa
        FROM solicitacoes
        INNER JOIN disciplinas ON solicitacoes.disciplina_id = disciplinas.id
        INNER JOIN professores ON disciplinas.professor_id = professores.id
        WHERE solicitacoes.aluno_id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $alunoId);
        $stmt->execute();
        $solicitacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($solicitacoes);
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
