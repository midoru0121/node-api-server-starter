/*
  Returns Api Scheme.
  All Apis in the app should call this function
  and respond with the following scheme.
*/
export const buildApiScheme = (status: number, data: any) => ({
  data,
  status,
});
