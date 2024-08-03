import FavoriteModel from "@_/models/favoriteModel";

class FavoriteService {
    static async createFavorite(postId: number, userId: number) {
        return await FavoriteModel.create(postId, userId);
    }

    static async deleteFavorite(postId: number, userId: number) {
        return await FavoriteModel.deleteOne(postId, userId);
    }
}

export default FavoriteService;