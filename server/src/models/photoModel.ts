import PostDb from "@_models/postDb";

class PhotoModel extends PostDb {  
    public static async createPhotos(postId: number, images: Array<string>) {
        const qs = new Array(images.length).fill('(?, ?)').join(', ');
        const sql = `INSERT INTO photo(post_id, url) VALUES ${qs}`;
        const data = images.reduce((arr, image): any => [...arr, postId, image], []);
        const result = await this.insert(sql, data);
        return result;
    }

    public static async deleteAllPhotos(postId: number) {
        const sql = `UPDATE photo SET deleted_at = CURRENT_TIMESTAMP WHERE post_id = ? AND deleted_at IS NULL`;
        const data = [postId];
        const result = await this.update(sql, data);
        console.log(result);
        return;
    }

    public static async deletePhoto(photoId: number) {
        const sql = `UPDATE photo SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`;
        const result = await this.update(sql, [photoId]);
        return result;
    }

    public static async getPhotosByPostId(postId: number, count?: number) {
        const sql = `SELECT * FROM photo WHERE post_id = ? AND deleted_at IS NULL`;
        const addSql = count ? ` LIMIT ?` : '';
        const data = count ? [postId, count] : [postId];
        const result = await this.findMany(sql + addSql, data);
        return result;
    }

    public static async getPhotoById(photoId: number) {
        const sql = `SELECT * FROM photo WHERE id = ? AND deleted_at IS NULL`;
        const result = await this.findOne(sql, [photoId]);
        return result;
    }

    public static async getPhotosCount(postId: number) {
        const sql = `SELECT COUNT(id) AS count FROM photo WHERE post_id = ? AND deleted_at IS NULL`;
        const result = await this.findOne(sql, [postId]);
        return result;
    }

    public static async getMainPhotoByPostId(postId: number) {
        const sql = `SELECT * FROM photo WHERE post_id = ? AND is_main = TRUE AND deleted_at IS NULL`;
        const result = await this.findOne(sql, [postId]);
        return result;
    }

    public static async updatePhoto(photoId: number, newUrl: string) {
        const sql = `UPDATE photo SET url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`;
        const result = await this.update(sql, [newUrl, photoId]);
        return result;
    }
}

export default PhotoModel;