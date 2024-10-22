type Props = {
  data: {
    placeholder?: string;
    label: string;
    type: "text" | "date" | "password" | "email";
    name: string;
  };
};

const Input = ({ data }: Props) => {
  return (
    <label className="flex flex-col gap-1 my-4">
      <span className="font-medium color-primary">{data.label}</span>
      <input
        autoComplete={`${
          data.type == "password" || data.type == "email" ? false : true
        }`}
        required
        className="rounded-md text-black h-11 w-64 bg-gray-300 px-2 placeholder:text-black "
        placeholder={`${data.placeholder ? data.placeholder : "Default"}`}
        type={`${data.type}`}
        name={`${data.name}`}
      ></input>
    </label>
  );
};

export default Input;
