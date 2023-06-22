import BaseInput from "@/components/base-input/base-input";

import "./textarea-gray.scss";

export default function TextareaGray({ className, ...rest }) {
  return (
    <BaseInput
      {...rest}
      as="textarea"
      className={`textarea-gray ${className}`}
    />
  );
}
