import PostDb from "@_models/postDb";
import { Post, PostCreationData, PostUpdateData, PostStatus, PostSearchCriteria, PostWithDetails, Paginations, Filters, PostCreation, Status } from "@_/customTypes/postType";
import { calculatePriceRange } from "@_/utils";
import PostCreateDTO from "@_/middlewares/DTOs/postCreateDTO";
import ExchangeCreateDTO from "@_/middlewares/DTOs/exchangeCreateDTO";

class PostModel extends PostDb {
    public static async createNormalPost(data: PostCreateDTO) {
        const sqlTitle = data.title ? ', title' : '';
        const sqlTitle2 = data.title ? ', ?' : '';
        
        const sql = `
            INSERT INTO post(user_id, category_id${sqlTitle}, content)
            VALUES (?, ?${sqlTitle2}, ?)
        `;
        const sqlData = data.title ? [data.userId, data.categoryId, data.title, data.content] : [data.userId, data.categoryId, data.content];
        return await this.insert(sql, sqlData);
    }


    public static async createPost(data: ExchangeCreateDTO): Promise<Post> {
        const { userId, categoryId, title, content, status, item, target, location, price, sort } = data;

        // post create 쿼리
        const postSql = `
            INSERT INTO post (user_id, category_id, title, content)
            VALUES (?, ?, ?, ?)
        `;

        const postValues = [userId, categoryId, title, content];
        const post_id = await this.insert(postSql, postValues);

        // postExchangeDetail create 쿼리
        const detailSql = `
            INSERT INTO post_exchange_detail (post_id, item, target, location, price, status, sort)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const detailValues = [post_id, item, target, location, price, status, sort];
        await this.insert(detailSql, detailValues);

        return {
            id: post_id, 
            user_id: userId,
            category_id: categoryId,
            title,
            content,
            status,
            item,
            target,
            location,
            price,
            sort,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        } as Post;
    }

    public static async findNormalById(postId: number) {
        const sql = `
            SELECT p.*, u.nickname, u.image as user_image
            FROM post p
            JOIN user u ON p.user_id = u.id
            WHERE p.id = ? AND p.deleted_at IS NULL
        `;
        return await this.findOne(sql, [postId]);
    }

    public static async findById(post_id: number): Promise<PostWithDetails | null> {
        // post_id로 게시글 정보 조회(post(p) + post_exchange_detail(ped) + user(u) join)
        const sql = `
            SELECT p.*, ped.*, u.nickname, u.image as user_image
            FROM post p
            JOIN post_exchange_detail ped ON p.id = ped.post_id
            JOIN user u ON p.user_id = u.id
            WHERE p.id = ? AND p.deleted_at IS NULL
        `;
        const result = await this.findOne(sql, [post_id]);
        return result;
    }

    public static async updateNormalPost(postId: number, data: {title?: string, content?: string}) {
        let sqlMiddle = '';
        const preparedData = [];
        if (!data) {
            return;
        } else if (data.title && data.content) {
            sqlMiddle = `title = ?, content = ?`;
            preparedData.push(data.title);
            preparedData.push(data.content);
        } else if (data.title) {
            sqlMiddle = `title = ?`;
            preparedData.push(data.title);
        } else if (data.content) {
            sqlMiddle = `content = ?`;
            preparedData.push(data.content);
        }
        const sql = `UPDATE post SET ${sqlMiddle} WHERE id = ? AND deleted_at IS NULL`;
        const sqlData = [...preparedData, postId];
        await this.update(sql, sqlData);
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
            detailUpdateFields.push('status = ?');
            detailUpdateValues.push(updateData.status);
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
                WHERE id = ? AND deleted_at IS NULL
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

    public static async updatePostStatus(postId: number, status: Status) {
        const sql = `UPDATE post_exchange_detail SET status = ? WHERE post_id = ?`;
        return await this.update(sql, [status, postId]);
    } 

    public static async softDeletePost(post_id: number): Promise<boolean> {
        const sql = 'UPDATE post SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL';
        const result = await this.update(sql, [post_id]);
        return result > 0;
    }

    public static async deleteByUserId(userId: number) {
        const sql = 'UPDATE post SET deleted_at = CURRENT_TIMESTAMP WHERE user_id = ? AND deleted_at IS NULL';
        await this.update(sql, [userId]);
        return;
    }
// -------------------------------------------------------------------------------------
// 아래부터는 작동유무 확인 및 다른 모델 정의 필요
    // category_id에 해당하는 게시글 조회
    public static async getPostsCount(category_id: number, filters?: Filters|undefined): Promise<number> {
        let sqlJoin = '';
        if (filters) {
            sqlJoin = 'JOIN post_exchange_detail ped ON p.id = ped.post_id';
        }

        let dataFilter: Array<string|number|undefined> = [];
        let sqlMiddle = '';
        if (filters) {
            const {sort, target, item, price, location, status} = filters;

            const sqlStatus = status ? ` ped.status = ? AND`: '';
            const sqlSort = sort ? ` ped.sort = ? AND`: '';
            const sqlTarget = target ? ` ped.target = ? AND`: '';
            const sqlItem = item ? ` ped.item = ? AND`: '';
            const sqlLocation = location ? ` ped.location = ? AND`: '';
            const priceRange = calculatePriceRange(price);
            const sqlPrice = !priceRange ? '' : !priceRange.max ? ` ped.price >= ? AND` : ` ped.price >= ? AND ped.price < ? AND`;
            
            const dataFilterUnde: Array<string|number|undefined> = [status, sort, target, item, location];
            if (priceRange) {
                dataFilterUnde.push(priceRange.min);
                dataFilterUnde.push(priceRange.max);
            }

            sqlMiddle += sqlStatus + sqlSort + sqlTarget + sqlItem + sqlLocation + sqlPrice;
            dataFilter = dataFilterUnde.filter(data => data !== undefined);
        }

        const sql = `
            SELECT COUNT(p.id) as count
            FROM post p
            ${sqlJoin}
            WHERE ${sqlMiddle} p.category_id = ? AND p.deleted_at IS NULL
        `;
        const result = await this.findOne(sql, [...dataFilter, category_id]);
        return result.count;
    }

    // 작동 유무 미정 - 페이지네이션
    // category)id 해당 게시글 목록 페이지네이션
    // post + postExchange_detail + user join => 상세정보 조회 + 작성자 조회
    
    public static async getPosts(paginations:Paginations, filters?: Filters|undefined, postId?: number|undefined): Promise<PostWithDetails[]> {
        const {page, perPage, categoryId} = paginations;

        let dataFilter: Array<string|number|undefined> = [];
        let sqlMiddle = '';
        if (filters) {
            const {sort, target, item, price, location, status} = filters;

            const sqlStatus = status ? ` ped.status = ? AND`: '';
            const sqlSort = sort ? ` ped.sort = ? AND`: '';
            const sqlTarget = target ? ` ped.target = ? AND`: '';
            const sqlItem = item ? ` ped.item = ? AND`: '';
            const sqlLocation = location ? ` ped.location = ? AND`: '';
            const priceRange = calculatePriceRange(price);
            const sqlPrice = !priceRange ? '' : !priceRange.max ? ` ped.price >= ? AND` : ` ped.price >= ? AND ped.price < ? AND`;
            
            const dataFilterUnde: Array<string|number|undefined> = [status, sort, target, item, location];
            if (priceRange) {
                dataFilterUnde.push(priceRange.min);
                dataFilterUnde.push(priceRange.max);
            }

            sqlMiddle += sqlStatus + sqlSort + sqlTarget + sqlItem + sqlLocation + sqlPrice;
            dataFilter = dataFilterUnde.filter(data => data !== undefined);
        }
        if (postId) {
            sqlMiddle += ` p.id != ? AND`;
            dataFilter.push(postId);
        }
        
        const offset = (page - 1) * perPage;

        const sql = `
            SELECT p.*, ped.*, u.nickname, u.image as user_image
            FROM post p
            JOIN post_exchange_detail ped ON p.id = ped.post_id
            JOIN user u ON p.user_id = u.id
            WHERE${sqlMiddle} p.category_id = ? AND p.deleted_at IS NULL
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        `;
        const dataPagination = [categoryId, String(perPage), String(offset)];
        const data = dataFilter ? [...dataFilter, ...dataPagination]: dataPagination;
        return await this.findMany(sql, data);
    }

    public static async getNormalPosts({page, perPage, categoryId}:Paginations) {
        const sql = `
            SELECT p.*, u.nickname, u.image as user_image
            FROM post p
            JOIN user u ON p.user_id = u.id
            WHERE p.category_id = ? AND p.deleted_at IS NULL
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        `;
        const offset = (page - 1) * perPage;
        const data = [categoryId, String(perPage), String(offset)];
        return await this.findMany(sql, data);
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

