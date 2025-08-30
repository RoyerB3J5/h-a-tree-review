import * as z from "zod";

/** Schema y tipos para el paso ZIP */
export const zipStepSchema = z.object({
  postalCode: z
    .string()
    .min(1, "Please enter a valid ZIP code")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
});
/** Pregunta 2 **/
export const SELECT_OPTIONS = [
  { value: "trees", label: "Trees" },
  { value: "shrubs_bushes", label: "Shrubs or bushes" },
  { value: "both", label: "Both trees and shrubs" },
] as const;

// allow either one of the predefined options or a free-text entry (user detail)
export const selectStepSchema = z.object({
  need: z.string().min(1, "Please choose an option or enter details"),
  custom: z.string().optional(),
});

export type ZipStepFormValues = z.infer<typeof zipStepSchema>;

export type SelectStepFormValues = z.infer<typeof selectStepSchema>;

/** Contenedor para los datos recogidos por el multistep. Añade otros pasos aquí. */
export type MultistepCollected = {
  zip?: ZipStepFormValues;
  select?: SelectStepFormValues;
  // otros pasos: address?, contact?, etc.
};
