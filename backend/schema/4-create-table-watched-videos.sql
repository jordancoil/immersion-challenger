DROP TABLE IF EXISTS watched_videos;
CREATE TABLE watched_videos (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id),
    video_id int REFERENCES videos(id),
);
