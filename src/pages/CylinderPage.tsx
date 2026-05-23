import { useState } from "react";
import MathCylinderSlider from "../components/math-cylinder-slider";
import CylinderScene from "../components/cylinder-scene";

export default function CylinderPage() {
    const [radius, setRadius] = useState<number[]>([8.2]);

    return (
        <div className="max-w-6xl mx-auto min-h-full flex flex-col">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Cilindro
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Ajusta los parametros para visualizar la forma
                </p>
            </div>

            <div className="flex flex-col gap-6 h-full flex-1">

                <div className="flex-1 min-h-[400px] rounded-xl border border-border bg-card/30 overflow-hidden relative">
                    <CylinderScene radius={radius[0]} />

                    {/* <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-primary/60"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <ellipse cx="12" cy="5" rx="8" ry="3" />
                                <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                                <ellipse cx="12" cy="19" rx="8" ry="3" />
                            </svg>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Vista previa del cilindro
                        </p>
                    </div> */}
                </div>

                <MathCylinderSlider
                    radius={radius}
                    onRadiusChange={setRadius}
                />
            </div>
        </div>
    );
}
