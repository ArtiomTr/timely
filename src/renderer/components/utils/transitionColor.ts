export const transitionColor = (
    from: { r: number; g: number; b: number },
    to: { r: number; g: number; b: number },
    factor: number
) => {
    const delta = {
        r: to.r - from.r,
        g: to.g - from.g,
        b: to.b - from.b,
    };

    return `rgb(${from.r + delta.r * factor}, ${from.g + delta.g * factor}, ${
        from.b + delta.b * factor
    })`;
};
