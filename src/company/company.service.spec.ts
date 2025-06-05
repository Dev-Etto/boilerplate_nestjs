import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './service/company.service';
import { ICompanyRepository } from './repository';

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
    } as jest.Mocked<ICompanyRepository>;
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
});
