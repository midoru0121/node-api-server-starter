const EnvironmentVariables = [
  'DB_NAME_DEV',
  'DB_NAME_TEST',
  'DB_NAME_PROD',
  'DB_USER',
  'DB_PASS',
  'DB_HOST',
  'SECRET_KEY_BASE',
  'TZ',
];

const checkIsExist = (required: string) => {
  if (process.env[required] == null) {
    throw new Error(
      `${required} is not set. ${required} should be passed as the environment variable.`,
    );
  }
};

export const requireEnvironmentVars = () => {
  EnvironmentVariables.forEach(env => {
    checkIsExist(env);
  });
};
