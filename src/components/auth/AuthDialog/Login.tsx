import { useSignInAccount } from "@/lib/react-query/queries&Mutations.tsx";
import { FormEvent } from "react";
import { checkAuth } from "@/zustand/UserStore.tsx";
import AuthLayout from "@/components/auth/AuthDialog/AuthLayout.tsx";
import { useHandleInputsHook } from "@/components/hooks/handleInputsHook/handleInputsHook.tsx";
const Login = () => {

  const { handleInputChange, inputs } = useHandleInputsHook({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  //array of properties for login input components
  const loginContent = [
    {
      type: "text",
      name: "email",
      id: "email",
      required: true,
      inputClassName: "col-span-3 text-white bg-black",
      labelClassName: "text-right",
      placeholder: "example@example.com",
      label: "Email",
      htmlFor: "email",
      value: email,
      onChange: handleInputChange,
    },
    {
      type: "password",
      name: "password",
      id: "password",
      required: true,
      inputClassName: "col-span-3 text-white bg-black",
      labelClassName: "text-right",
      placeholder: "ABCabc123!",
      label: "Password",
      htmlFor: "password",
      value: password,
      onChange: handleInputChange,
    },
  ];

  // fetch the signInAccount function from queries&Mutations
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  //function to handle form submission to sign in user
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //initialise session to local storage
    const session = await signInAccount({
      email: email as string,
      password: password as string,
    });

    if (!session) {
      throw Error("Could not sign in to account");
    }
    //check authentication
    await checkAuth();
  };

  return (
    <AuthLayout
      handleSubmit={handleSubmit}
      AuthContent={loginContent}
      isSigningIn={isSigningIn}
      authStatus="Login"
      signingIn="Logging In"
    />
  );
};

export default Login;
