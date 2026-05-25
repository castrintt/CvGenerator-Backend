/**
 * Mensagens de erro expostas em respostas HTTP (exceptions NestJS).
 */
export const ApiErrorMessages = {
  auth: {
    invalidCredentials: 'E-mail ou senha incorretos.',
    unauthorized: 'Não autorizado. Faça login novamente.',
    refreshTokenMissing: 'Token de atualização não informado.',
    refreshTokenInvalidOrExpired: 'Token de atualização inválido ou expirado.',
    sessionInvalid: 'Sessão inválida.',
  },
  user: {
    notFoundForEmail: 'Nenhum usuário encontrado para o e-mail informado.',
    notFound: 'Usuário não encontrado.',
    invalidCurrentPassword: 'Senha atual incorreta.',
    newPasswordSameAsCurrent: 'A nova senha deve ser diferente da senha atual.',
  },
  category: {
    notFound: 'Categoria não encontrada.',
  },
  job: {
    notFound: 'Job não encontrado.',
  },
  registration: {
    ambiguousEmailResponse:
      'Se este e-mail não estiver cadastrado, enviaremos um link em breve',
    duplicateEmailOnUpdate: 'Já existe um usuário cadastrado com este e-mail.',
  },
  environment: {
    jwtSecretMinLength:
      'JWT_SECRET deve ter no mínimo 16 caracteres. Defina a variável no .env ou no ambiente do container.',
  },
} as const;
