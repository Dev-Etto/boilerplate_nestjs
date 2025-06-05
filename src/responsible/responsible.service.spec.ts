import { Test, TestingModule } from '@nestjs/testing';
import { ResponsibleService } from './service/responsible.service';
import { IResponsibleRepository } from './repository';

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
});
