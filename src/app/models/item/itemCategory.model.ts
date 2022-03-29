
import { ItemSubcategory } from "./itemSubcategory.model";

export interface ItemCategory{
    _id: string,
    mainCategoryName: string,
    linkImage: string,
    subCategiries: ItemSubcategory[]
}
