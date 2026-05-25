/** Mensagens de validação class-validator para o cliente (português). */
export const ValidationMessages = {
  emailInvalid: 'Informe um e-mail válido.',
  passwordRequired: 'A senha é obrigatória.',
  currentPasswordRequired: 'A senha atual é obrigatória.',
  newPasswordRequired: 'A nova senha é obrigatória.',
  passwordMinLength: 'A senha deve ter pelo menos 8 caracteres.',
  passwordMaxLength: 'A senha deve ter no máximo 20 caracteres.',
  nameMustBeText: 'O nome deve ser um texto válido.',
  userNameMaxLength: 'O nome deve ter no máximo 150 caracteres.',
  passwordMustBeText: 'A senha deve ser um texto válido.',
  categoryIdMustBeUuid: 'O identificador da categoria deve ser um UUID válido.',
  categoryNameMustBeText: 'O nome da categoria deve ser um texto válido.',
  categoryNameMaxLength:
    'O nome da categoria deve ter no máximo 150 caracteres.',
  entityIdMustBeUuid: 'O identificador deve ser um UUID válido.',
  sortOrderMustBeInteger: 'A ordem deve ser um número inteiro.',
  sortOrderNonNegative: 'A ordem deve ser maior ou igual a zero.',
  enterpriseNameMustBeText: 'O nome da empresa deve ser um texto válido.',
  enterpriseNameMaxLength: 'O nome da empresa deve ter no máximo 150 caracteres.',
  jobTitleMustBeText: 'O título da vaga deve ser um texto válido.',
  jobTitleMaxLength: 'O título da vaga deve ter no máximo 150 caracteres.',
  candidatedAtMustBeDate: 'A data de candidatura deve ser uma data válida.',
  jobLinkMustBeValidHttpsUrl:
    'Informe uma URL válida usando HTTPS (por exemplo, https://...).',
  jobLinkMaxLength: 'O link da vaga deve ter no máximo 255 caracteres.',
  observationMustBeText: 'A observação deve ser um texto válido.',
  observationMaxLength: 'A observação deve ter no máximo 255 caracteres.',
} as const;
