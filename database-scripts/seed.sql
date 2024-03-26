-- Seed
INSERT INTO users (username, password, created_at, permission)
VALUES
    ('alex_admin', 'adminpassword1', NOW(), 'ADMIN'),
    ('sara_admin', 'adminpassword2', NOW(), 'ADMIN'),
    ('emily_writer', 'password1', NOW(), 'USER'),
    ('jon_jones', 'password2', NOW(), 'USER'),
    ('adam.help', 'password3', NOW(), 'USER');