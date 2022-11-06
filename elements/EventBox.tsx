import Link from "next/link";

export const EventBox = ({ event }: any) => {
  console.log(event);
  return (
    <Link
      href={`/event/${event?.address}`}
      className="flex flex-col gap-6 px-10 border border-white cursor-pointer py-14 group hover:bg-green-200"
    >
      <img src="./" alt="" className="h-[300px] bg-white" />
      <div className="flex flex-col">
        <span className="text-3xl font-bold group-hover:text-black">
          {event?.name}
        </span>
        <span className="text-xl group-hover:text-black">
          Fri, Nov/4, 10:30 PM
        </span>
        <span className="text-2xl text-green-200 uppercase group-hover:text-black">
          CRYBABY OAKLAND 1928 TELEGRAPH AVE - OAKLAND, CA
        </span>
      </div>
    </Link>
  );
};
