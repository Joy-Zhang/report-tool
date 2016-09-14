--
-- 由SQLiteStudio v3.1.0 产生的文件 周三 9月 14 16:19:01 2016
--
-- 文本编码：UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：profile
CREATE TABLE profile (
    id        TEXT    NOT NULL,
    mail      TEXT    NOT NULL,
    mail_user TEXT,
    mail_pass TEXT,
    smtp      INTEGER,
    PRIMARY KEY (
        id
    )
);


-- 表：report
CREATE TABLE report (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    author    TEXT    NOT NULL,
    title     TEXT    NOT NULL,
    template  TEXT    NOT NULL,
    data      TEXT    NOT NULL,
    timestamp INTEGER NOT NULL
                      DEFAULT (strftime('%s', 'now') ) 
);


-- 表：smtp
CREATE TABLE smtp (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    host   TEXT    NOT NULL,
    port   INTEGER NOT NULL,
    secure INTEGER NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
