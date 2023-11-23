DROP TABLE IF EXISTS videos;
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    channel_id int REFERENCES channels(id),
    yt_video_id varchar(100),
    title varchar(100),
    video_index int
);

-- SAMPLE INSERT
-- INSERT INTO videos (channel_id, yt_video_id, title, video_index) VALUES 
--     (3, 'jn6KosCssW8', '【初投稿】コムドットの始まり', 0),
--     (3, 'VAce-PL7Tfc', 'コムドットの名前決め', 1);