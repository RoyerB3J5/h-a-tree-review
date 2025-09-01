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

/** Pregunta 3 **/
export const SELECT_OPTIONS_3 = [
  { value: "removal", label: "Removal" },
  { value: "trimming_thinning", label: "Trimming or thinning" },
] as const;

// allow either one of the predefined options or a free-text entry (user detail)
export const selectStep3Schema = z.object({
  service: z.string().min(1, "Please choose an option or enter details"),
  custom: z.string().optional(),
});

/** Pregunta 4 **/
export const SELECT_OPTIONS_4 = [
  { value: "home", label: "Home" },
  { value: "business", label: "Business" },
] as const;

// allow either one of the predefined options or a free-text entry (user detail)
export const selectStep4Schema = z.object({
  location: z.string().min(1, "Please choose an option or enter details"),
  custom: z.string().optional(),
});

/** Pregunta 5 **/
export const SELECT_OPTIONS_5 = [
  { value: "in_2_weeks", label: "Within 2 weeks" },
  { value: "more_2_weeks", label: "More than 2 weeks" },
  { value: "not_sure", label: "Not sure - still planning/budgeting" },
] as const;

// allow either one of the predefined options or a free-text entry (user detail)
export const selectStep5Schema = z.object({
  time: z.string().min(1, "Please choose an option or enter details"),
  custom: z.string().optional(),
});

export const Step6Schema = z.object({
  project: z.string().max(2000,"Max 2000 caracteres").optional(),
})

export type ZipStepFormValues = z.infer<typeof zipStepSchema>;
export type SelectStepFormValues = z.infer<typeof selectStepSchema>;
export type SelectStep3FormValues = z.infer<typeof selectStep3Schema>;
export type SelectStep4FormValues = z.infer<typeof selectStep4Schema>;
export type SelectStep5FormValues = z.infer<typeof selectStep5Schema>;
export type Step6FormValues = z.infer<typeof Step6Schema>;
/** Contenedor para los datos recogidos por el multistep. Añade otros pasos aquí. */
export type MultistepCollected = {
  zip?: ZipStepFormValues;
  select?: SelectStepFormValues;
  services?: SelectStep3FormValues;
  location?: SelectStep4FormValues;
  time?: SelectStep5FormValues;
  project?: Step6FormValues;
  // otros pasos: address?, contact?, etc.
};
