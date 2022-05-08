export interface IReliquaryMain {
    id: number;
    propDepotId: number;
    propType:string;
    affixName:string;
}
export interface IReliquaryAffixItem {
    id: number;
    index: number;
    depotId: number;
    groupId: number;
    propType:string;
    propValue:number;
}
export interface IReliquaryAffix {
    [propType: string]: IReliquaryAffixItem[]
}
export interface IReliquary {
    equipType: string;
    showPic: string;
    rankLevel: number;
    mainPropDepotId: number;
    appendPropDepotId: number;
    addPropLevels: Array<number>;
    baseConvExp: number;
    maxLevel: number;
    destroyReturnMaterial: Array<number>;
    destroyReturnMaterialCount: Array<number>;
    id: number;
    nameTextMapHash: number;
    descTextMapHash: number;
    icon: string;
    itemType: string;
    weight: number;
    rank: number;
    gadgetId: number
}

export default class ReliquaryDataProvider {
    private static reliquaryMains:IReliquaryMain[] = [];
    private static reliquaryAffixes:IReliquaryAffix = {};
    private static reliquaries:IReliquary[] = [];


    public static async init(){
        await this.loadReliquaries();
        await this.loadReliquaryMain();
        await this.loadReliquaryAffixes();
    }

    private static async loadReliquaryMain(){
        let data = await fetch("https://cdn.jsdelivr.net/gh/Dimbreath/GenshinData@master/ExcelBinOutput/ReliquaryMainPropExcelConfigData.json");
        let json:IReliquaryMain[] = await data.json();
        this.reliquaryMains = [];
        json.forEach(element => {
            if (this.reliquaryMains.filter(x => x.propType === element.propType).length === 0)
                this.reliquaryMains.push(element)
        });
    }

    private static async loadReliquaryAffixes(){
        let data = await fetch("https://cdn.jsdelivr.net/gh/Dimbreath/GenshinData@master/ExcelBinOutput/ReliquaryAffixExcelConfigData.json");
        let json:IReliquaryAffixItem[] = await data.json();
        this.reliquaryAffixes = {};
        json.map((item, index) => {
            if (item.propType in this.reliquaryAffixes) {
                this.reliquaryAffixes[item.propType].push(item)
                item["index"] = index
            } else {
                this.reliquaryAffixes[item.propType] = []
                item["index"] = index
                this.reliquaryAffixes[item.propType].push(item)
            }
        })
    }

    private static async loadReliquaries(){
        let data = await fetch("https://cdn.jsdelivr.net/gh/Dimbreath/GenshinData@master/ExcelBinOutput/ReliquaryExcelConfigData.json");
        this.reliquaries = await data.json();
    }


    public static getReliquaryMains():IReliquaryMain[]{
        return this.reliquaryMains;
    }

    public static getReliquaryAffixes():IReliquaryAffix{
        return this.reliquaryAffixes;
    }

    public static getReliquary():IReliquary[]{
        return this.reliquaries;
    }
}