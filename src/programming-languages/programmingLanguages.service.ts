import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProgrammingLanguages } from './programmingLanguages.entity';
import { Model, SortOrder } from 'mongoose';
import { ProgrammingLanguagesVM } from 'src/view-model/ProgrammingLanguagesVM/ProgrammingLanguages.vm';
import {
  autoIncrementIds,
  createFilterQuery,
} from 'src/utils/mongoDB-helper/mongoose-helper';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ProgrammingLanguagesServices {
  constructor(
    @InjectModel(ProgrammingLanguages.name)
    private readonly programmingLanguagesModel: Model<ProgrammingLanguages>,
  ) {}

  async getAllPrgammingLanguages(
    query: PaginateQuery,
  ): Promise<Paginated<ProgrammingLanguages>> {
    const filter = createFilterQuery<ProgrammingLanguages>(query.filter);
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
    const data= await this.programmingLanguagesModel
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .exec()
    // return await this.programmingLanguagesModel.find();
    const totalItems = await this.programmingLanguagesModel.countDocuments(filter);
    const baseUrl = `?limit=${limit}`;

     const result: Paginated<ProgrammingLanguages> = {
          data: data,
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

  async deletePL(plId: number) {
    try {
      if (!plId) {
        throw new HttpException('plId Not found', HttpStatus.BAD_REQUEST);
      }
      const data = await this.programmingLanguagesModel.findOneAndDelete({
        plId: plId,
      });
      if (!data) {
        throw new HttpException('plId Not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Programing Language deleted Successfully!',
        status: true,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err?.message || 'Error while updating the Programing Languages',
        err?.statuseCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async save(updatedData: ProgrammingLanguagesVM): Promise<boolean> {
    try {
      if (updatedData?.plId > 0) {
        const data = await this.programmingLanguagesModel.updateOne(
          { plId: updatedData.plId },
          updatedData,
        );
        return data.modifiedCount > 0;
      } else {
        const data = await this.programmingLanguagesModel.find();
        updatedData['plId'] = autoIncrementIds(data, 'plId');
        await this.programmingLanguagesModel.create(updatedData);
        return true;
      }
    } catch (err) {
      throw new HttpException(
        err?.message || 'Error while updating the ProgrammingLanguages',
        err?.statuseCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
