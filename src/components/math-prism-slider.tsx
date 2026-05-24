"use client";

import { useEffect } from "react";
import { Card, Slider, Text, Flex, Box } from "@radix-ui/themes";
import { volumeCalc } from "../lib/utils";

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

    useEffect(() => {
        onVolumeChange(volumeCalc({radius, sideNumber}))
    }, [radius])

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
