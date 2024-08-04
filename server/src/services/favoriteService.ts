import FavoriteModel from "@_/models/favoriteModel";

class FavoriteService {
    static async toggleFavorite(postId: number, userId: number) {
        const foundFavorite = await FavoriteModel.findOneByUserId(postId, userId);
        if (!foundFavorite) {
            return await FavoriteModel.create(postId, userId);
        }
        return await FavoriteModel.deleteOne(postId, userId);
    }
}

export default FavoriteService;