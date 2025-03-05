-- Cria a tabela de usuários, se ainda não existir
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insere um usuário de exemplo (admin/senha123)
INSERT IGNORE INTO user (username, password) VALUES ('admin', 'senha123');