class GetPostsDTO {
    page?: number;
    perPage?: number;
    categoryId: number;
    sort?: string;
    target?: string;
    item?: string;
    price?: number;
    location?: string;

    constructor(
        categoryId: string,
        page?: string,
        perPage?: string,
        sort?: string,
        target?: string,
        item?: string,
        price?: string,
        location?: string
    ) {
        this.page = Number(page);
        this.perPage = Number(perPage);
        this.categoryId = Number(categoryId);
        this.sort = sort;
        this.target = target;
        this.item = item;
        this.price = Number(price);
        this.location = location;
    }
}

export default GetPostsDTO;