<?php

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "escola";

$response;
$pdf_data;
try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nome_aluno = $_POST["nome"];
        $email_aluno = $_POST["email"];
        $descricao = $_POST["descricaoJustificativa"];
        $diciplina_nome = $_POST["nomeDisciplina"];
        $nome_professor = $_POST["nomeProfessor"];
        $curso = $_POST["curso"];
        $periodoLetivo = $_POST["periodoLetivo"];
        $status = "Pendente";
        $data_pedido = date("Y-m-d");

        // Verifique se um arquivo foi enviado
        if (isset($_FILES["justificativa"])) {
            $arquivo = $_FILES["justificativa"];
            $pasta = '../uploads/';
            $nomeArquivo = $arquivo['name'];
            $geraNomeArquivo = uniqid();
            $extensao = strtolower(pathinfo($nomeArquivo, PATHINFO_EXTENSION));
            
            if($extensao == 'pdf') {
                $enviarArquivo = move_uploaded_file($arquivo['tmp_name'], $pasta . $geraNomeArquivo . "." . $extensao);
                if($enviarArquivo) {
                    $path = $pasta . $geraNomeArquivo . "." . $extensao;
                    $pdf_data = 'Arquivo Enviado';
                } else {
                    $path = null;
                    $pdf_data = 'erro ao salvar arquivo';
                }
            } else {
                $pdf_data = 'arquivo invalido';
            }
        } else {
            $pdf_data = 'arquivo não enviado'; // Defina como nulo se nenhum arquivo foi enviado
        }
        
        if($nome_aluno != null && $email_aluno != null && $descricao != null && $diciplina_nome != null && $nome_professor != null
        && $curso != null && $periodoLetivo != null && $status != null && $data_pedido != null){
            $email_codificado = base64_encode($email_aluno);

             // Insira os dados e o PDF no banco de dados
            $sql = "INSERT INTO solicitacoes (nome_aluno, email_aluno, nome_diciplina, nome_professor, data_avaliacao, status, data_pedido, curso, turma, arquivo, justificativa) 
            VALUES (:nome_aluno, :email_aluno, :diciplina_nome, :nome_professor, :data_avaliacao, :status, :data_pedido, :curso, :periodoLetivo, :pdf_data, :motivo_solicitacao)";

            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(':nome_aluno', $nome_aluno);
            $stmt->bindParam(':email_aluno', $email_codificado);
            $stmt->bindParam(':diciplina_nome', $diciplina_nome);
            $stmt->bindParam(':nome_professor', $nome_professor);
            $stmt->bindParam(':data_avaliacao', $data_avaliacao);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':data_pedido', $data_pedido);
            $stmt->bindParam(':curso', $curso);
            $stmt->bindParam(':periodoLetivo', $periodoLetivo);
            $stmt->bindParam(':pdf_data', $path);
            $stmt->bindParam(':motivo_solicitacao', $descricao);

            if ($stmt->execute()) {
                $response = ['response' => "Solicitação enviada com sucesso!", 'statusArquivo' => $pdf_data, 'status' => 'ok'];
            } else {
                $response = ['response' => "Erro ao enviar a solicitação.", 'statusArquivo' => $pdf_data, 'status' => 'error'];
            }
        } else {
            $response = ['response' => "Você não preencheu todos os campos do formulário!", 'status' => 'error'];
        }
       
        //header('Content-Type: application/json');
        echo json_encode($response);
    }
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
