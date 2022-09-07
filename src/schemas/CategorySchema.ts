import DataConnection from './../core/infrastructure/DataConnection';
const mongoose = DataConnection.dbInstance;

const categorySchema = new mongoose.Schema({
    categoryID:{
        type: Number,
        required: true,
    },
    categoryName:{
        type: String,
        required: true,
    },
}, {versionKey: false, timestamps: true});

export default mongoose.model('category', categorySchema, 'CATEGORY');