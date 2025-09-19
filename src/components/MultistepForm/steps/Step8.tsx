import { useForm, Controller } from "react-hook-form";
import {
  Step8Schema,
  type Step8FormValues,
  type SelectStepFormValues,
  type SelectStep3FormValues,
} from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  defaultValues?: Partial<Step8FormValues>;
  onNext: (values: Step8FormValues) => void;
  select?: SelectStepFormValues;
  services?: SelectStep3FormValues;
};

export default function Step8({
  defaultValues,
  onNext,
  select,
  services,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Step8FormValues>({
    resolver: zodResolver(Step8Schema),
    defaultValues: {
      name: "",
      lastname: "",
      phone: "",
      email: "",
      accept: false,
      ...defaultValues,
    },
    mode: "onTouched",
  });
  const lastname = watch("lastname");
  const phone = watch("phone");

  function formatPhoneDigits(input = "") {
    const digits = input.replace(/\D/g, "").slice(0, 10);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 10);
    if (part3) return `(${part1}) ${part2}-${part3}`;
    if (part2) return `(${part1}) ${part2}`;
    if (part1) return `(${part1}`;
    return "";
  }
  function onSubmit(values: Step8FormValues) {
    const n = values.name?.trim();
    const l = values.lastname?.trim();
    // phone is stored in canonical +1XXXXXXXXXX form in the form state
    const p = values.phone?.trim();
    const e = values.email?.trim();
    const a = values.accept;
    onNext({
      name: n ?? "",
      lastname: l ?? "",
      phone: p ?? "",
      email: e ?? "",
      accept: a ?? false,
    });
  }
  const inputBase =
    "peer w-full h-14 px-3 pt-2 pb-0 border-2 rounded bg-white focus:outline-none transition-colors duration-150 placeholder-transparent bg-stone-50";

  return (
    <div className="max-w-md mx-auto  h-full flex flex-col bg-stone-50 px-4">
      <h3
        tabIndex={-1}
        className="font-bold text-[24px] text-start leading-[30px] py-8"
      >
        We have matching pros in your area!
      </h3>
      {/* summary of previous choices (read-only) */}
      <div className="flex items-center justify-start gap-1 pb-8">
        <p className="text-[16px] font-medium">Project:</p>
        {select && <p className="text-[16px] font-medium">{select.need}</p>}
        {services && (
          <p className="text-[16px] font-medium">{services.service}</p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col justify-between items-start  bg-white pt-6 pb-4 rounded-t-[8px] shadow-custom"
      >
        <div className="w-full flex flex-col justify-center items-center gap-3 px-5">
          <div className="flex justify-center items-center gap-4 w-full">
            <div className="w-1/2 relative">
              <input
                id="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : "name-help"}
                className={
                  inputBase +
                  (errors.name
                    ? " border-red-600 focus:border-red-600"
                    : " border-gray-300 focus:border-gray-700")
                }
                placeholder=" " /* important: single space so placeholder-shown works */
                autoComplete="street-address"
              />
              <label
                htmlFor="name"
                className={
                  "absolute left-3 top-4 flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                  "peer-focus:top-2 peer-focus:translate-y-0  peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                  "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
                }
              >
                Name
              </label>

              {errors.name && (
                <p
                  role="alert"
                  id="name-error"
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-1/2 relative">
              <input
                id="lastname"
                {...register("lastname")}
                aria-invalid={errors.lastname ? "true" : "false"}
                aria-describedby={
                  errors.lastname ? "lastname-error" : "lastname-help"
                }
                className={
                  inputBase +
                  (errors.lastname
                    ? " border-red-600 focus:border-red-600"
                    : " border-gray-300 focus:border-gray-700")
                }
                placeholder=" "
                autoComplete="address-level2"
              />
              <label
                htmlFor="lastname"
                className={
                  "absolute left-3 top-4  flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                  "peer-focus:top-2 peer-focus:translate-y-0  peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                  "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
                }
              >
                Lastname
              </label>
              {errors.lastname && (
                <p
                  role="alert"
                  id="city-error"
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>
          {lastname && lastname.trim() !== "" && (
            <div className="w-full relative">
              {/* Controller handles raw stored value in +1XXXXXXXXXX while rendering formatted text */}
              <Controller
                control={control}
                name="phone"
                render={({ field }) => {
                  // field.value is expected to be the stored canonical form (+1XXXXXXXXXX) or empty
                  const rawDigits = (field.value || "")
                    .replace(/\D/g, "")
                    .replace(/^1/, "")
                    .slice(0, 10);
                  const display = rawDigits ? formatPhoneDigits(rawDigits) : "";
                  return (
                    <>
                      <input
                        id="phone"
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={
                          errors.phone ? "phone-error" : "phone-help"
                        }
                        className={
                          inputBase +
                          (errors.phone
                            ? " border-red-600 focus:border-red-600"
                            : " border-gray-300 focus:border-gray-700")
                        }
                        placeholder=" "
                        autoComplete="tel"
                        value={display}
                        onChange={(e) => {
                          const digits = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          // store canonical form with +1 prefix when any digits present, otherwise empty string
                          const stored = digits ? `+1${digits}` : "";
                          field.onChange(stored);
                        }}
                        onBlur={field.onBlur}
                      />
                      <label
                        htmlFor="phone"
                        className={
                          "absolute left-3 top-4  flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                          "peer-focus:top-2 peer-focus:translate-y-0  peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                          "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
                        }
                      >
                        Phone
                      </label>
                    </>
                  );
                }}
              />

              {errors.phone && (
                <p
                  role="alert"
                  id="phone-error"
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>
          )}
          {phone && phone.trim() !== "" && (
            <div className="w-full relative">
              <input
                id="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : "email-help"}
                className={
                  inputBase +
                  (errors.email
                    ? " border-red-600 focus:border-red-600"
                    : " border-gray-300 focus:border-gray-700")
                }
                placeholder=" "
                autoComplete="phone-level2"
              />
              <label
                htmlFor="email"
                className={
                  "absolute left-3 top-4  flex items-center pointer-events-none transition-all duration-150 ease-in-out text-base text-gray-500 " +
                  "peer-focus:top-2 peer-focus:translate-y-0  peer-focus:items-start peer-focus:text-xs peer-focus:text-gray-700 " +
                  "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:items-start peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
                }
              >
                Email
              </label>

              {errors.email && (
                <p
                  role="alert"
                  id="phone-error"
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
          <label className="flex justify-start items-center gap-2 cursor-pointer w-full mt-2 mb-5">
            <input
              type="checkbox"
              {...register("accept")}
              className="size-5 border border-gray-300 rounded 
             checked:bg-green-600 checked:border-green-600 
             checked:text-white focus:ring-2 focus:outline-none"
            />
            <span className="leading-[18px] text-[14px] text-left">
              Text me project cost guides, how-to articles, and advice.
            </span>
          </label>
        </div>
        <div className="flex justify-center items-center gap-3 px-5 w-full">
          <button
            type="submit"
            className="w-full py-3 rounded bg-accent text-[16px] font-bold text-primary border border-accent"
          >
            Send
          </button>
        </div>
        <p className="text-[12px] text-left text-gray-400 px-5 mt-5">
          By clicking View matching pros, I agree to{" "}
          <span className="text-primary font-medium underline">
            H&A Tree's Terms
          </span>{" "}
          and{" "}
          <span className="text-primary font-medium underline">
            Privacy Policy
          </span>
          , and that H&A Tree and its{" "}
          <span className="text-primary font-medium underline">
            service professionals,
          </span>{" "}
          or parties acting on their behalf, may use automated technology and
          prerecorded messages to deliver marketing calls or texts regarding my
          project and future projects to the number I provided. Consent is not a
          condition of service.
        </p>
      </form>
    </div>
  );
}
