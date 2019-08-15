INSERT INTO users
    (displayname, username)
VALUES
    ('Jon', 'joeldstar'),
    ('Alice', 'alice123'),
    ('Bob', 'baawb')
;


INSERT INTO todos 
    (priority, task, user_id)
VALUES 
    (1,'feed the dog', 1),
    (2,'buy groceries', 3),
    (3,'make dinner', 3),
    (2,'clean house', 2)
;


SELECT * FROM todos;
SELECT * FROM users;