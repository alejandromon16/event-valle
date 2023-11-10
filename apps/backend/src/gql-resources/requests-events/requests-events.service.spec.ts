import { Test, TestingModule } from '@nestjs/testing';
import { RequestsEventsService } from './requests-events.service';

describe('RequestsEventsService', () => {
  let service: RequestsEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestsEventsService],
    }).compile();

    service = module.get<RequestsEventsService>(RequestsEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
