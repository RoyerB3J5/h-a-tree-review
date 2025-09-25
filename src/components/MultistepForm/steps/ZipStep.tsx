import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import type { FeatureCollection, Polygon, MultiPolygon } from "geojson";
import { zipStepSchema } from "../types";
import type { ZipStepFormValues } from "../types";

type Props = {
  defaultValues?: Partial<ZipStepFormValues>;
  onNext: (values: ZipStepFormValues) => void;
};

export default function ZipStep({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ZipStepFormValues>({
    resolver: zodResolver(zipStepSchema),
    mode: "onTouched",
    defaultValues: { postalCode: "", ...defaultValues },
  });

  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [datasetLoaded, setDatasetLoaded] = useState(false);
  const [geoJson, setGeoJson] = useState<FeatureCollection<
    Polygon | MultiPolygon
  > | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // lazy load: uncomment loadDataset() if you prefer precache
    // loadDataset();
  }, []);

  async function loadDataset() {
    if (datasetLoaded) return;
    try {
      const res = await fetch("/data/postal_codes.geojson");
      if (!res.ok) throw new Error("No se pudo cargar postal_codes.geojson");
      const j = await res.json();
      setGeoJson(j);
      setDatasetLoaded(true);
    } catch (err) {
      console.warn("No se pudo cargar dataset local:", err);
      setDatasetLoaded(false);
      setGeoJson(null);
    }
  }

  async function handleUseLocation() {
    setGeoError(null);
    setGeoLoading(true);

    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation no disponible en este navegador.");
      setGeoLoading(false);
      return;
    }

    await loadDataset();

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          if (!geoJson) {
            setGeoError(
              "No hay dataset local instalado para mapear coordenadas a ZIP. Ingresa ZIP manualmente."
            );
            setGeoLoading(false);
            return;
          }

          const point = {
            type: "Feature",
            properties: {},
            geometry: { type: "Point", coordinates: [lon, lat] },
          };

          let found: string | null = null;
          for (const f of geoJson.features) {
            if (!f.geometry) continue;
            try {
              if (booleanPointInPolygon(point as any, f as any)) {
                const p =
                  (f.properties as any)?.postcode ??
                  (f.properties as any)?.postal_code ??
                  (f.properties as any)?.ZIP ??
                  null;
                if (typeof p === "string" && p.trim().length) {
                  found = p;
                  break;
                }
              }
            } catch (err) {
              // ignore corrupt geometries
            }
          }

          if (found) {
            setValue("postalCode", found, {
              shouldValidate: true,
              shouldDirty: true,
            });
            await trigger("postalCode");
            setGeoError(null);
          } else {
            setGeoError(
              "No se encontró ZIP en el dataset local. Ingresa manualmente."
            );
          }
        } catch (err) {
          console.error(err);
          setGeoError("Error procesando la ubicación.");
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        console.warn("geo error", err);
        // err.PERMISSION_DENIED is not necessarily defined on the runtime type
        // so we check via code number
        if ((err as any)?.code === 1)
          setGeoError("Permiso denegado para acceder a ubicación.");
        else setGeoError("Error al obtener ubicación del dispositivo.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60_000 }
    );
  }

  function onSubmit(values: ZipStepFormValues) {
    onNext(values);
  }

  return (
    <div className="max-w-md mx-auto  h-full flex flex-col bg-stone-50 px-4 w-full">
      <h3
        ref={titleRef}
        tabIndex={-1}
        className="font-bold text-[24px] text-center leading-[30px] py-8"
      >
        Compare quotes from top-rated Tree or Shrub Removal & Trimming Services
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col justify-between items-start bg-white pt-6 pb-5 rounded-t-[8px] shadow-custom w-full "
      >
        <div className="w-full px-4 flex flex-col justify-center items-center mb-8">
          <label className="font-semibold text-[16px] text-center leading-[44px]  ">
            Enter the location of your project
          </label>
          <div className="flex items-stretch gap-2 mt-5 w-full">
            <input
              {...register("postalCode")}
              name="postalCode"
              placeholder="ZIP Code"
              className={`bg-stone-50 flex-1 p-3 border rounded focus:outline-none focus:border-gray-700 focus:border-2 ${
                errors.postalCode
                  ? "border-red-500 focus:border-red-700"
                  : "border-gray-300"
              }`}
              aria-invalid={errors.postalCode ? "true" : "false"}
              aria-describedby={errors.postalCode ? "zip-error" : undefined}
            />

            <button
              type="button"
              onClick={handleUseLocation}
              disabled={geoLoading}
              title="Use device location"
              className="px-5 py-3 border border-gray-300 rounded bg-stone-50 flex items-center justify-center"
              aria-pressed={geoLoading}
            >
              {geoLoading ? (
                "..."
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5L3.5 3.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {errors.postalCode && (
            <p
              id="zip-error"
              role="alert"
              className="text-red-600 text-sm mt-2"
            >
              {errors.postalCode.message}
            </p>
          )}

          <div aria-live="polite" className="text-xs text-gray-600 mt-2">
            {geoError && <span className="text-red-600">{geoError}</span>}
          </div>
        </div>

        <div className="w-full border-t border-gray-200 pt-5 flex justify-center items-center">
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
