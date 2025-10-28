import {Song} from "../models/song.model.js";
import  {Albumn}  from "../models/albumn.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
    try {
        const result = cloudinary.uploader.upload(file.tempFilePath,{
            resource_type : "auto",
        })
        return (await result).secure_url
    } catch (error) {
        console.log("Error in uploadToCloudinary",error);
        throw new Error(error);
    }
}

export const createSong = async (req,res,next)=>{
    try {
       if(!req.files || !req.files.audioFile || !req.files.imageFile){
        return res.status(400).json({message : "Please upload all files"})
       } 

       const {title, artist, albumnId, duration } = req.body;
       const audioFile = req.files.audioFile;
       const imageFile = req.files.imageFile;

       const audioUrl = await uploadToCloudinary(audioFile);
       const imageUrl = await uploadToCloudinary(imageFile);

       const song = new Song({
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumnId : albumnId || null
       })

       await song.save();

       // if song belongs to an albumn, update the albumn's songs array!
       if(albumnId){
        await Albumn.findByIdAndUpdate(albumnId,{
            $push : {songs : song._id},
        });
       }
       res.status(201).json(song);

    } catch (error) {   
        console.log("Error in create Song",error);
        next(error);
    }
}

export const deleteSong = async(req,res,next) =>{
    try {
        const {id} = req.params;

        const song = await Song.findById(id);

        if(song.albumnId){
            await Albumn.findByIdAndUpdate(song.albumnId,{
                $pull : {songs : song._id},
            })
        }
        await Song.findByIdAndDelete(id);

        res.status(200).json({message: "Song Delete Successfully"});

    } catch (error ) {
        console.log("Error in delete Song",error);
        next(error);
    }
}

export const createAlbumn = async(req,res,next) => {
    try {
        const {title,artist,releaseYear} = req.body;
        const {imageFile} = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const albumn = new Albumn({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await albumn.save();

        res.status(201).json(albumn);

    } catch (error) {
        console.log("Error in the create Albumn",error);
        next(error);
    }
}

export const deleteAlbumn = async(req,res,next) => {
    try {
        const {id} = req.params;
        await Song.deleteMany({albumnId : id});
        await Albumn.findByIdAndDelete(id);
        res.status(200).json({message: "Albumn delete Successfully"});
    } catch (error) {
        console.log("Error in deleteAlbumn",error);
        next(error);
    }
}

export const checkAdmin = async(req,res,next) => {
    res.status(200).json({admin : true});
}