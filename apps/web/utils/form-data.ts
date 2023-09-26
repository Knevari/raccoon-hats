export function buildFormDataFromObject(obj: object) {
  const formData = new FormData();

  for (const fieldName of Object.keys(obj)) {
    if (Array.isArray(obj[fieldName])) {
      obj[fieldName].forEach((value: string, index: number) =>
        formData.append(`${fieldName}[${index}]`, value)
      );
    } else {
      formData.append(fieldName, obj[fieldName]);
    }
  }

  return formData;
}
