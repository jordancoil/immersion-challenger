DROP TABLE IF EXISTS channels CASCADE;
CREATE TABLE channels (
    id SERIAL PRIMARY KEY, 
    yt_channel_id varchar(100), 
    title varchar(100),
    thumbnail varchar(100)
);
