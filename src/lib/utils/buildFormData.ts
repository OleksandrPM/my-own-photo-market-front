export function buildFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // FileList
    if (value instanceof FileList) {
      if (value.length > 0) {
        formData.append(key, value[0]);
      }
      return;
    }

    // File
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Arrays
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
      return;
    }

    // Primitives
    formData.append(key, value);
  });

  return formData;
}
