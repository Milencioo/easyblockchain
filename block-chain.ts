import * as CryptoJS from "crypto-js"



class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index,
            this.hash = hash,
            this.previousHash = previousHash,
            this.data = data,
            this.timestamp = timestamp
    }
    //calculating blockhash
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    //validating the structure of block
    static validateStructures = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";


}
//PRIMJER KREIRANJA PRVOG BLOKA I NJEGOVI ULAZNI PARAMETRI
const genesisBlock: Block = new Block(0, "1515151", "", "asdads", 123456789)

let blockchain: [Block] = [genesisBlock]

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1]
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)
//objasnit sta je ulazna vrijednost data:string
const createNewBlock = (data: string): Block => {
    //NOVE INFORMACIJE ZA KREIRANJE NOVOG BLOCKA
    //BAZIRANE NA PRVOME BLOKU TJ PRVOM PRETHODNOM
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    //NOVI BLOK
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    )

    return newBlock;
}

const getHashforBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    )

const isBlockValid = (nowBlock: Block, prevBlock: Block): boolean => {
    if (!Block.validateStructures(nowBlock)) {
        return false;
    } else if (prevBlock.index + 1 !== nowBlock.index) {
        return false;
    } else if (prevBlock.hash !== nowBlock.previousHash) {
        return false;
    } else if (getHashforBlock(nowBlock) !== nowBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (nowBlock: Block): void => {
    if (isBlockValid(nowBlock, getLatestBlock())) {
        blockchain.push(nowBlock)
    }
};

createNewBlock("second block")

export { }