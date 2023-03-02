import { createStore} from "redux";
import SessionReducer from "./reducers/SessionReducer";

const store = createStore(SessionReducer);

export default store;
