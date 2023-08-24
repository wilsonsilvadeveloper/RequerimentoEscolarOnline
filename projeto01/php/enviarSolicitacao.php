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
        $solicitacao = json_decode(file_get_contents("php://input"), true);
        $disciplinasNaoAdicionadas = array(); // Array para armazenar disciplinas que não foram adicionadas
        $quantidadesDisciplinas = count($solicitacao['disciplinas']);

        foreach ($solicitacao['disciplinas'] as $disciplina) {
            $sql = "SELECT id FROM disciplinas WHERE codigo = ?";
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(1, $disciplina);
            $stmt->execute();
            $idDisciplinaRow = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($idDisciplinaRow) {
                $idDisciplina = $idDisciplinaRow['id'];

                $sql = "SELECT * FROM solicitacoes WHERE disciplina_id = ? AND (status = 'Pendente' OR status = 'Aprovado') AND aluno_id = ?";
                $stmt = $conexao->prepare($sql);
                $stmt->bindParam(1, $idDisciplina);
                $stmt->bindParam(2, $solicitacao['idAluno']);
                $stmt->execute();
                $solicitacaoEncontrada = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$solicitacaoEncontrada) {
                    $sql = "INSERT INTO solicitacoes (tipo, justificativa, data_pedido, disciplina_id, documento_comprobatorio, status, aluno_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
                    $stmt2 = $conexao->prepare($sql);
                    $stmt2->bindParam(1, $solicitacao['tipo']);
                    $stmt2->bindParam(2, $solicitacao['motivo']);
                    $stmt2->bindParam(3, $solicitacao['dataSolicitacao']);
                    $stmt2->bindParam(4, $idDisciplina);
                    $stmt2->bindParam(5, $solicitacao['documento']);
                    $stmt2->bindParam(6, $solicitacao['status']);
                    $stmt2->bindParam(7, $solicitacao['idAluno']);
                    if ($stmt2->execute()) {
                        $response = ['status' => 'ok', 'resposta' => 'Solicitação Enviada', 'disciplinasNaoEnviadas' => $disciplinasNaoAdicionadas];
                    } else {
                        $response = ['status' => 'erro', 'resposta' => 'Erro ao Enviar a Solicitação', 'disciplinasNaoEnviadas' => $disciplinasNaoAdicionadas];
                    }
                } else {
                    $disciplinasNaoAdicionadas[] = $disciplina;
                }
            }
        }

        if($quantidadesDisciplinas == count($disciplinasNaoAdicionadas)){
            $response = ['status' => 'erro', 'resposta' => 'Erro ao Enviar a Solicitação', 'disciplinasNaoEnviadas' => $disciplinasNaoAdicionadas];
        }

        echo json_encode($response);
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
