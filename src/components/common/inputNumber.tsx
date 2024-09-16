import { Input, InputProps } from "./input";
export const InputNum = (props: InputProps) => {
  const onchange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    const isValid = /^\d*\.?\d*$/.test(value);

    if ((isValid || value === "") && props.onChange) {
      props?.onChange(e);
    }
  };

  return <Input type="text" datatype="number" onChange={onchange} {...props} />;
};
