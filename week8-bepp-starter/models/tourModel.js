import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
