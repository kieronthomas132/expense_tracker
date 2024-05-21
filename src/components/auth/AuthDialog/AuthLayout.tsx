import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { IAuthDialogLayout } from "@/components/interfaces/interfaces.tsx";

const AuthLayout = ({
  handleSubmit,
  AuthContent,
  isSigningIn,
  authStatus,
  signingIn,
}: IAuthDialogLayout) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid mt-3 grid-cols-4 items-center gap-4">
        {AuthContent.map(
          ({
            type,
            name,
            id,
            required,
            inputClassName,
            labelClassName,
            placeholder,
            label,
            htmlFor,
            value,
            onChange,
          }) => (
            <>
              <Label className={labelClassName} htmlFor={htmlFor}>
                {label}
              </Label>
              <Input
                name={name}
                id={id}
                type={type}
                required={required}
                className={inputClassName}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
            </>
          ),
        )}
      </div>
      <DialogFooter className="mt-5">
        <Button type="submit" className="bg-white text-black hover:bg-white">
          {isSigningIn ? signingIn : authStatus}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AuthLayout;
