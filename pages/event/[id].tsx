import { useRouter } from "next/router";
import { AppLayout } from "../../components/AppLayout";
import { SubgraphService } from "@unlock-protocol/unlock-js";
import networks from "@unlock-protocol/networks";
import { useQuery } from "@tanstack/react-query";

export default function EventPageId() {
  const router = useRouter();
  const id = router.query.id;
  const subgraph = new SubgraphService(networks);

  const getEventDetail = async () => {
    return await subgraph.locks({
      where: {
        address: router.query.id,
      },
    });
  };

  const { data: eventDetails } = useQuery(["getEvent", id], async () =>
    getEventDetail()
  );
  const [event] = eventDetails ?? [];

  const payWithOptimism = () => {};

  const payWithApeCoin = () => {};

  return (
    <>
      <AppLayout>
        <h1 className="uppercase">{event?.name}</h1>
      </AppLayout>
      <div className="flex items-center justify-center py-20 bg-green-200">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-black text-black">
            Select to deploy RSVP
          </span>
          <div className="flex gap-2">
            <button
              className="text-xl text-black border-2 border-black rounded-[8px] h-[56px] w-96 font-semibold"
              type="submit"
              onClick={payWithOptimism}
            >
              Free on Optimism
            </button>
            <button
              className="text-xl text-black border-2 border-black rounded-[8px] h-[56px] w-96 font-semibold"
              type="submit"
              onClick={payWithApeCoin}
            >
              Paid (APE coin only)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
