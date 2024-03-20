-- Seed

INSERT INTO members (username, email, password, created_at)
VALUES 
    ('Emily', 'emily@example.com', 'password1', NOW()),
    ('John', 'john@example.com', 'password2', NOW()),
    ('adam', 'adam@example.com', 'password3', NOW());

INSERT INTO admins (username, email, password, created_at)
VALUES 
    ('Alex', 'alex@example.com', 'adminpassword', NOW()),
    ('Sara', 'sara@example.com', 'adminpassword2', NOW());

