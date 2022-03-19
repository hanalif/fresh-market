
import { ItemSubcategory } from "./itemSubcategory.model";

export interface ItemCategory{
    _id: string,
    mainCategoryName: string,
    subCategiries: ItemSubcategory[]
}
