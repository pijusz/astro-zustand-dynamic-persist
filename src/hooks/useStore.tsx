import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StoreType = "unknown" | "fruits" | "veggies" | "drinks";

type CustomData = Record<string, string | number | boolean | undefined>;

type Store = {
	createDate: Date;
	modifyDate: Date;
	item_name: string;
	data: CustomData;
	actions: {
		setData: (data: CustomData) => void;
		getData: () => CustomData;
		getName: () => string;
		setName: (name: string) => void;
		getDates: () => [Date, Date];
	};
};

const INITIAL_STATE: Omit<Store, "actions" | "createDate" | "modifyDate"> = {
	item_name: "",
	data: {},
};

const createStore = (storeName: StoreType) =>
	create<Store>()(
		persist(
			(set, get) => ({
				...INITIAL_STATE,
				createDate: new Date(),
				modifyDate: new Date(),
				actions: {
					setData: (data: CustomData) => {
						set((state) => ({
							...state,
							data: { ...state.data, ...data },
							modifyDate: new Date(),
						}));
					},
					getData: () => get().data,
					getName: () => get().item_name,
					setName: (name: string) => {
						set((state) => ({
							...state,
							item_name: name,
							modifyDate: new Date(),
						}));
					},
					getDates: () => {
						let { createDate, modifyDate } = get();
						if (typeof createDate === "string") {
							createDate = new Date(createDate);
						}
						if (typeof modifyDate === "string") {
							modifyDate = new Date(modifyDate);
						}
						return [createDate, modifyDate];
					},
				},
			}),
			{
				name: storeName,
				partialize: ({ actions, ...rest }) => rest,
			},
		),
	);

export type ZustandStoreType = ReturnType<typeof createStore>;

export const useDynamicStore = (storeName: StoreType): ZustandStoreType => {
	if (!window?.stores) {
		window.stores = new Map();
	} else if (window.stores.has(storeName)) {
		return window.stores.get(storeName);
	}
	const newStore = createStore(storeName);
	window.stores.set(storeName, newStore);
	return newStore;
};

export const useStoreActions = (storeName: StoreType) => {
	const store = useDynamicStore(storeName);
	return store((state) => state.actions);
};

export const useStoreName = (storeName: StoreType) => {
	const store = useDynamicStore(storeName);
	return store((state) => state.item_name);
};

export const useStoreData = (storeName: StoreType) => {
	const store = useDynamicStore(storeName);
	return store((state) => state.data);
};
