import mongoose, {Schema, model, Model } from 'mongoose';
import { ICatalogue } from '../interfaces/catalogue';

const catalogueSchema = new Schema({
  
    image: { type: String },
    title: { type: String, require: true},
   
  
},{
    timestamps: true
});



const CatalogueProduct: Model<ICatalogue> = mongoose.models.CatalogueProduct || model('CatalogueProduct', catalogueSchema);

export default CatalogueProduct;