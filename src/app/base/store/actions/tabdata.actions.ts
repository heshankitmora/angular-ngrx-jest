import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { TabData } from "../../model/tabdata";

export const loadTabDataRequest = createAction(
  '[Tabdata Data] Request Load Tab Data'
);

export const loadTabData = createAction(
  '[Tabdata Data] Load Tab Data',
  props<{tabdatalist: TabData[]}>()
);

export const addTabData = createAction(
  '[Tabdata Data] Add Tab Data',
  props<{tabdata: TabData}>()
);

export const updateTabData = createAction(
  '[Tabdata Data] Update Tab Data',
  props<{tabdata: Update<TabData>}>()
);

export const deleteTabData = createAction(
  '[Tabdata Data] Delete Tab Data',
  props<{tabindex: number}>()
);
