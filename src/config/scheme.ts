/*
  Returns Api Scheme.
  All Apis defined in the application should call the function and
  respond with the following scheme.
*/
export const buildApiScheme = (status: number, data: any) => ({
  data,
  status,
});
