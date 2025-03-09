import { NotFoundException } from "@nestjs/common";
import { FilterQuery } from "mongoose";

type FilterQueryKeys<T>=keyof FilterQuery<T>;

export function createFilterQuery<T>(filter:{[column:string]:string|string[]}):FilterQuery<T>{
    const filterQuery: FilterQuery<T>={};

    for (const column in filter){
        if(Object.prototype.hasOwnProperty.call(filter,column)){
            const value=filter[column];
            if(Array.isArray(value)){
                filterQuery[column as FilterQueryKeys<T>]={$in: value};
            }else{
                const [operator, operand]=(value as string).split(":");
                switch(operator){
                    case '$eq':
                    case "$ne":
                    case "$gt":
                    case "$lt":
                    case "$gte":
                    case "$lte":
                        filterQuery[column as FilterQueryKeys<T>]={[operator]:operand};
                        break
                    case '$in':
                        const inValues=operand.split(',').map(val=>Number(val.trim()));
                        filterQuery[column as FilterQueryKeys<T>]={$in:inValues};
                        break;
                    case '$ilike':
                        filterQuery[column as FilterQueryKeys<T>]={$regex:new RegExp(operand,'i')}
                        break;
                    case '$btw':
                        const [start,end]=operand.split(',')
                        const startDate= new Date(start);
                        const endDate=new Date(end)
                        endDate.setHours(23,59,59,999);
                        filterQuery[column as FilterQueryKeys<T>]={
                            $gte:startDate,
                            $lte:endDate,
                        };
                        break;
                    default:
                        filterQuery[column as FilterQueryKeys<T>]={$eq:value};
                        break;
                }
            }
        }
    }
    return filterQuery
}

export function autoIncrementIds(data: Record<string, any>[], idName: string): number {
    const lastEntry = data.at(-1); 
    return lastEntry ? lastEntry[idName] + 1 : 1000;
}