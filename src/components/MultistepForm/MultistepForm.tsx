import { useState } from "react";
import ZipStep from "./steps/ZipStep";
import type {
  MultistepCollected,
  SelectStep3FormValues,
  SelectStep4FormValues,
  SelectStep5FormValues,
  SelectStepFormValues,
  Step6FormValues,
  Step7FormValues,
  Step8FormValues,
  ZipStepFormValues,
} from "./types";
import Step7 from "./steps/Step7";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import FourthStep from "./steps/FourthStep";
import FifthStep from "./steps/FifthStep";
import SixStep from "./steps/SixStep";
import Loading from "../Loading";
import Step8 from "./steps/Step8";
import Quotes from "../Quotes";
import Last from "../Last";

export default function MultistepForm({
  onFinish,
  setHeaderActive,
}: {
  onFinish?: (data: MultistepCollected) => void;
  setHeaderActive: (index: number) => void;
}) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progressActive, setProgressActive] = useState(false);

  function changeStep(delta: number) {
    // prevent multiple triggers while loading
    if (loading) return;

    // Only show the 3s loading screen when moving from SixStep (index 5) to Step7 (index 6)
    if (delta > 0 && step === 5) {
      // show loading overlay with progress bar for 3s, then advance
      setLoading(true);
      setProgressActive(false);
      // kick animation on next frame
      requestAnimationFrame(() => setProgressActive(true));
      setTimeout(() => {
        setLoading(false);
        setProgressActive(false);
        setStep((s) => s + delta);
      }, 3000);
      return;
    }

    // backward moves are immediate
    setStep((s) => s + delta);
  }
  const [collected, setCollected] = useState<MultistepCollected>({});

  function handleNextZip(values: ZipStepFormValues) {
    setCollected((c) => ({ ...c, zip: values }));
    changeStep(1);
  }

  function handleNextSecond(values: SelectStepFormValues) {
    setCollected((c) => ({ ...c, select: values }));
    changeStep(1);
  }
  function handleNextThird(values: SelectStep3FormValues) {
    setCollected((c) => ({ ...c, services: values }));
    changeStep(1);
  }
  function handleNextFourth(values: SelectStep4FormValues) {
    setCollected((c) => ({ ...c, location: values }));
    changeStep(1);
  }
  function handleNextFifth(values: SelectStep5FormValues) {
    setCollected((c) => ({ ...c, time: values }));
    changeStep(1);
  }
  function handleNextSixth(values: Step6FormValues) {
    setCollected((c) => ({ ...c, project: values }));
    changeStep(1);
  }
  function handleNextSeventh(values: Step7FormValues) {
    setCollected((c) => ({ ...c, address: values }));
    changeStep(1);
  }
  function handleNextEighth(values: Step8FormValues) {
    setCollected((c) => ({ ...c, contact: values }));
    changeStep(1);
    setHeaderActive(1);
  }
  function handleNextQuote(values?: { selectedTitles?: string[] }) {
    if (values) {
      setCollected((c) => ({
        ...c,
        quotes: { selectedTitles: values.selectedTitles },
      }));
    }
    changeStep(1);
    setHeaderActive(2);
  }
  function handleFinish() {
    if (onFinish) onFinish(collected);
    else console.log("Collected multistep data:", collected);
  }
  // assemble steps into a horizontal track so we can animate translateX
  const steps = [
    <ZipStep key={0} onNext={handleNextZip} />,
    <SecondStep
      key={1}
      onNext={handleNextSecond}
      onBack={() => changeStep(-1)}
    />,
    <ThirdStep
      key={2}
      onNext={handleNextThird}
      onBack={() => changeStep(-1)}
    />,
    <FourthStep
      key={3}
      onNext={handleNextFourth}
      onBack={() => changeStep(-1)}
    />,
    <FifthStep
      key={4}
      onNext={handleNextFifth}
      onBack={() => changeStep(-1)}
    />,
    <SixStep key={5} onNext={handleNextSixth} onBack={() => changeStep(-1)} />,
    <Step7
      key={6}
      defaultValues={collected.address}
      expectedZip={collected.zip?.postalCode}
      onBack={() => changeStep(-1)}
      onNext={handleNextSeventh}
    />,
    <Step8
      key={7}
      defaultValues={collected.contact}
      select={collected.select}
      services={collected.services}
      onNext={handleNextEighth}
    />,
    <Quotes key={8} onNext={handleNextQuote} />,
    <Last key={9} />,
    <div key={10} className="p-4">
      <p className="mb-3">(siguientes pasos faltantes) Step {step + 1}</p>
      <button
        onClick={handleFinish}
        className="px-3 py-2 rounded bg-red-500 text-white"
      >
        Finish
      </button>
    </div>,
  ];

  const isLast = (steps[step] as any)?.type === Last;

  return (
    <>
      {isLast ? (
        <section className="w-full relative">
          <div className="w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${step * 100}vw)`,
                width: `${steps.length * 100}vw`,
              }}
            >
              {steps.map((node, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 bg-stone-50 "
                  style={{ width: "100vw" }}
                > 
                  {node}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section
          style={{ height: "calc(100dvh - 83px)" }}
          className="w-full relative"
        >
          <div
            className="w-full overflow-x-hidden"
            style={{ height: "calc(100dvh - 83px)" }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${step * 100}vw)`,
                width: `${steps.length * 100}vw`,
                height: "calc(100dvh - 83px)",
              }}
            >
              {steps.map((node, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 overflow-auto bg-stone-50 "
                  style={{ width: "100vw", height: "calc(100dvh - 83px)" }}
                >
                  {node}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* loading overlay shown when moving to next step */}
      {loading && <Loading progressActive={progressActive} />}
    </>
  );
}
