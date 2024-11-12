type Props = {
  text: string;
};
const Title = ({ text }: Props) => {
  return (
    <h1 className="sm:text-[2.5rem] text-[2rem] font-medium text-black ">
      {text}
    </h1>
  );
};

export default Title;
