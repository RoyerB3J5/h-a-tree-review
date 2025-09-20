import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Step7Schema, type Step7FormValues } from "../types";

type Props = {
  defaultValues?: Partial<Step7FormValues>;
  expectedZip?: string | undefined; // zip from step1 to check against
  onNext: (values: Step7FormValues) => void;
  onBack?: () => void;
};

function makeSchema(expectedZip?: string) {
  if (!expectedZip) return Step7Schema;
  return Step7Schema.superRefine((data, ctx) => {
    if (data.postalCode !== expectedZip) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["postalCode"],
        message: `ZIP must match the ZIP entered earlier (${expectedZip})`,
      });
    }
  });
}

export default function Step7({
  defaultValues,
  expectedZip,
  onNext,
  onBack,
}: Props) {
  const resolver = zodResolver(makeSchema(expectedZip));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step7FormValues>({
    resolver,
    defaultValues: {
      street: "",
      city: "",
      postalCode: expectedZip ?? "",
      ...defaultValues,
    },
    mode: "onTouched",
  });

  const postalRef = useRef<HTMLInputElement | null>(null);

  function onSubmit(values: Step7FormValues) {
    const s = values.street?.trim();
    const c = values.city?.trim();
    const p = values.postalCode?.trim();
    onNext({ street: s ?? "", city: c ?? "", postalCode: p ?? "" });
  }

  // helper para añadir clase de error
  const inputBase =
    "peer w-full h-14 px-3 pt-2 pb-0 border-2 rounded bg-white focus:outline-none transition-colors duration-150 placeholder-transparent bg-stone-50";

  return (
    <div className="max-w-md mx-auto pt-2 h-full flex flex-col px-6 bg-stone-50 w-full">
      <h3
        tabIndex={-1}
        className="font-bold text-[24px] text-start leading-[30px] py-4"
      >
        What's your project address?
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-2 flex flex-col justify-between items-start "
      >
        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          {/* STREET */}
          <div className="w-full relative">
            <input
              id="street"
              {...register("street")}
              aria-invalid={errors.street ? "true" : "false"}
              aria-describedby={errors.street ? "street-error" : "street-help"}
              className={
                inputBase +
                (errors.street
                  ? " border-red-600 focus:border-red-600"
                  : " border-gray-200 focus:border-gray-400")
              }
              placeholder=" " /* important: single space so placeholder-shown works */
              autoComplete="street-address"
            />
            <label
              htmlFor="street"
              className={
                "absolute left-3 top-4 flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                "peer-focus:top-2 peer-focus:translate-y-0  peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
              }
            >
              Street
            </label>

            {errors.street && (
              <p
                role="alert"
                id="street-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.street.message}
              </p>
            )}
          </div>

          {/* CITY */}
          <div className="w-full relative">
            <input
              id="city"
              {...register("city")}
              aria-invalid={errors.city ? "true" : "false"}
              aria-describedby={errors.city ? "city-error" : "city-help"}
              className={
                inputBase +
                (errors.city
                  ? " border-red-600 focus:border-red-600"
                  : " border-gray-200 focus:border-gray-400")
              }
              placeholder=" "
              autoComplete="address-level2"
            />
            <label
              htmlFor="city"
              className={
                "absolute left-3 top-4  flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                "peer-focus:top-2 peer-focus:translate-y-0  peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
              }
            >
              City
            </label>

            {errors.city && (
              <p
                role="alert"
                id="city-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.city.message}
              </p>
            )}
          </div>

          {/* POSTAL CODE */}
          <div className="w-full relative">
            {/* Necesitamos el registro para poder usar el callback de ref */}
            {(() => {
              const postalReg = register("postalCode");
              return (
                <>
                  <input
                    id="postalCode"
                    {...postalReg}
                    /* override ref para guardar en postalRef y pasar al register */
                    ref={(e) => {
                      postalReg.ref(e);
                      postalRef.current = e;
                    }}
                    aria-invalid={errors.postalCode ? "true" : "false"}
                    aria-describedby={
                      errors.postalCode ? "postal-error" : "postal-help"
                    }
                    className={
                      inputBase +
                      (errors.postalCode
                        ? " border-red-600 focus:border-red-600"
                        : " border-gray-300 focus:border-gray-700")
                    }
                    placeholder=" "
                    autoComplete="postal-code"
                  />
                  <label
                    htmlFor="postalCode"
                    className={
                      "absolute left-3 top-4  flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                      "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                      "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
                    }
                  >
                    ZIP code
                  </label>
                </>
              );
            })()}

            {errors.postalCode && (
              <p
                role="alert"
                id="postal-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full border-t border-gray-200 py-4 flex justify-center items-center flex-col gap-3">
          <div className="flex justify-center items-center gap-3  w-full">
            <button
              type="button"
              onClick={() => onBack && onBack()}
              className="w-1/2 py-3 rounded border-2 border-secondary text-[16px] font-semibold text-secondary"
            >
              Previous
            </button>
            <button
              type="submit"
              className="w-1/2 py-3  rounded bg-accent text-[16px] font-bold text-primary border-2 border-accent"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
