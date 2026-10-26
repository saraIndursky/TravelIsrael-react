import { getLookups } from "../../../services/lookups.service";
import type { AppDispatch, RootState } from "../../store";
import { setLookups } from "./lookups.slice";

export const fetchLookups = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    // Load only once
    if (state.lookups.isLoaded) return;

    const data = await getLookups();
    dispatch(setLookups(data));
};