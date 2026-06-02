import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateJobRequest } from 'src/application/dto/request/job/create.request';
import { UpdateJobRequest } from 'src/application/dto/request/job/update.request';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

const categoryId = '550e8400-e29b-41d4-a716-446655440000';
const jobId = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

const baseCreateFields = {
  enterpriseName: 'Empresa',
  jobTitle: 'Cargo',
  candidatedAt: '2025-01-01T00:00:00.000Z',
  categoryId,
} as const;

const baseUpdateFields = {
  ...baseCreateFields,
  id: jobId,
} as const;

async function validateCreate(
  overrides: Partial<{ jobLink: string | undefined }> = {},
) {
  const dto = plainToInstance(CreateJobRequest, {
    ...baseCreateFields,
    ...overrides,
  });
  return validate(dto);
}

async function validateUpdate(
  overrides: Partial<{ jobLink: string | undefined }> = {},
) {
  const dto = plainToInstance(UpdateJobRequest, {
    ...baseUpdateFields,
    ...overrides,
  });
  return validate(dto);
}

describe('CreateJobRequest jobLink', () => {
  it('aceita ausência de jobLink', async () => {
    const errors = await validateCreate();
    const jobLinkErrors = errors.filter((e) => e.property === 'jobLink');
    expect(jobLinkErrors).toHaveLength(0);
  });

  it('aceita string vazia ou só espaços (tratado como ausente)', async () => {
    for (const jobLink of ['', '   ', '\t']) {
      const errors = await validateCreate({ jobLink });
      const jobLinkErrors = errors.filter((e) => e.property === 'jobLink');
      expect(jobLinkErrors).toHaveLength(0);
    }
  });

  it('aceita URL HTTPS válida e faz trim', async () => {
    const errors = await validateCreate({
      jobLink: '  https://example.com/vaga  ',
    });
    const jobLinkErrors = errors.filter((e) => e.property === 'jobLink');
    expect(jobLinkErrors).toHaveLength(0);
  });

  it('rejeita HTTP com mensagem HTTPS', async () => {
    const errors = await validateCreate({ jobLink: 'http://example.com' });
    const jobLinkError = errors.find((e) => e.property === 'jobLink');
    expect(jobLinkError?.constraints?.isUrl).toBe(
      ValidationMessages.jobLinkMustBeValidHttpsUrl,
    );
  });

  it('rejeita texto que não é URL', async () => {
    const errors = await validateCreate({ jobLink: 'não-é-url' });
    const jobLinkError = errors.find((e) => e.property === 'jobLink');
    expect(jobLinkError?.constraints?.isUrl).toBe(
      ValidationMessages.jobLinkMustBeValidHttpsUrl,
    );
  });

  it('rejeita link com mais de 255 caracteres', async () => {
    const longPath = 'a'.repeat(255);
    const jobLink = `https://exemplo.com/${longPath}`;
    expect(jobLink.length).toBeGreaterThan(255);
    const errors = await validateCreate({ jobLink });
    const jobLinkError = errors.find((e) => e.property === 'jobLink');
    expect(jobLinkError?.constraints?.maxLength).toBe(
      ValidationMessages.jobLinkMaxLength,
    );
  });
});

describe('UpdateJobRequest jobLink', () => {
  it('aceita ausência de jobLink', async () => {
    const errors = await validateUpdate();
    const jobLinkErrors = errors.filter((e) => e.property === 'jobLink');
    expect(jobLinkErrors).toHaveLength(0);
  });

  it('rejeita HTTP com mensagem HTTPS', async () => {
    const errors = await validateUpdate({ jobLink: 'http://example.com' });
    const jobLinkError = errors.find((e) => e.property === 'jobLink');
    expect(jobLinkError?.constraints?.isUrl).toBe(
      ValidationMessages.jobLinkMustBeValidHttpsUrl,
    );
  });
});
