export class ProductDataModel
{
    public productImage: string;
    public productName: string;
    public productId: string;
    public variationName: string;
    public size: string;
    public price: number;
    public noItem: number;

    constructor(productImage: string, productName: string, productId: string, variationName: string, size: string, price: number, noItem: number)
    {   
        this.productImage = productImage;
        this.productName = productName;
        this.productId = productId;
        this.variationName = variationName;
        this.size = size;
        this.price = price;
        this.noItem = noItem;
    }
}