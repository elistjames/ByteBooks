-- Seed
INSERT INTO users (username, password, created_at, permission)
VALUES
    ('alex_admin', 'adminpassword1', NOW(), 'ADMIN'),
    ('sara_admin', 'adminpassword2', NOW(), 'ADMIN'),
    ('emily_writer', 'password1', NOW(), 'USER'),
    ('jon_jones', 'password2', NOW(), 'USER'),
    ('adam.help', 'password3', NOW(), 'USER');


INSERT INTO posts (user_id, username, title, content, created_at)
VALUES
    ('2', 'emily_writer', 'Yahoo cool story', 'The jumbled assortment of items on the cluttered desk included a faded notebook, an antique lamp, a half-eaten sandwich, a tangled ball of yarn, a dusty vase, a broken clock, a crumpled map, a stack of old letters, a rubber duck, a mismatched pair of socks, a feather pen, a jar of marbles, a rusted key, a cracked mirror, a wilted flower, a scratched pair of glasses, a squeaky toy, a frayed rope, a dried-up marker, a deck of playing cards, and a chipped mug.', NOW()),
    ('2', 'emily_writer', 'Blah Blah Blah', 'In the bustling city streets, amidst the cacophony of honking horns and chattering pedestrians, one could find a myriad of peculiar objects strewn about. From the remnants of yesterdays market to the forgotten treasures of urban life, the sidewalk served as a canvas for an eclectic array of items. A discarded bicycle wheel leaned against a graffiti-covered wall, its spokes catching the sunlight in a mesmerizing dance.', NOW()),
    ('2', 'emily_writer', 'Apples and Pairs', 'Nearby, a cluster of empty soda cans rattled in the breeze, their metallic symphony harmonizing with the distant hum of traffic. Amongst the debris, a lone paperback novel lay open, its pages fluttering like delicate wings in the gentle gusts of wind. ', NOW()),
    ('2', 'emily_writer', 'Short story', 'A stray cat prowled the alley, its amber eyes gleaming with curiosity as it sniffed at a crumpled paper bag, the remnants of someones hurried lunch.', NOW()),
    ('2', 'emily_writer', 'Super cool demo post title', ' Further down the street, a forgotten umbrella lay abandoned, its vibrant canopy now faded and torn from countless storms endured. Amidst the chaos and clutter, there was a strange beauty to be found in the randomness of urban life, a poetic narrative woven from the threads of everyday existence.', NOW());


INSERT INTO likes (post_id, user_id, created_at)
VALUES
    ('1', '3', NOW()),
    ('2', '3', NOW()),
    ('3', '3', NOW()),
    ('4', '3', NOW()),
    ('1', '3', NOW());