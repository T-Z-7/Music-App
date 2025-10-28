import  {Albumn}  from "../models/albumn.model.js"

export const getAllAlbumns = async (req,res,next) => {
    try {
        const albumns = await Albumn.find();
        res.status(200).json(albumns);
    } catch (error) {
        next(error);
    }
}

export const getAllAlbumnsById = async (req,res,next) => {
    try {
        const {albumnsId} = req.params;

        const albumn = await Albumn.findById(albumnsId).populate("songs");

        if(!albumn){
            return res.status(404).json({message:"Albumn not Found!"});
        }

        res.status(200).json(albumn);

    } catch (error) {
        next(error);
    }
}