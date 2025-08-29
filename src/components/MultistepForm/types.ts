import * as z from "zod";

/** Schema y tipos para el paso ZIP */
export const zipStepSchema = z.object({
  postalCode: z
    .string()
    .min(1, "Please enter a valid ZIP code")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
});
/** Pregunta 2 **/
export const selectStepSchema = z.object({
  need: z.enum(["trees", "shrubs_bushes", "both"])
})

export type ZipStepFormValues = z.infer<typeof zipStepSchema>;

export type SelectStepFormValues = z.infer<typeof selectStepSchema>;

/** Contenedor para los datos recogidos por el multistep. Añade otros pasos aquí. */
export type MultistepCollected = {
  zip?: ZipStepFormValues;
  select?: SelectStepFormValues;
  // otros pasos: address?, contact?, etc.
};
