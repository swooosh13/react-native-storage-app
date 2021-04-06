import { AppDispatch } from "../../store";
import { itemsAPI } from "../../api/api";
import { ItemsActionTypes, ItemType } from "./items";

export const getItemById = (val: number) => async (dispatch: AppDispatch) => {
  let response = await itemsAPI
    .getItemById(val)
    .then((response: any) => response.data);
  dispatch({ type: ItemsActionTypes.FETCH_ITEMS, items: response });
};

export const addItem = (item: ItemType) => async (dispatch: AppDispatch) => {
  let response;
  try {
    response = await itemsAPI.postItem(item);
  } catch (e) {
    console.log(e);
    console.log(response);
    return;
  } finally {
    console.log("item", item);
  }
  dispatch({ type: ItemsActionTypes.ADD_ITEM, item });
};

export const loadItems = (val: string, description: string = "") => async (
  dispatch: AppDispatch
) => {
  let response;

  try {
    if (val === "") {
      // TODO
      console.log("loadItems() AC: getAll");
      response = await itemsAPI
        .getItems()
        .then((response: any) => response.data);
    } else if (description === "") {
      console.log("loadItems() AC: searchByName");
      response = await itemsAPI
        .getItemsByName(val)
        .then((response: any) => response.data);
    } else {
      console.log("loadItems() AC: serachByNameAndDescription");
      response = await itemsAPI
        .getItemsByNameAndDescription(val, description)
        .then((response: any) => response.data);
    }
  } catch (e) {
    console.log(e);
    return;
  }

  dispatch({ type: ItemsActionTypes.FETCH_ITEMS, items: response });
};

export const clearItems = () => (dispatch: AppDispatch) => {
  dispatch({ type: ItemsActionTypes.CLEAR_ITEMS });
};

export const removeItem = (id: number) => async (dispatch: AppDispatch) => {
  let response: any = await itemsAPI
    .removeItem(id)
    .then((response: any) => response.data);

  dispatch({ type: ItemsActionTypes.DELETE_ITEM, id });
};

export const toggleAddModal = () => (dispatch: AppDispatch) => {
  dispatch({ type: ItemsActionTypes.TOGGLE_SHOW_MODAL });
};
