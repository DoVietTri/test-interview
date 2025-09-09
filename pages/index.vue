<template>
  <div class="container">
    <div class="carousel">
      <carousel :images="images" />
    </div>
    <div class="information">
      <el-text tag="h1" class="title">{{
        productStore.productData?.product.name
      }}</el-text>
      <el-text tag="p" class="mt-36 description">
        {{ productStore.productData?.product.description }}
      </el-text>
      <div class="mt-36 d-flex gap-10">
        <el-text tag="div" class="choose-options">Choose Options</el-text>
        <el-divider class="divider flex-1" />
      </div>
      <div class="options">
        <div
          v-for="productOptionType in productStore.productData?.optionTypes"
          :key="productOptionType.optionTypeId"
          class="options__item"
          @click="handleOpenDrawer(productOptionType.optionTypeId)"
        >
          <el-text tag="div" class="options__item--label">
            {{ productOptionType.displayName }}
          </el-text>
          <el-text tag="div" class="options__item--content">{{
            getOptionName(productOptionType.optionTypeId)
          }}</el-text>
        </div>
      </div>
      <div class="mt-16">
        <el-text class="total">{{ formatCurrency(totalPrice) }}</el-text>
      </div>
      <div class="mt-16">
        <el-text class="quantity-title">Quantity</el-text>
      </div>
      <div class="d-flex gap-10">
        <div class="d-flex gap-5 quantity">
          <el-button
            text
            class="h-100"
            @click="cartStore.handleMinusOrPlusProductCombo(-1)"
          >
            <img src="../assets/icons/minus.svg" alt="minus" />
          </el-button>
          <el-text tag="span" class="quantity--label">
            {{ cartStore.productComboSelected?.quantity }}
          </el-text>
          <el-button
            text
            class="h-100"
            @click="cartStore.handleMinusOrPlusProductCombo(1)"
          >
            <img src="../assets/icons/plus.svg" alt="plus" />
          </el-button>
        </div>
        <el-button
          color="#231F20"
          class="w-100 h-100 rounded-none"
          @click="handleAddToCart"
        >
          <div class="d-flex gap-12">
            <img src="../assets/icons/basket-add.svg" alt="basket-add" />
            <el-text class="add-to-cart">Add to cart</el-text>
          </div>
        </el-button>
      </div>
    </div>
  </div>
  <drawer
    v-if="isOpenDrawer"
    v-model:is-visible="isOpenDrawer"
    :product-option-type="productOptionTypeSelected"
    :option-uid-selected="optionUidSelected"
    @change="handleChangeOption"
  />
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { useProductStore } from "~/store/product";
import type { ProductOptionType } from "~/types/product";
import Image1 from "~/assets/images/image-1.png";
import Image2 from "~/assets/images/image-2.png";
import Image3 from "~/assets/images/image-3.png";
import Image4 from "~/assets/images/image-4.png";

const images = [Image1, Image2, Image3, Image4];

const productStore = useProductStore();
const cartStore = useCartStore();

const isOpenDrawer = ref(false);
const productOptionTypeSelected = ref<ProductOptionType>();
const optionUidSelected = ref<string>();

const totalPrice = computed(() => {
  const totalOptionTypesPrice =
    cartStore.productComboSelected?.optionTypes?.reduce(
      (total, combo) => (total += combo.option.price),
      0
    );

  return (
    (totalOptionTypesPrice || 0) *
    (cartStore.productComboSelected?.quantity || 1)
  );
});

const handleOpenDrawer = (optionTypeId: number) => {
  // Get the list option of optionType
  const productOptionType = productStore.productData?.optionTypes?.find(
    (productOptionType) => productOptionType.optionTypeId === optionTypeId
  );
  productOptionTypeSelected.value = productOptionType;

  // Get optionSelected by productComboSelected
  const optionSelected = cartStore.productComboSelected?.optionTypes.find(
    (productOptionType) => productOptionType.optionTypeId === optionTypeId
  );
  optionUidSelected.value = optionSelected?.option.uid;

  isOpenDrawer.value = true;
};

const getOptionName = (optionTypeId: number) => {
  const optionTypeSelected = cartStore.productComboSelected?.optionTypes?.find(
    (optionType) => optionType.optionTypeId === optionTypeId
  );

  return optionTypeSelected?.option.displayName;
};

const handleChangeOption = (optionTypeId: number, optionUid: string) => {
  cartStore.handleChangeOption(optionTypeId, optionUid);
};

const handleAddToCart = () => {
  ElNotification({
    title: "Success",
    message: `The product has been added to your cart. Total ${formatCurrency(
      totalPrice.value
    )}`,
    type: "success",
  });
};

await productStore.getProduct();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 0 auto;
  padding: 60px;
  gap: 60px;
  max-width: 1440px;

  @media (max-width: 1024px) {
    padding: 20px;
    flex-direction: column;
  }

  .carousel {
    max-width: 588px;

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }
}

.title {
  font-weight: 400;
  font-size: 48px;
  line-height: 120%;
  color: #231f20;
}

.description {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #231f20;
}

.choose-options {
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  text-transform: uppercase;
  letter-spacing: 8%;
  color: #231f20;
}

.divider {
  border-top-color: #231f20;
}

:deep(.option-label) {
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  vertical-align: middle;
}

.options {
  border: 1px solid #0000001a;

  &__item {
    display: flex;
    padding: 16px;
    border-top: 1px solid #0000001a;
    cursor: pointer;

    &:first-child {
      border-top: none;
    }

    &--label {
      min-width: 120px;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      width: 25%;
    }

    &--content {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #231f20;
    }
  }
}

.total {
  font-weight: 600;
  font-size: 28px;
  line-height: 125%;
  color: #231f20;
}

.quantity-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #231f20;
}

.quantity {
  border: 1px solid #0000001a;

  &--label {
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
    color: #231f20;
    align-self: center;
    min-width: 24px;
    text-align: center;
  }
}

.add-to-cart {
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
}
</style>
