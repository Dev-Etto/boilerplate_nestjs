import { Test, TestingModule } from '@nestjs/testing';
import { ResponsibleService } from './responsible.service';
import { IResponsibleRepository } from '../repository/responsible.repository';
import { CreateResponsibleDto } from '../dto/create-responsible.dto';
import { UpdateResponsibleDto } from '../dto/update-responsible.dto';
import { ResponsibleDetailDto } from '../dto/responsible-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { ResponsiblePaginatedResponseDto } from '../dto/responsible-paginated-response.dto';

describe('ResponsibleService', () => {
  let service: ResponsibleService;
  let repository: jest.Mocked<IResponsibleRepository>;

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      list: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IResponsibleRepository>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsibleService,
        { provide: 'ResponsibleRepository', useValue: repository },
      ],
    }).compile();

    service = module.get<ResponsibleService>(ResponsibleService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create and return result', async () => {
      const dto: CreateResponsibleDto = {
        name: 'Test',
        phone: '123',
        email: 'test@email.com',
        cpf: '12345678900',
        companyId: 1,
      };
      const expected: ResponsibleDetailDto = {
        id: 1,
        name: 'Test',
        phone: '123',
        email: 'test@email.com',
        cpf: '12345678900',
        companyId: 1,
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
      const expected: ResponsiblePaginatedResponseDto = {
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
      const expected: ResponsibleDetailDto = {
        id: 1,
        name: 'Test',
        phone: '123',
        email: 'test@email.com',
        cpf: '12345678900',
        companyId: 1,
      };

      repository.findOne.mockResolvedValue(expected);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });

  describe('update', () => {
    it('should call repository.update and return result', async () => {
      const dto: UpdateResponsibleDto = { name: 'Updated' };
      const expected: ResponsibleDetailDto = {
        id: 1,
        name: 'Updated',
        phone: '123',
        email: 'test@email.com',
        cpf: '12345678900',
        companyId: 1,
      };

      repository.update.mockResolvedValue(expected);

      const result = await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, dto);
      expect(result).toBe(expected);
    });
  });

  describe('remove', () => {
    it('should call repository.remove and return result', async () => {
      const expected: ResponsibleDetailDto = {
        id: 1,
        name: 'Test',
        phone: '123',
        email: 'test@email.com',
        cpf: '12345678900',
        companyId: 1,
      };

      repository.remove.mockResolvedValue(expected);

      const result = await service.remove(1);

      expect(repository.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });
});
