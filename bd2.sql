CREATE TABLE campus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_campus VARCHAR(255) NOT NULL
);

insert into campus (nome_campus)
values ('Campus São Bento do Sul');

CREATE TABLE solicitacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_aluno VARCHAR(255) not null,
    email_aluno VARCHAR(255) not null,
    disciplina_id VARCHAR(255) not null,
    nome_professor VARCHAR(255) not null,
    data_avaliacao DATE,
    status ENUM('Recusado', 'Aprovado', 'Pendente', 'Cancelado'),
    data_pedido DATE,
    curso VARCHAR(255) not null,
    turno VARCHAR(255) not null,
    arquivo VARCHAR(255),
    justificativa VARCHAR(255),
    hora_avaliacao TIME
);

CREATE TABLE login_aluno(
    id INT PRIMARY KEY AUTOINCREMENT,
    matricula VARCHAR(255) not null,
    senha VARCHAR(255) not null
)

CREATE TABLE login_professor(
    id INT PRIMARY KEY AUTOINCREMENT,
    cod_professor VARCHAR(255) not null,
    senha VARCHAR(255) not null
)

insert into login_aluno (matricula, senha)
values ('2023001', '1234');

insert into login_professor (cod_professor, senha)
values ('124578', '4321');