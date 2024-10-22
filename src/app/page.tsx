import Button from "./components/login/Button/Button";
import Input from "./components/login/Input/Input";
import Title from "./components/login/Title/Title";

export default function Home() {
  return (
    <>
      <Title text="Acessar o sistema"></Title>
      <form action="">
        <Input
          data={{
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Digite seu email",
          }}
        ></Input>
        <Button buttonType="submit" textButton="Entrar"></Button>
      </form>
    </>
  );
}
