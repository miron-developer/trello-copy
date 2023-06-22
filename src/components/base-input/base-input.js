import React from "react";
import { Form } from "react-bootstrap";

function BaseInput({
  type = "text",
  name = "",
  label,
  value = "",
  className = "",
  required = false,
  onChange = () => {},
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  as = undefined,
  style = {},
  placeholder,
  mask = () => {},
  tabIndex,
  disabled = false,
  autoFocus = false,

  // for react-hook-form
  innerRef,
}) {
  const handleOnChange = (val) => {
    mask(val);
    onChange(val);
  };

  return (
    <Form.Group
      ref={innerRef}
      className={`${className} mb-3`}
      controlId={`${name}Input`}
    >
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        as={as}
        style={style}
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder || label}
        required={required}
        onChange={handleOnChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </Form.Group>
  );
}

export default BaseInput;
