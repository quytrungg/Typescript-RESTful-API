import {DataConnection} from './../core/infrastructure/DataConnection';
const mongoose = DataConnection.dbInstance;

const productSchema = new mongoose.Schema({
    productID:{
        type: Number,
        required: true,
    },
    productName:{
        type: String,
        required: true,
    },
    category:{
        type: Number,
        default: 0,
    }
}, {versionKey: false, timestamps: true});

export default mongoose.model('product', productSchema, 'PRODUCT');