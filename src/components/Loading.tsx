import { useEffect, useState } from "react";

export default function Loading({
  progressActive,
}: {
  progressActive: boolean;
}) {
  const texts = [
    "Matching coverage area...",
    "Select type...",
    "Profiles and review...",
    "Local cost...",
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!progressActive) return undefined;

    // total time must match the progress bar duration (3000ms)
    const total = texts.length;
    const interval = 3000 / total; // schedule changes so last appears at (total-1)*interval
    const timers: number[] = [];
    setStep(0);

    for (let i = 1; i < total; i++) {
      const t = window.setTimeout(() => {
        setStep(i);
      }, Math.round(i * interval));
      timers.push(t);
    }

    return () => timers.forEach((id) => clearTimeout(id));
  }, [progressActive, texts.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-stone-50">
      <div className="max-w-md w-full px-6">
        <h3 className="font-bold text-[24px] text-center leading-[30px] py-8">
          Building your project
        </h3>
        <div className="w-full pt-12 pb-6 bg-white rounded-[10px] shadow-custom flex flex-col justify-center items-center gap-3">
          <div className="w-[70%] h-2 bg-white rounded-full overflow-hidden">
            <div
              className={`h-full bg-primary transition-all`}
              style={{
                width: progressActive ? "100%" : "0%",
                transitionDuration: "3000ms",
              }}
            />
          </div>
          <p className="text-[16px] font-bold text-start w-[70%] ">
            {texts[step]}
          </p>
          <p className="text-[14px] text-gray-500 mt-4 text-center">
            If this page does not redirect in 3 seconds,
            <br />{" "}
            <a href="#" className="text-[14px] text-primary underline">
              click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
