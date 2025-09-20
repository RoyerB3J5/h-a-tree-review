import { useState } from "react";

type Props = {
  onNext: () => void;
};
export default function Quotes({ onNext }: Props) {
  const items = [
    {
      title: "Benjamin Franklin Plumbing",
      rating: 3.9,
      reviews: 35,
      approved: "Approved Pro",
    },
    {
      title: "JRR Tree Service",
      rating: 3.9,
      reviews: 35,
      approved: "Approved Pro",
    },
    {
      title: "DAD Services CL",
      rating: 3.9,
      reviews: 35,
      approved: "Approved Pro",
    },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (title: string) => {
    setSelected((s) =>
      s.includes(title) ? s.filter((t) => t !== title) : [...s, title]
    );
  };

  return (
    <div className="max-w-md mx-auto h-full flex flex-col bg-stone-50 px-4 relative">
      <div className="w-full flex flex-col justify-center items-star gap-3 py-8">
        <h3 className="font-bold text-[24px] text-start leading-[30px] ">
          One more step...
        </h3>
        <p className="text-[14px] font-bold text-start">
          Request a quote from the pro below
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        {items.map((item, idx) => {
          const checked = selected.includes(item.title);
          return (
            <div
              key={idx}
              className={`bg-white w-full rounded-[10px] flex justify-between items-center gap-3 pt-5 pb-3 px-4 `}
            >
              <div className="flex flex-col justify-center items-start">
                <p className="text-[14px] font-bold">{item.title}</p>
                <div className="w-full flex justify-start items-center gap-5">
                  <div className="flex justify-center items-center gap-1">
                    <span>X</span>
                    <p className="text-[13px] font-bold">{item.rating}</p>
                    <p className="text-[13px] text-gray-500">
                      ({item.reviews})
                    </p>
                  </div>
                  <p>.</p>
                  <div className="flex justify-center items-center gap-1">
                    <span>T</span>
                    <p className="text-[13px] text-gray-500">{item.approved}</p>
                  </div>
                </div>
              </div>
              <div className="pl-2">
                <input
                  type="checkbox"
                  aria-label={`Select ${item.title}`}
                  checked={checked}
                  onChange={() => toggle(item.title)}
                  className="w-5 h-5 text-primary"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 w-full px-4 pt-4 pb-7 bg-white flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-between items-center ">
          <p className="text-[14px] font-bold">
            {selected.length}/{items.length}{" "}
            <span className="font-normal">selected</span>
          </p>
          <button
            className={`${
              selected.length > 0 ? "" : "hidden"
            } text-[14px] font-bold text-primary`}
            onClick={() => setSelected([])}
          >
            Unselect all
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded bg-accent text-[16px] font-bold text-primary border border-accent"
          onClick={() => onNext()}
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}
