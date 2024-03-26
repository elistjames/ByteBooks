-- Seed
INSERT INTO users (username, email, password, created_at)
VALUES
    ('emily_writer', 'emily@example.com', 'password1', NOW()),
    ('jon_jones', 'john@example.com', 'password2', NOW()),
    ('adam.help', 'adam@example.com', 'password3', NOW());

INSERT INTO admins (username, email, password, created_at)
VALUES
    ('alex_admin', 'alex@example.com', 'adminpassword1', NOW()),
    ('sara_admin', 'sara@example.com', 'adminpassword2', NOW());