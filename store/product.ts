import type { ProductCombo } from "~/types/cart";
import type { ProductData } from "~/types/product";
import { useCartStore } from "./cart";

export const useProductStore = defineStore("product", {
  state: () => ({
    productData: null as ProductData | null,
    getProductDataRequesting: false as boolean,
  }),

  actions: {
    async getProduct() {
      try {
        this.getProductDataRequesting = true;
        const data = await $fetch<ProductData>("/api/product");
        this.productData = data;

        const cartStore = useCartStore();

        const productCombo: ProductCombo = {
          uid: data.product.uid,
          name: data.product.name,
          quantity: 1,
          optionTypes: data.optionTypes.map((optionType) => ({
            optionTypeId: optionType.optionTypeId,
            displayName: optionType.displayName,
            option: optionType.options[0],
          })),
        };
        cartStore.setProductComboSelected(productCombo);
      } catch (error) {
        // This block to handle error
        console.log(error);
      } finally {
        this.getProductDataRequesting = false;
      }
    },
  },
});
