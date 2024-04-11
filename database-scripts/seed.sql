-- Seed
INSERT INTO users (username, password, created_at, permission)
VALUES
    ('alex_admin', '4179a76f97865271164fa5cccdaa0e3f173dc2e27b72becaf83fddc4eb799b9d', NOW(), 'ADMIN'), -- password: adminpassword1
    ('sara_admin', 'f2414955bb915be77a03ba13b08e7196a1a6d8f6a23b8fa5cdfacdab1aba4c0c', NOW(), 'ADMIN'), -- password: adminpassword2
    ('emily_writer', '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e', NOW(), 'MEMBER'), -- password: password1
    ('jon_jones', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4', NOW(), 'MEMBER'),
    ('adam.help', '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764', NOW(), 'MEMBER'),
    ('estjames', 'a246634d4d14bcca59ef9caba0b5d1a6c589d69836ae702f2c7ace875ebd5bc3', NOW(), 'MEMBER'),
    ('sammy_rolly', 'c25623d8fd025cc806e173e4646f9fcab88f28eced842f387f4b81ff1726f31e', NOW(), 'MEMBER');


INSERT INTO posts (user_id, username, title, content, created_at)
VALUES
    ('3', 'emily_writer', 'Yahoo cool story', 'The jumbled assortment of items on the cluttered desk included a faded notebook, an antique lamp, a half-eaten sandwich, a tangled ball of yarn, a dusty vase, a broken clock, a crumpled map, a stack of old letters, a rubber duck, a mismatched pair of socks, a feather pen, a jar of marbles, a rusted key, a cracked mirror, a wilted flower, a scratched pair of glasses, a squeaky toy, a frayed rope, a dried-up marker, a deck of playing cards, and a chipped mug.', NOW()),
    ('3', 'emily_writer', 'Blah Blah Blah', 'In the bustling city streets, amidst the cacophony of honking horns and chattering pedestrians, one could find a myriad of peculiar objects strewn about. From the remnants of yesterdays market to the forgotten treasures of urban life, the sidewalk served as a canvas for an eclectic array of items. A discarded bicycle wheel leaned against a graffiti-covered wall, its spokes catching the sunlight in a mesmerizing dance.', NOW()),
    ('3', 'emily_writer', 'Apples and Pairs', 'Nearby, a cluster of empty soda cans rattled in the breeze, their metallic symphony harmonizing with the distant hum of traffic. Amongst the debris, a lone paperback novel lay open, its pages fluttering like delicate wings in the gentle gusts of wind. ', NOW()),
    ('3', 'emily_writer', 'Short story', 'A stray cat prowled the alley, its amber eyes gleaming with curiosity as it sniffed at a crumpled paper bag, the remnants of someones hurried lunch.', NOW()),
    ('3', 'emily_writer', 'Super cool demo post title', ' Further down the street, a forgotten umbrella lay abandoned, its vibrant canopy now faded and torn from countless storms endured. Amidst the chaos and clutter, there was a strange beauty to be found in the randomness of urban life, a poetic narrative woven from the threads of everyday existence.', NOW()),
    ('6', 'estjames', 'Whispers in the Wind', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">In the silence of the night, whispers in the wind dance through the trees, carrying secrets of forgotten dreams and lost loves. Each gentle breath of air tells a story of longing and hope, weaving a tapestry of memories that flutter and fade into the darkness.</span>', NOW()),
    ('7', 'sammy_rolly', 'A Walk Through Memories', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">In the garden of my mind, I wander through the paths of memories, each step a journey into the past. Fragrant blooms of nostalgia bloom around me, filling the air with the sweet scent of days gone by. </span><div><span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;"><br></span></div><div><span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">Every corner holds a story, every flower a moment frozen in time, reminding me of who I was and who Ive become.</span></div>', NOW()),
    ('6', 'estjames', 'Sunrise Serenade', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">As the first light of dawn breaks across the horizon, the world awakens to the symphony of natures orchestra. Birds sing their morning melodies, greeting the new day with joyful tunes that echo through the golden hues of the sky, filling the air with the promise of possibility.</span>', NOW()),
    ('6', 'estjames', 'Recipe for Happiness', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">Take a cup of laughter, a spoonful of kindness, and a pinch of gratitude. Mix them together with love and sprinkle with joy. Let it simmer over the warmth of friendship and serve with a side of smiles. For a taste of happiness that lingers long after the last bite, savor every moment and cherish every memory.</span>', NOW()),
    ('7', 'sammy_rolly', 'The Tale of Two Souls', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">Once upon a time, in a world where dreams were made of stardust and wishes came true, there lived two souls destined to find each other amidst the chaos of fate. Their love was written in the stars, an eternal bond that transcended time and space, guiding them through the darkest nights and brightest days.</span>', NOW()),
    ('7', 'sammy_rolly', 'Savor the Silence', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">In a world filled with noise and chaos, there is beauty in the quiet moments. Close your eyes and listen to the symphony of silence, as the world fades away and all that remains is the gentle rhythm of your own heartbeat. Embrace the stillness, for within it lies the power to find peace amidst the chaos.</span>', NOW()),
    ('7', 'sammy_rolly', 'The Art of Letting Go', '<span style="color: rgb(13, 13, 13); font-family: Söhne, ui-sans-serif, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif, &quot;Helvetica Neue&quot;, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space-collapse: preserve;">Sometimes the hardest thing to do is let go of what we hold dear. But like a butterfly emerging from its cocoon, we must learn to release the past and embrace the future with open arms. For in the act of letting go, we find the freedom to fly and the strength to soar beyond our wildest dreams.</span>', NOW());


INSERT INTO likes (post_id, user_id, created_at)
VALUES
    ('1', '3', NOW()),
    ('2', '3', NOW()),
    ('3', '3', NOW()),
    ('4', '3', NOW()),
    ('1', '3', NOW()),
    ('3', '6', NOW()),
    ('1', '6', NOW()),
    ('8', '6', NOW()),
    ('7', '6', NOW()),
    ('9', '7', NOW()),
    ('8', '7', NOW()),
    ('2', '7', NOW()),
    ('4', '7', NOW()),
    ('11', '7', NOW()),
    ('12', '7', NOW()),
    ('12', '1', NOW()),
    ('11', '1', NOW()),
    ('10', '1', NOW()),
    ('8', '1', NOW()),
    ('1', '1', NOW()),
    ('2', '1', NOW()),
    ('3', '1', NOW()),
    ('5', '1', NOW());

INSERT INTO dislikes (post_id, user_id, created_at)
VALUES
    ('5', '6', NOW()),
    ('2', '6', NOW()),
    ('7', '7', NOW()),
    ('1', '7', NOW()),
    ('3', '7', NOW()),
    ('5', '7', NOW()),
    ('12', '1', NOW()),
    ('9', '1', NOW()),
    ('7', '1', NOW()),
    ('4', '1', NOW());

INSERT INTO comments (post_id, user_id, username, content, created_at)
VALUES
    ('3', '6', 'estjames', 'Really cool!!', NOW()),
    ('5', '6', 'estjames', 'Not that cool :(', NOW()),
    ('8', '6', 'estjames', 'Please like :)))', NOW()),
    ('4', '6', 'estjames', 'Very interesting post, super short. everyone should like this post cause its interesting and short, and this definitely isnt just long comment to demo the SENG 513 Project app', NOW()),
    ('5', '7', 'sammy_rolly', 'Yeah I agree', NOW()),
    ('9', '7', 'sammy_rolly', 'Nice recipe', NOW()),
    ('7', '7', 'sammy_rolly', 'whisper whisper', NOW()),
    ('12', '7', 'sammy_rolly', 'Read this', NOW()),
    ('11', '7', 'sammy_rolly', 'cool', NOW()),
    ('12', '1', 'alex_admin', 'Wow, so cool!', NOW()),
    ('1', '1', 'alex_admin', 'Very Inspiring !!!', NOW()),
    ('1', '1', 'alex_admin', 'Wow so cool lol', NOW()),
    ('8', '1', 'alex_admin', '&nbsp;yuh yuh?&nbsp;', NOW());

INSERT INTO reports (reporter_id, reported_user_id, post_id, reporter_username, created_at)
VALUES
    ('3', null, '12', 'emily_writer', NOW()),
    ('3', null, '7', 'emily_writer', NOW()),
    ('6', '7', null, 'estjames', NOW()),
    ('1', null, '10', 'alex_admin', NOW()),
    ('1', null, '12', 'alex_admin', NOW()),
    ('1', '7', null, 'alex_admin', NOW());