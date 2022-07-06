import Decimal from "break_infinity.js";
import ContentGems from "./content/content-gems";
import ContentMineObjects from "./content/content-mineobjects";
import ContentMoney from "./content/content-money";

export default class Game{
    constructor(){
        this.money = new ContentMoney();
        this.gems = new ContentGems();
        this.mineObjects = new ContentMineObjects();
    }
}