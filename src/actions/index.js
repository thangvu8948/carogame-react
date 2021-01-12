import { INVITING_ON, INVITING_OFF, FINDING_ON, FINDING_OFF } from "../constants/action-types";

export function inviting_on(payload) {
    return { type: INVITING_ON }
};

export function inviting_off(payload) {
    return { type: INVITING_OFF }
};

export function finding_on(payload) {
    return {type: FINDING_ON}
}

export function finding_off(payload) {
    return {type: FINDING_OFF};
}