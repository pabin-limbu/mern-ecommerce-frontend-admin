import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  let input = null;
  switch (props.type) {
    case "select":
      input = (
        <Form.Group controlId="">
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <select
            className="form-control form-control-sm"
            name=""
            id=""
            value={props.value}
            onChange={props.onChange}
          >
            <option value="">{props.placeholder}</option>
            {props.options.length > 0
              ? props.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </Form.Group>
      );
      break;
    case "text":
      break;
    default:
      input = (
        <Form.Group controlId="">
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
        </Form.Group>
      );
      break;
  }

  //   return (
  //     <Form.Group>
  //       {props.label && <Form.Label>{props.label}</Form.Label>}

  //       <Form.Control
  //         type={props.type}
  //         placeholder={props.placeholder}
  //         value={props.value}
  //         onChange={props.onChange}
  //       />
  //       <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
  //     </Form.Group>
  //   );
  return input;
}

export default Input;
