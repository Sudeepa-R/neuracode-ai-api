import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { UsersDetails } from './userDetails.entity';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { autoIncrementIds, createFilterQuery } from '../utils/mongoDB-helper/mongoose-helper';
import { UsersDetailsVm, UsersSaveDataVm } from '../view-model/user-details/user-details.vm';
import { generatePassword } from '../utils/helper-functions';


@Injectable()
export class UserDetailsServise {
  constructor(
    @InjectModel('UsersDetails')
    private readonly usersDetails: Model<UsersDetails>,
  ) {}

  async getUserByEmail(email: string): Promise<UsersDetailsVm> {
    if (!email) {
      throw new NotFoundException('Invalid Input');
    }
    const data = await this.usersDetails.findOne({ userEmail: email });
    if (!data) {
      throw new NotFoundException(`User not found for the email :${email}`);
    }
    return data;
  }

  async saveUser(usersData:UsersSaveDataVm):Promise<UsersDetails>{
    if(!usersData){
      throw new HttpException('Empty Data', HttpStatus.BAD_REQUEST);
    }
    const data= await this.usersDetails.find()
    usersData.userId=autoIncrementIds(data,'userId')
    usersData['password']=generatePassword()
    return await this.usersDetails.create(usersData)
  }

  async deleteUser(userId:number){
    if(!userId){
      throw new HttpException(`Invalid user id: ${userId}`,HttpStatus.BAD_REQUEST)
    }
    const data=await this.usersDetails.findOneAndDelete({userId:userId})
    if(!data){
      throw new NotFoundException(`User not found for th userId :${userId}`)
    }
    return {message:'User deleted successfully.',statuseCode: HttpStatus.OK}
  }

  async updateUsersDetails(userData:UsersDetailsVm){
    if(!userData.userEmail){
      throw new HttpException(`Invalid user Email id: ${userData.userEmail}`,HttpStatus.BAD_REQUEST)
    }
    const data=await this.usersDetails.findOneAndUpdate(userData)
    const result={
      data:data,
      status:'success',
      message:"User updated successfully!"
    }
    return result

  }

  async getAllUsers(query: PaginateQuery): Promise<Paginated<UsersDetails>> {
    const filter = createFilterQuery<UsersDetails>(query.filter);
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy?.reduce(
      (acc, [field, order]) => {
        acc[field] = order === 'ASC' ? 1 : -1;
        return acc;
      },
      {} as { [key: string]: SortOrder },
    ) || { id: 1 };

    const partnerFunctionsData = await this.usersDetails
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalItems = await this.usersDetails.countDocuments(filter);
    const baseUrl = `?limit=${limit}`;

    const result: Paginated<UsersDetails> = {
      data: partnerFunctionsData,
      meta: {
        totalItems,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        search: query.search || '',
        select: query.select || [],
        filter: query.filter,
        sortBy: [],
        searchBy: [],
      },
      links: {
        first: `${baseUrl}&page=1`,
        previous: page > 1 ? `${baseUrl}&page=${page - 1}` : '',
        next: page * limit < totalItems ? `${baseUrl}&page=${page + 1}` : '',
        last: `${baseUrl}&page=${Math.ceil(totalItems / limit)}`,
        current: `${baseUrl}&page=${page}`,
      },
    };
    return result;
  }
}
