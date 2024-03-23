import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IFile {
    createdAt: Date;
    user?: String,
    name: String,
    extension?: String,
    size?: Number,
    path?: String,
}

export interface IFileModel extends IFile, mongoose.Document {}

const PrintSchema = new Schema<IFileModel>({
    createdAt: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, required: true },
    extension: { type: String},
    size: { type: Number},
    path: { type: String },
});


export default mongoose.model<IFileModel>('files', PrintSchema);