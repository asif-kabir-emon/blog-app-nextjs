export const modifyPayload = (values: any) => {
  const obj = { ...values };

  const file = obj["file"];
  const files = obj["files"];
  delete obj["file"];
  delete obj["files"];

  const data = JSON.stringify(obj);
  const formData = new FormData();

  formData.append("data", data);
  if (file instanceof Blob) {
    formData.append("file", file);
  }
  if (files) {
    files.forEach((file: Blob) => {
      formData.append("files", file);
    });
  }

  return formData;
};
