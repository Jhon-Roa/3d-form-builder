"use client";

import { useEffect } from "react";
import { Card, Slider, Text, Flex, Box } from "@radix-ui/themes";
import { evaluate } from "mathjs";

interface MathPrismSliderProps {
    radius: number[];
    sideNumber: number[];
    onVolumeChange: (volume: number) => void;
    onRadiusChange: (radius: number[]) => void;
}

function getMaxRadius(n: number) {
    return Math.sqrt(
        1500 /
        (
            n *
            Math.sin((2 * Math.PI) / n)
        )
    );
}

function MathPrismSlider({ radius, sideNumber, onVolumeChange, onRadiusChange }: MathPrismSliderProps) {

    const expr =
        "750*r*cos(pi/n) - n*r^3*sin(pi/n)*cos(pi/n)^2";

    useEffect(() => {
        catchValue()
    }, [radius])

    const catchValue = () => {
        const volume = evaluate(expr, {
            r: radius[0],
            n: sideNumber[0]
        })

        onVolumeChange(volume)
    }

    const min = 0;
    const max = getMaxRadius(sideNumber[0]);
    const step = 0.01;

    return (
        <Card size="3" className="w-full">
            <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                    <Text size="2" weight="medium" color="gray">
                        Radio del prisma
                    </Text>
                </Flex>

                <Box className="py-2">
                    <Slider
                        value={radius}
                        onValueChange={onRadiusChange}
                        min={min}
                        max={max}
                        step={step}
                        size="3"
                    />
                </Box>

                <Flex justify="between">
                    <Text size="1" color="gray">
                        {min}
                    </Text>
                    <Text size="1" color="gray">
                        {max.toFixed(2)}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
}

export default MathPrismSlider;
