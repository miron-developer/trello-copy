export const convertOneRef2InnerRef = (field = {}) => {
  const { ref, ...rest } = field;
  return {
    innerRef: ref,
    ...rest,
  };
};

export const convertRef2InnerRef = (fields = []) => {
  return fields.map((f) => {
    return convertOneRef2InnerRef(f);
  });
};

export const setErrors = (error, setError) => {
  Object.entries(error.getErrors()).forEach(([k, v]) => {
    setError(k, { type: "custom", message: v });
  });
};

export const setValues = (newValues, setValue) => {
  Object.entries(newValues).forEach(([k, v]) => {
    setValue(k, v);
  });
};
