import { useForm } from "react-hook-form";
import { selectStepSchema, type SelectStepFormValues } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

type Props = {
  defaultValues?: Partial<SelectStepFormValues>;
  onNext: (values: SelectStepFormValues) => void;
};

export default function SecondStep({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SelectStepFormValues>({
    resolver: zodResolver(selectStepSchema),
    defaultValues: { option: undefined, ...defaultValues } as any,
    mode: "onTouched",
  });
  const selected = watch("need");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  function onSubmit(values: SelectStepFormValues) {
    onNext(values);
  }
  return (
    <div className="max-w-md mx-auto pt-2 h-full flex flex-col">
      <h3
        ref={titleRef}
        tabIndex={-1}
        className="font-bold text-[24px] text-start leading-[30px] p-4"
      >
        What do you need trimmed or removed?
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-5 flex flex-col justify-between items-start flex-1 "
      >
        <div className="w-full flex flex-col justify-center items-center gap-2 px-4">
          <div role="radiogroup" aria-label="Options" className="flex flex-col w-full">
            {[
              { id: "trees", label: "Trees" },
              { id: "shrubs_bushes", label: "Shrubs or bushes" },
              { id: "both", label: "Both trees and shrubs" },
            ].map((o) => {
              const isSelected = selected === o.id;
              return (
                <label
                  key={o.id}
                  className={`select-none cursor-pointer rounded-full px-4 py-3 border transition 
                ${
                  isSelected
                    ? "bg-accent text-white border-accent-700"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                >
                  <input
                    {...register("need")}
                    type="radio"
                    value={o.id}
                    className="sr-only"
                    aria-checked={isSelected}
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
          {errors.need && (
            <p role="alert" className="text-red-600 text-sm mt-2">
              {errors.need.message}
            </p>
          )}
        </div>

        <div className="w-full border-t border-gray-200 py-4 flex justify-center items-center">
          <button
            type="submit"
            className="w-full py-3 rounded bg-accent mx-4 text-[16px] font-bold text-primary"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
