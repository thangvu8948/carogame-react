import { INVITING_ON, INVITING_OFF, FINDING_ON, FINDING_OFF } from "../constants/action-types";

const initialState = {
  isInviting: false,
  isFindingQuickGame: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case INVITING_ON:
      console.log("turned on")
      return Object.assign({}, state,  {isInviting: true});
      break;
    case INVITING_OFF:
      return Object.assign({}, state,  {isInviting: false});
      break;
    case FINDING_ON:
      return Object.assign({}, state,  {isFindingQuickGame: true});
    case FINDING_OFF:
      return Object.assign({}, state,  {isFindingQuickGame: false});
      
  }
  console.log(state);
  return state;
};

export default rootReducer;