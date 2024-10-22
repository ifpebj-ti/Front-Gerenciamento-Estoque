type Props = {
  textButton: string;
  buttonType: "submit" | "reset";
};

const Button = ({ textButton, buttonType }: Props) => {
  return (
    <button
      className="bg-primary text-white p-11 py-4 rounded-md uppercase font-medium hover:scale-105 transition-all ease-linear duration-200"
      type={`${buttonType ? buttonType : "submit"}`}
    >
      {textButton}
    </button>
  );
};

export default Button;
