import type { ProductCombo } from "~/types/cart";
import { useProductStore } from "./product";

export const useCartStore = defineStore("cart", {
  state: () => ({
    productComboSelected: null as ProductCombo | null,
  }),
  actions: {
    setProductComboSelected(combo: ProductCombo) {
      this.productComboSelected = combo;
    },
    handleMinusOrPlusProductCombo(quantity: number) {
      if (!this.productComboSelected) return;
      if (this.productComboSelected.quantity + quantity < 1) return;

      this.productComboSelected.quantity += quantity;
    },
    handleChangeOption(optionTypeId: number, optionUid: string) {
      if (!this.productComboSelected) return;

      const productStore = useProductStore();

      const option = productStore.productData?.optionTypes
        .find((optionType) => optionType.optionTypeId === optionTypeId)
        ?.options?.find((option) => option.uid === optionUid);

      if (!option) return;

      const newProductCombo: ProductCombo = {
        ...this.productComboSelected,
        optionTypes: this.productComboSelected.optionTypes.map((optionType) => {
          if (optionType.optionTypeId === optionTypeId) {
            return {
              ...optionType,
              option: option,
            };
          }
          return optionType;
        }),
      };

      this.productComboSelected = newProductCombo;
    },
  },
});
