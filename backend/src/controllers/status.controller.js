import { Song } from "../models/song.model.js";
import { Albumn } from "../models/albumn.model.js";
import { User } from "../models/user.model.js";

export const getStatus = async(req,res,next)=>{
    try {
        
        const [totalSongs, totalAlbumns, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Albumn.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {   //fatch all the albumns and combine them
                    $unionWith : {
                        coll : "albumns",
                        pipeline : [],
                    }
                },
                {  //group them with the unique artist 
                    $group : {
                        _id : "artist",
                    }
                },
                {   //count number of artists
                    $count : "count"
                }
            ])
        ])

        res.status(200).json({
            totalAlbumns,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtists.length[0]?.$count || 0
        })

    } catch (error) {
        next(error);
    }
}