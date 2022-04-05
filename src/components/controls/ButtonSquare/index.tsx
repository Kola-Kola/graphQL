import { ButtonContainer } from './styles'
import { IProps } from './types'

const ButtonSquare = ({ children, ...props }: IProps) => (
  <ButtonContainer {...props}>{children}</ButtonContainer>
);

export default ButtonSquare;
