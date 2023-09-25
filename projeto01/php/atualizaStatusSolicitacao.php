<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$host = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "escola";

$response = ['status' => 'erro', 'message' => 'Erro desconhecido']; // Inicialização padrão

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexao->beginTransaction();

    $dadosRecebidos = json_decode(file_get_contents('php://input'), true);
    $idSolicitacao = $dadosRecebidos['id'];
    $horaAvaliacao = $dadosRecebidos['horaAvaliacao'];
    $dataAvaliacao;
    if($dadosRecebidos['dataAvaliacao'] != null) {
        $dataAvaliacao = $dadosRecebidos['dataAvaliacao'];
        $dataConvertida = DateTime::createFromFormat('d/m/Y', $dataAvaliacao);
        if ($dataConvertida !== false) {
            $dataConvertida = $dataConvertida->format('Y-m-d');
        } else {
            $response = ['status' => 'erro', 'message' => 'Formato de data inválido. Use o formato dd/mm/yyyy.'];
        }
    }  else {
        // Se $dataAvaliacao for nulo, defina $dataConvertida como nulo
        $dataConvertida = null;
    }




    $novoStatusSolicitacao = $dadosRecebidos['statusSolicitacao'];

    $sql = "SELECT * FROM solicitacoes WHERE id = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bindParam(1, $idSolicitacao);
    $stmt->execute();

    $solicitacaoEncontrada = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($solicitacaoEncontrada) {
        $dataPedidoSolicitacao = $solicitacaoEncontrada['data_pedido'];
        $statusAtual = $solicitacaoEncontrada['status'];

        if (($novoStatusSolicitacao == 'Aprovado' || $novoStatusSolicitacao == 'Recusado') && ($statusAtual == 'Pendente' || $statusAtual == null)) {

            function atualizaStatus($status, $id, $data, $hora, $con, $stm)
            {
                $sql2 = "UPDATE solicitacoes SET status = ?, data_avaliacao = ?, hora_avaliacao = ? WHERE id = ?";
                $stm = $con->prepare($sql2);
                $stm->bindParam(1, $status);
                $stm->bindParam(2, $data);
                $stm->bindParam(3, $hora);
                $stm->bindParam(4, $id);
                if ($stm->execute()) {
                    if ($status == 'Aprovado') {
                        return  ['status' => 'ok', 'message' => 'Solicitação ' . $status . ' com Sucesso', 'dataAvaliacao' => 'Data da Avaliação: ' . $data . ' As: ' .$hora];
                    } else if ($status == 'Recusado') {
                        return  ['status' => 'ok', 'message' => 'Solicitação ' . $status . ' com Sucesso'];
                    }
                } else {
                    return  ['status' => 'erro', 'message' => 'Erro ao Atualizar Solicitação, Tente novamente!'];
                }
            }

            if ($novoStatusSolicitacao == 'Aprovado') {
                if ($dadosRecebidos['dataAvaliacao'] != null) {
                    if ($dataConvertida > $dataPedidoSolicitacao) {
                        if($horaAvaliacao != null){
                            $response = atualizaStatus($novoStatusSolicitacao, $idSolicitacao, $dataConvertida, $horaAvaliacao, $conexao, $stmt);
                        } else {
                            $response = ['status' => 'erro', 'message' => 'Você não selecionou a Hora!' , 'hora'=> $horaAvaliacao];
                        }
                    } else {
                        $response = ['status' => 'erro', 'message' => 'A data de avaliação tem que ser depois da data do pedido da Solicitação' , 'data' => $dataConvertida, 'dataAvaliacao' => $dataAvaliacao];
                    }
                } else {
                    $response = ['status' => 'erro', 'message' => 'Você não selecionou uma data de avaliação!'];
                }
            } else if ($novoStatusSolicitacao == 'Recusado') {
                $response = atualizaStatus($novoStatusSolicitacao, $idSolicitacao,null, null, $conexao, $stmt);
            }
        } else {
            $response = ['status' => 'erro', 'message' => 'Erro ao Atualizar Solicitação, Recarrege a pagina e tente novamente!', 'statusSolicitacao' => $statusAtual, 'novoStatus' => $novoStatusSolicitacao];
        }
    } else {
        $response = ['status' => 'erro', 'message' => 'solicitacao não encontrada', 'id'=> $idSolicitacao];
    }

    $conexao->commit();
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
    $conexao->rollback();
}

echo json_encode($response);
