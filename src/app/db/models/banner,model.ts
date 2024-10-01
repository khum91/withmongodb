
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 2
    },
    link: {
        type: String,
        required: false,
    },
    image: String,
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})


const Banner = mongoose.models.banner || mongoose.model("banner", bannerSchema);
export default Banner;
