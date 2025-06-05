import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { IProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductDetailDto } from '../dto/product-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { ProductPaginatedResponseDto } from '../dto/product-paginated-response.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<IProductRepository>;

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
        ProductService,
        { provide: 'ProductRepository', useValue: repository },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create and return result', async () => {
      const dto: CreateProductDto = {
        name: 'Test',
        price: 10,
        companyId: 1,
      };

      const expected: ProductDetailDto = {
        id: 1,
        name: 'Test',
        price: 10,
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
      const expected: ProductPaginatedResponseDto = {
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
      const expected: ProductDetailDto = {
        id: 1,
        name: 'Test',
        price: 10,
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
      const dto: UpdateProductDto = { name: 'Updated' };
      const expected: ProductDetailDto = {
        id: 1,
        name: 'Updated',
        price: 10,
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
      const expected: ProductDetailDto = {
        id: 1,
        name: 'Test',
        price: 10,
        companyId: 1,
      };

      repository.remove.mockResolvedValue(expected);

      const result = await service.remove(1);

      expect(repository.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });
});
