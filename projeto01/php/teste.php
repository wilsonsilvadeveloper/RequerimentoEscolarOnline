<?php

$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT documento_comprobatorio FROM solicitacoes WHERE id = 28";
        $stmt = $conexao->prepare($sql);
        $stmt->execute();

        $solicitacao = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($solicitacao) {
            $documentoPath = $solicitacao['documento_comprobatorio'];

            // Verifica se o caminho do arquivo é válido
            if (file_exists($documentoPath)) {
                // Configura os cabeçalhos para o download
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="' . basename($documentoPath) . '"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($documentoPath));

                // Lê o arquivo e o envia para o cliente
                readfile($documentoPath);
                exit;
            } else {
                echo "Arquivo não encontrado.";
            }
        } else {
            echo "Solicitação não encontrada.";
        }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
