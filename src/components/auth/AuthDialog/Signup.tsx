import { FormEvent, useEffect, useState } from "react";
import {
  useCreateNewAccount,
  useSignInAccount,
} from "@/lib/react-query/queries&Mutations.tsx";
import { checkAuth } from "@/zustand/UserStore.tsx";
import AuthLayout from "@/components/auth/AuthDialog/AuthLayout.tsx";
import { useHandleInputsHook } from "@/components/hooks/handleInputsHook/handleInputsHook.tsx";

const Signup = () => {
  //input state for signing up
  const { handleInputChange, inputs } = useHandleInputsHook({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  //destructured properties for email, password, username, email from input state
  const { email, name, password, username } = inputs;

  //array of properties for signing in input components
  const signupContent = [
    {
      type: "text",
      name: "name",
      id: "name",
      required: true,
      inputClassName: "col-span-3 text-white bg-black",
      labelClassName: "text-right",
      placeholder: "John Doe",
      label: "Name",
      htmlFor: "name",
      value: name,
      onChange: handleInputChange,
    },
    {
      type: "text",
      name: "username",
      id: "username",
      required: true,
      inputClassName: "col-span-3 text-white bg-black",
      labelClassName: "text-right",
      placeholder: "johndoe000",
      label: "Username",
      htmlFor: "username",
      value: username,
      onChange: handleInputChange,
    },
    {
      type: "email",
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

  //functions to create a new user and sign in after user creation
  const { mutateAsync: createNewUser } = useCreateNewAccount();
  const { mutateAsync: signInAccount, isPending: isSigningUp } =
    useSignInAccount();

  const [error, setError] = useState<string | null>(null); // Specify the type as string | null

  //function to handle form submission to create new user
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newAccount = await createNewUser({
        name: name as string,
        username: username as string,
        password: password as string,
        email: email as string,
      });

      const session = await signInAccount({
        email: email as string,
        password: password as string,
      });

      if (!session) {
        new Error("Could not sign in");
      }

      await checkAuth();
      return newAccount;
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <>
      <p className="w-full text-center mt-2 font-[500]">{error}</p>
      <AuthLayout
        handleSubmit={handleSubmit}
        AuthContent={signupContent}
        isSigningIn={isSigningUp}
        authStatus="Sign in"
        signingIn="Signing In"
      />
    </>
  );
};

export default Signup;
