import { useForm } from "react-hook-form";
import {
  selectStep5Schema,
  type SelectStep5FormValues,
  SELECT_OPTIONS_5,
} from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect } from "react";

type Props = {
  defaultValues?: Partial<SelectStep5FormValues>;
  onNext: (values: SelectStep5FormValues) => void;
  onBack?: () => void;
};

export default function FifthStep({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SelectStep5FormValues>({
    resolver: zodResolver(selectStep5Schema),
    defaultValues: {
      time: SELECT_OPTIONS_5[0].label,
      custom: "",
      ...defaultValues,
    } as any,
    mode: "onTouched",
  });
  const selected = watch("time");
  const custom = watch("custom");
  // when user types in custom input, deselect radios; if custom becomes empty, restore default
  useEffect(() => {
    if (custom && custom.trim().length) {
      setValue("time", "");
    } else {
      // restore default label
      setValue("time", SELECT_OPTIONS_5[0].label);
    }
  }, [custom, setValue]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  function onSubmit(values: SelectStep5FormValues) {
    // If user wrote custom text, prefer that as need
    const out = { ...values };
    if (values.custom && values.custom.trim().length) {
      out.time = values.custom.trim();
    }
    onNext(out);
  }
  return (
    <div className="max-w-md mx-auto pt-2 h-full flex flex-col">
      <h3
        ref={titleRef}
        tabIndex={-1}
        className="font-bold text-[24px] text-start leading-[30px] p-4"
      >
        When do you need this work done?
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-5 flex flex-col justify-between items-start flex-1 "
      >
        <div className="w-full flex flex-col justify-center items-center gap-2 px-5">
          <div
            role="radiogroup"
            aria-label="Options"
            className="flex flex-col w-full border border-gray-300 rounded-[10px] overflow-hidden divide-y divide-gray-300"
          >
            {[
              { id: "in_2_weeks", label: "Within 2 weeks" },
              { id: "more_2_weeks", label: "More than 2 weeks" },
              {
                id: "not_sure",
                label: "Not sure - still planning/budgeting",
              },
            ].map((o) => {
              // store label as the value so collected data contains the human-readable text
              const isSelected = selected === o.label;
              return (
                <label
                  key={o.id}
                  className={`flex items-center gap-3 w-full select-none cursor-pointer px-5 py-4 text-left transition 
                    ${
                      isSelected ? "bg-[#F5F5F2]" : "bg-white text-gray-800"
                    } first:rounded-t-[10px] last:rounded-b-[10px]`}
                >
                  <input
                    {...register("time")}
                    type="radio"
                    value={o.label}
                    className="sr-only peer"
                    aria-checked={isSelected}
                  />
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors
                      ${isSelected ? "border-primary" : "border-gray-400"}`}
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full bg-primary transform transition-transform duration-150
                        ${isSelected ? "scale-100" : "scale-0"}`}
                    />
                  </span>
                  <span className="flex-1">{o.label}</span>
                </label>
              );
            })}
          </div>
          {errors.time && (
            <p role="alert" className="text-red-600 text-sm mt-2">
              {errors.time.message}
            </p>
          )}
        </div>

        <div className="w-full border-t border-gray-200 py-4 flex justify-center items-center flex-col gap-3">
          <div className="w-full px-5">
            <input
              {...register("custom")}
              type="text"
              className="w-full border rounded-[15px] text-gray-500 leading-[22px] text-[16px] p-4 bg-[#F5F5F2] border-gray-300 focus:outline-none focus:border-gray-400 "
              placeholder="Tell us in your own words.."
            />
          </div>

          <div className="flex justify-center items-center gap-3 px-5 w-full">
            <button
              type="button"
              onClick={() => onBack && onBack()}
              className="w-1/3 py-3 rounded border border-gray-300 text-[16px] font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full py-3 rounded bg-accent text-[16px] font-bold text-primary border border-accent"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
