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

  return (
    <AppLayout>
      <h1 className="uppercase">{event?.name}</h1>
    </AppLayout>
  );
}
