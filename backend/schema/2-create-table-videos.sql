DROP TABLE IF EXISTS videos;
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    channel_id int REFERENCES channels(id),
    yt_video_id varchar(100),
    title varchar(100),
    video_index int
);
