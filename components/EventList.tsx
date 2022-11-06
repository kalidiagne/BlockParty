import { EventBox } from "../elements/EventBox";
import { SubgraphService } from "@unlock-protocol/unlock-js";
import networks from "@unlock-protocol/networks";
import { APP_NAME } from "../utils/consts";
import { useQuery } from "@tanstack/react-query";

export const EventList = () => {
  const subgraph = new SubgraphService(networks);

  const getEvents = async () => {
    return await subgraph.locks({
      first: 1000,
      where: {
        name_contains: APP_NAME,
      },
      orderBy: "createdAtBlock" as any,
      orderDirection: "desc" as any,
    });
  };

  const { data: events = [] } = useQuery(["getEvents"], async () =>
    getEvents()
  );

  console.log("name", events);
  return (
    <div className="grid grid-cols-1 border-white md:grid-cols-3 lg:grid-cols-4">
      {events?.map((event, index) => (
        <EventBox event={event} key={index} />
      ))}
    </div>
  );
};
