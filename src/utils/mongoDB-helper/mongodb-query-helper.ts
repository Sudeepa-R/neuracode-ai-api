// import { HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
// import { Connection, Model } from "mongoose";

// @Injectable()
// export class AutoIncreament{
//     private readonly logger= new Logger(AutoIncreament.name);
//     constructor(private readonly connections:Connection){

//     }
//     async autoIncrementIds(tableName:string):Promise<Number>{
//         if(!this.checkTableExist(tableName)){
//             throw new NotFoundException(`Table ${tableName} not Found`)
//         }

//         const targetRepo= this.getTargetRepository(tableName);

//         if(!targetRepo){
//             throw new NotFoundException(`Repository not found for the table : ${tableName}`)
//         }
//         const data=await targetRepo.find()
//         console.log(1111111111,data)
//         return 1

//     }

//     async checkTableExist(tableName:string):Promise<boolean>{
//         try{
//             const tableCollection= await this.connections.db.listCollections().toArray()
//             return tableCollection.some((table)=>table.name===tableName);
//         }
//         catch{
//             this.logger.error("Error checking the table")
//             return false
//         }
//     }

//     public getTargetRepository<T>(tableName: string): Model<T> {
//         return this.connections.model<T>(tableName);
//     }
    
    
// }