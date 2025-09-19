type Props = {
  onNext: () => void;
};
export default function Quotes({onNext}: Props) {
  return (
    <div className="max-w-md mx-auto h-full flex flex-col bg-stone-50 px-4">
      <div className="w-full flex flex-col justify-center items-star gap-3 py-8">
        <h3 className="font-bold text-[24px] text-start leading-[30px] ">
          One more step...
        </h3>
        <p className="text-[14px] font-bold text-start">
          Request a quote from the pro below
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <div className="bg-white w-full rounded-[10px] flex flex-col justify-center items-start gap-3 pt-5 pb-3 px-4">
          <p className="text-[14px] font-bold">Benjamin Franklin Plumbing</p>
          <div className="w-full flex justify-start items-center gap-5">
            <div className="flex justify-center items-center gap-1">
              <span>X</span>
              <p className="text-[13px] font-bold">3.9</p>
              <p className="text-[13px] text-gray-500">(35)</p>
            </div>
            <p>.</p>
            <div className="flex justify-center items-center gap-1">
              <span>T</span>
              <p className="text-[13px] text-gray-500">Approved Pro</p>
            </div>
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
    </div>
  );
}
