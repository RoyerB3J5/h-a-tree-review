import { useForm } from "react-hook-form";
import { Step6Schema, type Step6FormValues } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";

type Props = {
  defaultValues?: Partial<Step6FormValues>;
  onNext: (values: Step6FormValues) => void;
  onBack?: () => void;
};
export default function SixStep({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step6FormValues>({
    resolver: zodResolver(Step6Schema),
    defaultValues: { project: "", ...defaultValues },
    mode: "onTouched",
  });
  const project = watch("project") ?? "";
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX = 2000;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const MIN = 200; // px
    // make sure minHeight is set (covers CSS box-sizing and render timing)
    el.style.minHeight = `${MIN}px`;
    // autosize while respecting the min height
    el.style.height = "auto";
    const targetH = Math.max(el.scrollHeight, MIN);
    el.style.height = `${targetH}px`;
  }, [project]);

  function onSubmit(values: Step6FormValues) {
    const trimmed = values.project?.trim();
    onNext({ project: trimmed && trimmed.length ? trimmed : undefined });
  }
  return (
    <div className="max-w-md mx-auto pt-2 h-full flex flex-col">
      <h3
        tabIndex={-1}
        className="font-bold text-[24px] text-start leading-[30px] p-4"
      >
        Please tell us a little about your project.
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-2 flex flex-col justify-between items-start flex-1 "
      >
        <div className="w-full flex flex-col justify-center items-center gap-2 px-5">
          <textarea
            id="project"
            {...register("project")}
            ref={(e) => {
              register("project").ref(e);
              textareaRef.current = e;
            }}
            rows={4}
            maxLength={MAX}
            aria-invalid={errors.project ? "true" : "false"}
            aria-describedby={errors.project ? "project-error" : "project-help"}
            className="w-full p-5 border border-gray-400 rounded-[7px] bg-white resize-none focus:outline-none focus:ring placeholder-gray-400 min-h-[200px]"
            placeholder="How can a pro help you? The more details the better - it helps pros provide the most accurate quote!. (Optional)"
          />

          <div className="flex justify-between items-center text-xs text-gray-400 mt-2 self-end">
            <div>
              {project.length}/{MAX}
            </div>
          </div>
          {errors.project && (
            <p role="alert" className="text-red-600 text-sm mt-2">
              {errors.project.message}
            </p>
          )}
        </div>

        <div className="w-full border-t border-gray-200 py-4 flex justify-center items-center flex-col gap-3">
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
