import { useState } from "react";
import ZipStep from "./steps/ZipStep";
import type {
  MultistepCollected,
  SelectStep3FormValues,
  SelectStep4FormValues,
  SelectStep5FormValues,
  SelectStepFormValues,
  Step6FormValues,
  ZipStepFormValues,
} from "./types";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import FourthStep from "./steps/FourthStep";
import FifthStep from "./steps/FifthStep";
import SixStep from "./steps/SixStep";

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
  function handleNextThird(values: SelectStep3FormValues) {
    setCollected((c) => ({ ...c, services: values }));
    setStep((s) => s + 1);
  }
  function handleNextFourth(values: SelectStep4FormValues) {
    setCollected((c) => ({ ...c, location: values }));
    setStep((s) => s + 1);
  }
  function handleNextFifth(values: SelectStep5FormValues) {
    setCollected((c) => ({ ...c, time: values }));
    setStep((s) => s + 1);
  }
  function handleNextSixth(values: Step6FormValues) {
    setCollected((c) => ({ ...c, project: values }));
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
      {step === 2 && (
        <ThirdStep
          onNext={handleNextThird}
          onBack={() => setStep((s) => s - 1)}
        />
      )}
      {step === 3 && (
        <FourthStep
          onNext={handleNextFourth}
          onBack={() => setStep((s) => s - 1)}
        />
      )}
      {step === 4 && (
        <FifthStep
          onNext={handleNextFifth}
          onBack={() => setStep((s) => s - 1)}
        />
      )}
      {step === 5 && (
        <SixStep
          onNext={handleNextSixth}
          onBack={() => setStep((s) => s - 1)}
        />
      )}
      {step > 5 && (
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
