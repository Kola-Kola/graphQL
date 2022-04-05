import React from "react";
import { TextFieldContainer, TextFieldInput } from './styles'
import { IProps } from './types'

const TextField = ({ className, ...props }: IProps) => (
  <TextFieldContainer className={className}>
    <TextFieldInput {...props} />
  </TextFieldContainer>
);

export default TextField;
