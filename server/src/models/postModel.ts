import PostDb from "@_models/postDb";
import { Post, PostCreationData, PostUpdateData, PostStatus, PostSearchCriteria, PostWithDetails } from "@_/customTypes/postType";

class PostModel extends PostDb {

    public static async createPost(postData: PostCreationData): Promise<Post> {
        const { user_id, category_id, title, content, status, item, target, location, price } = postData;

        // post create 쿼리
        const postSql = `
            INSERT INTO post (user_id, category_id, title, content, status)
            VALUES (?, ?, ?, ?, ?)
        `;

        const postValues = [user_id, category_id, title, content, status];
        const post_id = await this.insert(postSql, postValues);

        // postExchangeDetail create 쿼리
        const detailSql = `
            INSERT INTO post_exchange_detail (post_id, item, target, location, price)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const detailValues = [post_id, item, target, location, price];
        await this.insert(detailSql, detailValues);

        return {
            post_id, 
            user_id,
            category_id,
            title,
            content,
            status,
            item,
            target,
            location,
            price,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        } as Post;
    }

    public static async findById(post_id: number): Promise<PostWithDetails | null> {
        // post_id로 게시글 정보 조회(post(p) + post_exchange_detail(ped) + user(u) join)
        const sql = `
            SELECT p.*, ped.*, u.nickname, u.image as user_image
            FROM post p
            JOIN post_exchange_detail ped ON p.post_id = ped.post_id
            JOIN user u ON p.user_id = u.user_id
            WHERE p.post_id = ? AND p.deleted_at IS NULL
        `;
        return await this.findOne(sql, [post_id]);
    }

    public static async updatePost(post_id: number, updateData: PostUpdateData): Promise<PostWithDetails | null> {
        const postUpdateFields: string[] = [];
        const postUpdateValues: any[] = [];
        const detailUpdateFields: string[] = [];
        const detailUpdateValues: any[] = [];
        
        if (updateData.title !== undefined) {
            postUpdateFields.push('title = ?');
            postUpdateValues.push(updateData.title);
        }
        if (updateData.content !== undefined) {
            postUpdateFields.push('content = ?');
            postUpdateValues.push(updateData.content);
        }
        if (updateData.status !== undefined) {
            postUpdateFields.push('status = ?');
            postUpdateValues.push(updateData.status);
        }
        if (updateData.item !== undefined) {
            detailUpdateFields.push('item = ?');
            detailUpdateValues.push(updateData.item);
        }
        if (updateData.target !== undefined) {
            detailUpdateFields.push('target = ?');
            detailUpdateValues.push(updateData.target);
        }
        if (updateData.location !== undefined) {
            detailUpdateFields.push('location = ?');
            detailUpdateValues.push(updateData.location);
        }
        if (updateData.price !== undefined) {
            detailUpdateFields.push('price = ?');
            detailUpdateValues.push(updateData.price);
        }

        if (postUpdateFields.length > 0) {
            // postUpdateFields에 수정 필드 추가 후 기준으로 쿼리 생성(동적)
            const postSql = `
                UPDATE post 
                SET ${postUpdateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
                WHERE post_id = ? AND deleted_at IS NULL
            `;
            await this.update(postSql, [...postUpdateValues, post_id]);
        }

        if (detailUpdateFields.length > 0) {
            const detailSql = `
                UPDATE post_exchange_detail 
                SET ${detailUpdateFields.join(', ')}
                WHERE post_id = ?
            `;
            await this.update(detailSql, [...detailUpdateValues, post_id]);
        }

        return this.findById(post_id);
    }

    public static async softDeletePost(post_id: number): Promise<boolean> {
        const sql = 'UPDATE post SET deleted_at = CURRENT_TIMESTAMP WHERE post_id = ? AND deleted_at IS NULL';
        const result = await this.update(sql, [post_id]);
        return result > 0;
    }
// -------------------------------------------------------------------------------------
// 아래부터는 작동유무 확인 및 다른 모델 정의 필요
    // category_id에 해당하는 게시글 조회
    public static async getPostsCount(category_id: number): Promise<number> {
        const sql = `
            SELECT COUNT(*) as count
            FROM post p
            WHERE p.category_id = ? AND p.deleted_at IS NULL
        `;
        const result = await this.findOne(sql, [category_id]);
        return result.count;
    }

    // 작동 유무 미정 - 페이지네이션
    // category)id 해당 게시글 목록 페이지네이션
    // post + postExchange_detail + user join => 상세정보 조회 + 작성자 조회
    
    public static async getPosts(category_id: number, page: number, perPage: number): Promise<PostWithDetails[]> {
        const offset = (page - 1) * perPage;
        const sql = `
            SELECT p.*, ped.*, u.nickname, u.image as user_image
            FROM post p
            JOIN post_exchange_detail ped ON p.post_id = ped.post_id
            JOIN user u ON p.user_id = u.user_id
            WHERE p.category_id = ? AND p.deleted_at IS NULL
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        `;
        return await this.findMany(sql, [category_id, perPage, offset]);
    }

    // 특정 게시글의 댓글 수를 조회하는 메서드 (댓글 작동부분이 아직 없음)   => 댓글 모델 필요
    public static async getCommentsCount(post_id: number): Promise<number> {
        const sql = 'SELECT COUNT(*) as count FROM comment WHERE post_id = ? AND deleted_at IS NULL';
        const result = await this.findOne(sql, [post_id]);
        return result.count;
    }

    // 썸네일 설정    =>  이미지 모델 설정 전
    public static async getMainImage(post_id: number): Promise<string | null> {
        const sql = 'SELECT image_url FROM photo WHERE post_id = ? AND is_main = true LIMIT 1';
        const result = await this.findOne(sql, [post_id]);
        return result ? result.image_url : null;
    }

    // 좋아요 확인 => 좋아요 모델 없음?
    public static async checkMyFavorite(user_id: number, post_id: number): Promise<boolean> {
        const sql = 'SELECT * FROM favorite WHERE user_id = ? AND post_id = ?';
        const result = await this.findOne(sql, [user_id, post_id]);
        return !!result;
    }
}

export default PostModel;

