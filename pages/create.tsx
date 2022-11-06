import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { AppHeader } from "../components/AppHeader";
import { WalletService } from "@unlock-protocol/unlock-js";
import networks from "@unlock-protocol/networks";
import { useMutation } from "wagmi";
import { ethers } from "ethers";
import { APP_NAME } from "../utils/consts";

interface InputWrapperProps {
  label: string;
  description?: string;
  children: ReactNode;
}

interface FormProps {
  title: string;
  date: string;
  description: string;
  capacity?: number;
  price?: string;
  address: string;
}

export const InputWrapper = ({
  label,
  description,
  children,
}: InputWrapperProps) => {
  return (
    <div className="flex flex-col gap-4 leading-[90%]">
      <div className="flex flex-col gap-4">
        <div className="text-5xl font-black">{label}</div>
        {description && <span className="text-lg">{description}</span>}
      </div>
      {children}
    </div>
  );
};

declare const window: any;
export default function Create() {
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      title: "",
      price: "",
      capacity: 0,
    },
  });

  const createEvent = async (fields: any) => {
    const ws = new WalletService(networks);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    await ws.connect(provider, signer);

    // @ts-ignore
    return await ws.createLock({
      name: `${fields.title} - ${APP_NAME}`,
      keyPrice: fields.price || "0",
      expirationDuration: 86000,
      currencyContractAddress: "0x4d224452801ACEd8B2F0aebE155379bb5D594381", // ape coin
      maxNumberOfKeys: fields.capacity || 0,
    });
  };

  const createLockMutation = useMutation(createEvent);

  return (
    <>
      <AppHeader></AppHeader>
      <form
        className="divide-y-2"
        onSubmit={handleSubmit((e) => createLockMutation.mutateAsync(e))}
      >
        <div className="container pb-20 mx-auto">
          <div className="grid grid-cols-4 h-2/3">
            <div className="col-span-2">
              <h1 className="uppercase break-words">
                Create Invite For frens.
              </h1>
            </div>
            <div className="flex flex-col col-span-2 gap-8">
              <InputWrapper label="Event title">
                <input type="text" {...register("title")} />
              </InputWrapper>
              <InputWrapper label="Date">
                <input type="date" {...register("date")} />
              </InputWrapper>
              <InputWrapper label="Description">
                <textarea rows={30} {...register("description")}></textarea>
              </InputWrapper>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center text-center pt-14">
          <div className="flex flex-col justify-center gap-4 py-12">
            <span className="font-black text-7xl">Location matters</span>
            <input
              type="text"
              {...register("address")}
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div className="bg-white h-[400px]"></div>
        </div>

        <div className="py-24">
          <div className="container grid grid-cols-2 gap-8 mx-auto">
            <InputWrapper
              label="Capacity"
              description="Hosting for how many frens & fam? Don’t blow the house up."
            >
              <input type="text" {...register("capacity")} />
            </InputWrapper>
            <InputWrapper
              label="Price"
              description="How much would you like your frens to pay? In ETH."
            >
              <input type="number" {...register("price")} />
            </InputWrapper>
          </div>
        </div>

        <div className="flex items-center justify-center py-20 bg-green-200">
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-black text-black">
              Looks good? LGF. Create
            </span>
            <button
              className="text-xl text-white bg-black rounded-[8px] h-[56px] w-96 font-semibold"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
