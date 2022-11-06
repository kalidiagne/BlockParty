import Link from "next/link";
import { AppButton } from "../elements/AppButton";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect, chain } from "wagmi";

const menus: { label: string; path: string }[] = [
  {
    label: "Discover",
    path: "/",
  },
  {
    label: "Create",
    path: "/create",
  },
  {
    label: "Governance",
    path: "/governance",
  },
];

export const AppHeader = () => {
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [chain.goerli, chain.optimism],
    }),
  });
  const { disconnect } = useDisconnect();

  const onAction = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const addressMinify = (address: string) => {
    return `${address?.substring(0, 6)}...${address?.substring(
      address.length - 4
    )}`;
  };

  return (
    <header>
      <div className="container mx-auto flex items-center justify-between h-[100px]">
        <Link href={"/"}>
          <img src="/wordmark.svg" alt="logo" />
        </Link>
        <div>
          <div className="flex items-center justify-center gap-14">
            {menus?.map(({ path, label }) => (
              <Link
                href={path}
                key={path}
                className="flex items-center justify-center text-xl font-semibold text-white h-14"
              >
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <AppButton variant="primary" onClick={onAction}>
            {isConnected ? addressMinify(address!) : "Connect"}
          </AppButton>
        </div>
      </div>
    </header>
  );
};
