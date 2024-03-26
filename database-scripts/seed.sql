-- Seed
INSERT INTO users (username password, created_at)
VALUES
    ('emily_writer', 'password1', NOW()),
    ('jon_jones', 'password2', NOW()),
    ('adam.help', 'password3', NOW());

INSERT INTO admins (username, password, created_at)
VALUES
    ('alex_admin', 'adminpassword1', NOW()),
    ('sara_admin', 'adminpassword2', NOW());