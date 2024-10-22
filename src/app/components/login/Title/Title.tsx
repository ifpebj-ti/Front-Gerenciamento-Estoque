type Props = {
  text: string;
};
const Title = ({ text }: Props) => {
  return <h1 className="lg:text-3xl font-medium color-primary">{text}</h1>;
};

export default Title;
