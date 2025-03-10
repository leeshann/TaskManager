task_id | user_id | task_description |      due_date       | task_priority

create table task (
    task_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    task_description VARCHAR(50),
    due_date TIMESTAMP,
    category VARCHAR(50),
    task_priority INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

insert into task (user_id, task_description, due_date, category, task_priority) values (49, 'do dishes', '2025-03-10', 'Work', 1);