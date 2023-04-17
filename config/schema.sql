--Here we eliminate previous tables with the same name and create our new tables
DROP TABLE IF EXISTS log;

--Table storing the logs
CREATE TABLE log(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    log_text TEXT NOT NULL,
    log_color TEXT NOT NULL
);