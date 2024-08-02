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

    public static async deletePhoto(postId: number, image: string) {}
}

export default PhotoModel;