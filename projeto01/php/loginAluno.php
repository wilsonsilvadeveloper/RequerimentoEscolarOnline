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

        $sql = "SELECT * FROM login_aluno WHERE matricula = ? AND senha = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $matricula);
        $stmt->bindParam(2, $senha);
        $stmt->execute();

        $aluno = $stmt->fetch(PDO::FETCH_ASSOC);
        $response;
        if ($aluno) {
            $url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/html/sessaoAluno/requerimento.html";
            $aba = "window.open('$url', '_self')";
            $response = ['status' => 'ok', 'aba' => $aba];
        } else {
            $response = ['status' => 'error', 'error' => 'Dados invalidos'];
        }

        echo json_encode($response);
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}