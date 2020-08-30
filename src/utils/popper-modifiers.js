/**
 * Popper js "community modifier"
 * Makes popper same width as reference
 * https://popper.js.org/docs/v2/modifiers/community-modifiers/
 */
export const sameWidth = {
    name: "sameWidth",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
    }
};