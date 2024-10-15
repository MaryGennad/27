import mongoose from "mongoose";

export interface Products extends mongoose.Document {
  name: String;
  image: String;
  ingreS: [String];
  description: String;
}

/* ProductSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema<Products>({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this Product."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  image: {
    /* The owner of this Product */

    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  
  ingreS: {
    /* List of dietary needs, if applicable */

    type: [String],
  },
  description: {
    /* Url to pet image */

    required: [true, "Please provide an image url for this Product."],
    type: String,
  },
});

export default mongoose.models.Product || mongoose.model<Products>("Product", ProductSchema);
