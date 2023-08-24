<?php
$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $matricula = $_POST["matricula"];
        $senha = $_POST["senha"];

        $sql = "SELECT alunos.id AS id_aluno, alunos.nome AS nome_aluno, turmas.codigo AS turma, cursos.nome AS curso, alunos.matricula
        FROM alunos
        INNER JOIN matriculas ON alunos.id = matriculas.aluno_id
        INNER JOIN turmas ON matriculas.turma_id = turmas.id
        INNER JOIN cursos ON alunos.curso_id = cursos.id
        WHERE alunos.matricula = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $matricula);
        $stmt->execute();

        $aluno = $stmt->fetch(PDO::FETCH_ASSOC);
        $aluno_id = $aluno['id_aluno'];

        if ($aluno) {
            $aluno_encoded = base64_encode(json_encode($aluno));

            // Monta a URL com os parâmetros codificados
            $url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/html/sessaoAluno/solicitarRequerimento.html";
            $url .= "?aluno=" . urlencode($aluno_encoded);


            // Abre a nova aba com a URL construída
            $aba = "window.open('$url', '_self')";
            $aluno_json = json_encode($aba);
            echo $aluno_json;
        }
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}