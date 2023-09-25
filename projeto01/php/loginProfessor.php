<?php
$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $codProfessor = $_POST["codProfessor"];
        $senha = $_POST["senha"];

        $sql = "SELECT * FROM login_professor WHERE cod_professor = ? AND senha = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $codProfessor);
        $stmt->bindParam(2, $senha);
        $stmt->execute();

        $professor = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($professor) {
            $url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/html/sessaoProfessor/professor.html";
            $aba = "window.open('$url', '_self')";
            $professor_json = json_encode($aba);
            echo $professor_json;
        }
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}