import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type TextScrambleProps = {
    children: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
    className?: string;
    as?: React.ElementType;
    onScrambleComplete?: () => void;
};

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
    children,
    duration = 0.8,
    speed = 0.04,
    characterSet = defaultChars,
    className,
    as: Component = 'h2',
    onScrambleComplete,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);
    const text = children;

    const scramble = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const steps = duration / speed;
        let step = 0;

        const interval = setInterval(() => {
            let scrambled = '';
            const progress = step / steps;

            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    scrambled += ' ';
                    continue;
                }

                if (progress * text.length > i) {
                    scrambled += text[i];
                } else {
                    scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }

            setDisplayText(scrambled);
            step++;

            if (step > steps) {
                clearInterval(interval);
                setDisplayText(text);
                setIsAnimating(false);
                onScrambleComplete?.();
            }
        }, speed * 1000);
    };

    return (
        <motion.div
            onViewportEnter={scramble}
            className={className}
        >
            <Component>{displayText}</Component>
        </motion.div>
    );
}