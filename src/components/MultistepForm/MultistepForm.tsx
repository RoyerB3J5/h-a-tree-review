import { useState } from "react";
import ZipStep from "./steps/ZipStep";
import type {
  MultistepCollected,
  SelectStepFormValues,
  ZipStepFormValues,
} from "./types";
import SecondStep from "./steps/SecondStep";

export default function MultistepForm({
  onFinish,
}: {
  onFinish?: (data: MultistepCollected) => void;
}) {
  const [step, setStep] = useState(0);
  const [collected, setCollected] = useState<MultistepCollected>({});

  function handleNextZip(values: ZipStepFormValues) {
    setCollected((c) => ({ ...c, zip: values }));
    setStep((s) => s + 1);
  }

  function handleNextSecond(values: SelectStepFormValues) {
    setCollected((c) => ({ ...c, select: values }));
    setStep((s) => s + 1);
  }

  function handleFinish() {
    if (onFinish) onFinish(collected);
    else console.log("Collected multistep data:", collected);
  }

  return (
    <section className="h-[calc(100dvh-83px)] w-full">
      {step === 0 && <ZipStep onNext={handleNextZip} />}
      {step === 1 && (
        <SecondStep
          onNext={handleNextSecond}
          onBack={() => setStep((s) => s - 1)}
        />
      )}
      {step > 1 && (
        <div className="p-4">
          <p className="mb-3">(siguientes pasos faltantes) Step {step + 1}</p>
          <button
            onClick={handleFinish}
            className="px-3 py-2 rounded bg-red-500 text-white"
          >
            Finish
          </button>
        </div>
      )}
    </section>
  );
}
