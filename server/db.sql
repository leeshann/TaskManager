task_id | user_id | task_description |      due_date       | task_priority

create table task (
    task_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    task_description VARCHAR(50),
    due_date TIMESTAMP,
    category TEXT,
    task_priority TEXT,
    completed BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

insert into task (user_id, task_description, due_date, category, task_priority) values (49, 'going to the bank', '2025-03-10 17:00:00', 'Work', 'Low');