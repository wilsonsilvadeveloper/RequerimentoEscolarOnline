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
        $dadosRecebidos = json_decode(file_get_contents('php://input'), true);

        if (isset($dadosRecebidos['email'])) {
            $emailRecebido = $dadosRecebidos['email'];

            // Decodifique o email armazenado no banco de dados
            $emailCodificadoBanco = base64_encode($emailRecebido);

            $sql = "SELECT solicitacoes.*, campus.nome_campus AS campus
            FROM solicitacoes
            CROSS JOIN campus
            WHERE solicitacoes.email_aluno = ?";
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(1, $emailCodificadoBanco); // Use o email codificado do banco na consulta
            $stmt->execute();
            $solicitacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);


            // Defina o cabeçalho Content-Type para JSON
            if (count($solicitacoes) > 0) {
                // Se houver resultados, crie a URL com os dados
                $urlComDadosCodificados = 'http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/html/sessaoAluno/resultadoPesquisaSolicitacao.html?dados='
                    . urlencode(json_encode($solicitacoes));

                // Defina o cabeçalho Content-Type para JSON
                header('Content-Type: application/json');
                $response = ['status' => 'ok', 'message' => $solicitacoes, 'dados' => $dadosRecebidos, 'url' => $urlComDadosCodificados];
                echo json_encode($response);
            } else {
                // Se nenhum resultado for encontrado, retorne uma mensagem de erro
                $response = ['status' => 'erro', 'message' => 'Nenhum resultado encontrado para o email fornecido.'];
                header('Content-Type: application/json');
                echo json_encode($response);
            }
        } else {
            // Responda com um erro se o campo 'email' não estiver definido
            $response = ['status' => 'erro', 'message' => 'O campo "email" não foi fornecido.'];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
