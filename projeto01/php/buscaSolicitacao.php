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
        $sql = "SELECT * FROM solicitacoes";
        $stmt = $conexao->prepare($sql);
        $stmt->execute();
        $solicitacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($solicitacoes);
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
