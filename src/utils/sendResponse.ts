export const sendResponse = (jsonData: {
  status: number;
  message: string;
  success: boolean;
  meta?: any;
  data?: any;
}) => {
  return Response.json(
    {
      status: jsonData.status,
      message: jsonData.message,
      success: jsonData.success,
      meta: jsonData.meta,
      data: jsonData.data,
    },
    { status: jsonData.status },
  );
};
