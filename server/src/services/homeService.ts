import FavoriteModel from "@_/models/favoriteModel";
import PhotoModel from "@_/models/photoModel";
import PostModel from "@_/models/postModel";

class HomeService {
    static async getExchangeByLimit(limit: number, userId: number|undefined) {
        const paginations = {
            page: 1,
            perPage: limit,
            categoryId: 1,
        }
        const foundPosts = await PostModel.getPosts(paginations);
        const posts = await Promise.all(foundPosts.map(async (post) => {
            const isMyFavorite = userId ? await FavoriteModel.findOneByUserId(post.id, userId) : false;
            const foundMainImage = await PhotoModel.getMainPhotoByPostId(post.id);
            const thumbnail = foundMainImage ? {id: foundMainImage.id, url: foundMainImage.url} : {id: undefined, url: undefined};
            return {
                postId: post.id,
                userId: post.user_id,
                nickname: post.nickname,
                userImage: post.user_image,
                title: post.title,
                content: post.content,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                price: post.price,
                location: post.location,
                status: post.status,
                target: post.target,
                item: post.item,
                sort: post.sort,
                isMyFavorite: !!isMyFavorite,
                thumbnail
            };    
        }));
        return posts;
    }

    static async getReformByLimit(limit: number, userId: number|undefined) {
        const paginations = {
            page: 1,
            perPage: limit,
            categoryId: 3,
        }
        const foundPosts = await PostModel.getNormalPosts(paginations);
        const posts = await Promise.all(foundPosts.map(async (post) => {
            const isMyFavorite = userId ? await FavoriteModel.findOneByUserId(post.id, userId) : false;
            const foundMainImage = await PhotoModel.getMainPhotoByPostId(post.id);
            const thumbnail = foundMainImage ? {id: foundMainImage.id, url: foundMainImage.url} : {id: undefined, url: undefined};
            return {
                postId: post.id,
                userId: post.user_id,
                nickname: post.nickname,
                userImage: post.user_image,
                title: post.title,
                content: post.content,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                isMyFavorite: !!isMyFavorite,
                thumbnail
            };    
        }));
        return posts;
    }

    static async getBinByLimit(limit: number, userId: number|undefined) {
        const paginations = {
            page: 1,
            perPage: limit,
            categoryId: 2,
        }
        const foundPosts = await PostModel.getNormalPosts(paginations);
        const posts = await Promise.all(foundPosts.map(async (post) => {
            const isMyFavorite = userId ? await FavoriteModel.findOneByUserId(post.id, userId) : false;
            const foundMainImage = await PhotoModel.getMainPhotoByPostId(post.id);
            const thumbnail = foundMainImage ? {id: foundMainImage.id, url: foundMainImage.url} : {id: undefined, url: undefined};
            return {
                postId: post.id,
                userId: post.user_id,
                nickname: post.nickname,
                userImage: post.user_image,
                title: post.title,
                content: post.content,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                isMyFavorite: !!isMyFavorite,
                thumbnail
            };    
        }));
        return posts;
    }
}

export default HomeService;