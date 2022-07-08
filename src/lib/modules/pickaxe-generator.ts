import Pickaxe from "$lib/classes/pickaxe/pickaxe";
import Decimal from "break_infinity.js";

export function generateName(forQuality: Decimal){
    const qualities: string[] = ["Bad", "Sturdy", "Normal", "Rare", "Epic", "Legendary", "Superb",
    "Cosmic", "Divine", "Ultimate", "Godly", "Demigodly", "Supergodly", "OMEGA"];
    
    let qualityIndex = Math.min(qualities.length - 1, Decimal.log(forQuality, 1.4));
    qualityIndex = Math.floor(qualityIndex + Math.random());
    const qualityName: String = qualities[qualityIndex];

    return `${qualityName} Pickaxe`;
}

export function generatePickaxe(inputGems: Decimal){
    const quality: Decimal = new Decimal(1);

    return new Pickaxe(
        generateName(quality),
        inputGems.mul(20 * Math.random()),
        quality);
}