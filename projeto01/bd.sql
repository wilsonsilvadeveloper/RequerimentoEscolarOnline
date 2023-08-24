-- Criação das tabelas
CREATE TABLE alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    matricula VARCHAR(20),
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE professores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

CREATE TABLE disciplinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20),
    nome VARCHAR(100),
    professor_id INT,
    curso_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE turmas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20)
);

CREATE TABLE turmas_disciplinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    turma_id INT,
    disciplina_id INT,
    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

CREATE TABLE matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT,
    turma_id INT,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

CREATE TABLE solicitacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT,
    disciplina_id INT,
    justificativa TEXT,
    status ENUM('Recusado', 'Aprovado', 'Pendente'),
    documento_comprobatorio VARCHAR(255),
    data_pedido DATE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- criação de linhas

-- Inserção de exemplos de dados
INSERT INTO cursos (nome) VALUES ('Segurança do trabalho');
INSERT INTO cursos (nome) VALUES ('Tecnico em informatica');
INSERT INTO cursos (nome) VALUES ('Tecnico em automação industrial');

INSERT INTO professores (nome) VALUES ('João da Silva');
INSERT INTO professores (nome) VALUES ('Maria Oliveira');
INSERT INTO professores (nome) VALUES ('Carlos Rodrigues');

INSERT INTO disciplinas (codigo, nome, professor_id, curso_id) VALUES ('MAT101', 'Matemática', 1);
INSERT INTO disciplinas (codigo, nome, professor_id, curso_id) VALUES ('BIO101', 'Biologia', 2);
INSERT INTO disciplinas (codigo, nome, professor_id, curso_id) VALUES ('ENG101', 'Inglês', 3);

INSERT INTO turmas (codigo) VALUES ('2A');
INSERT INTO turmas (codigo) VALUES ('3B');

INSERT INTO turmas_disciplinas (turma_id, disciplina_id) VALUES (1, 1); -- Turma 2A tem Matemática
INSERT INTO turmas_disciplinas (turma_id, disciplina_id) VALUES (1, 2); -- Turma 2A tem Biologia
INSERT INTO turmas_disciplinas (turma_id, disciplina_id) VALUES (1, 3); -- Turma 2A tem Inglês
INSERT INTO turmas_disciplinas (turma_id, disciplina_id) VALUES (2, 1); -- Turma 3B tem Matemática

INSERT INTO alunos (nome, matricula, curso_id) VALUES ('Ana Julia Leite', '2021001', 2);
INSERT INTO alunos (nome, matricula, curso_id) VALUES ('João Paulo Gorniak Junior', '2021002', 2);
INSERT INTO alunos (nome, matricula, curso_id) VALUES ('Luisa Sthefanny Gonçalves', '2021003', 2);

INSERT INTO matriculas (aluno_id, turma_id) VALUES (1, 1); -- Ana está matriculada na turma 2A
INSERT INTO matriculas (aluno_id, turma_id) VALUES (2, 2); -- João está matriculado na turma 3B
INSERT INTO matriculas (aluno_id, turma_id) VALUES (3, 1); -- Luisa está matriculada na turma 2A
