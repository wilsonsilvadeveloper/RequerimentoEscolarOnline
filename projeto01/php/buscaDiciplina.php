<?php

$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "GET") {

        $idAluno = $_GET['id'];
        $sql = "SELECT disciplinas.codigo AS cod, disciplinas.nome AS disciplina, professores.nome AS nome_professor
        FROM disciplinas
        INNER JOIN turmas_disciplinas ON disciplinas.id = turmas_disciplinas.disciplina_id
        INNER JOIN matriculas ON turmas_disciplinas.turma_id = matriculas.turma_id
        INNER JOIN professores ON disciplinas.professor_id = professores.id
        WHERE matriculas.aluno_id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $idAluno);
        $stmt->execute();

        $diciplina = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($diciplina) {
            $jsonResponse = json_encode($diciplina);
            echo $jsonResponse;        }
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
