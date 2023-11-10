import { Test, TestingModule } from '@nestjs/testing';
import { RequestsEventsResolver } from './requests-events.resolver';

describe('RequestsEventsResolver', () => {
  let resolver: RequestsEventsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestsEventsResolver],
    }).compile();

    resolver = module.get<RequestsEventsResolver>(RequestsEventsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
