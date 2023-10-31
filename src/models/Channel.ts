import { Schema, model } from 'mongoose';

const channelSchema = new Schema({
    channelId: String,
    title: String,
});

export default model("Channel", channelSchema);