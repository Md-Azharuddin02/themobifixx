import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
export default function CursorFollower() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsHovering(
                window.getComputedStyle(target).cursor === 'pointer'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (isTouchDevice()) {
        return null;
    }

    return (
        <motion.div
            className="w-8 h-8 fixed top-0 left-0 rounded-xl pointer-events-none z-[9999] border-2"
            style={{
                borderColor: isHovering ? 'rgba(255, 184, 0, 0.5)' : 'rgba(11, 31, 58, 0.3)',
                transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 1.5 : 1})`,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
}