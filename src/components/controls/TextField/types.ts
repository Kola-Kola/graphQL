export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: React.ChangeEventHandler;
    value: string;
  }