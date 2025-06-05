import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { ICompanyRepository } from '../repository/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyDetailDto } from '../dto/company-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { CompanyPaginatedResponseDto } from '../dto/company-paginated-response.dto';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: jest.Mocked<ICompanyRepository>;

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      list: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: 'CompanyRepository', useValue: repository },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create and return result', async () => {
      const dto: CreateCompanyDto = { name: 'Test' };
      const expected: CompanyDetailDto = {
        id: 1,
        name: 'Test',
        responsible: null,
        products: [],
      };

      repository.create.mockResolvedValue(expected);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result).toBe(expected);
    });
  });

  describe('list', () => {
    it('should call repository.list and return result', async () => {
      const query: PaginationQueryDto = { page: 1, pageSize: 10 };
      const expected: CompanyPaginatedResponseDto = {
        nodes: [],
        count: 0,
        page: 1,
        pageSize: 10,
      };

      repository.list.mockResolvedValue(expected);

      const result = await service.list(query);

      expect(repository.list).toHaveBeenCalledWith(query);
      expect(result).toBe(expected);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne and return result', async () => {
      const expected: CompanyDetailDto = {
        id: 1,
        name: 'Test',
        responsible: null,
        products: [],
      };

      repository.findOne.mockResolvedValue(expected);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });

  describe('update', () => {
    it('should call repository.update and return result', async () => {
      const dto: UpdateCompanyDto = { name: 'Updated' };
      const expected: CompanyDetailDto = {
        id: 1,
        name: 'Updated',
        responsible: null,
        products: [],
      };

      repository.update.mockResolvedValue(expected);

      const result = await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, dto);
      expect(result).toBe(expected);
    });
  });

  describe('remove', () => {
    it('should call repository.remove and return result', async () => {
      const expected: CompanyDetailDto = {
        id: 1,
        name: 'Test',
        responsible: null,
        products: [],
      };

      repository.remove.mockResolvedValue(expected);

      const result = await service.remove(1);

      expect(repository.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });
});
