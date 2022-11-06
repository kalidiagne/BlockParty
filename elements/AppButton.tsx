import { ReactNode } from "react";

interface AppButtonProps {
  variant?: "primary" | "secondary";
  children?: ReactNode;
}

export const AppButton = ({
  variant = "primary",
  children,
  ...rest
}: AppButtonProps & any) => {
  const variantStyle: Record<string, string> = {
    primary:
      "h-14 rounded-sm flex items-center bg-green-200 rounded-[8px] px-[24px] py-[18px] text-black border-2 border-green-200",
    secondary:
      "h-14 rounded-sm flex items-center rounded-[8px] border-2 border-green-200 px-[24px] py-[18px] text-green-200 bg-transparent",
  };

  const buttonClass = variantStyle[variant];
  return (
    <button className={buttonClass} type="button" {...rest}>
      <span className="text-[16px] font-bold">{children}</span>
    </button>
  );
};
