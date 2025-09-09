<template>
  <el-drawer
    v-model="isVisible"
    :title="productOptionType?.displayName"
    :before-close="handleClose"
  >
    <template #header="{ titleId, titleClass }">
      <el-text :id="titleId" class="title" :class="titleClass">
        {{ productOptionType?.displayName }}
      </el-text>
    </template>
    <el-radio-group v-model="optionUid" class="w-100" @change="handleChange">
      <el-radio
        v-for="option in productOptionType?.options || []"
        :key="option.uid"
        :value="option.uid"
        size="large"
        class="d-flex flex-row-reverse w-100 justify-content-between"
      >
        {{ option.displayName }}
      </el-radio>
    </el-radio-group>
  </el-drawer>
</template>

<script setup lang="ts">
import type { ProductOptionType } from "~/types/product";

const props = defineProps<{
  isVisible: boolean;
  productOptionType?: ProductOptionType;
  optionUidSelected?: string;
}>();

const emits = defineEmits<{
  (event: "update:isVisible", isVisible: boolean): void;
  (event: "change", optionTypeId: number, optionUid: string): void;
}>();

const isVisible = computed({
  get() {
    return props.isVisible;
  },
  set(val) {
    emits("update:isVisible", val);
  },
});

const optionUid = ref(props.optionUidSelected);

const handleClose = () => {
  emits("update:isVisible", false);
};

const handleChange = (value: string | number | undefined | boolean) => {
  optionUid.value = value as string;
  emits(
    "change",
    props.productOptionType?.optionTypeId as number,
    optionUid.value
  );
  handleClose();
};
</script>

<style scoped lang="scss">
.title {
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 8%;
  color: #231f20;
  text-transform: uppercase;
}

:deep(.el-radio) {
  margin-right: 0;
}

:deep(.el-radio__label) {
  font-weight: 600;
  color: #231f20;
}

:deep(.el-radio.el-radio--large .el-radio__inner) {
  width: 20px;
  height: 20px;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #231f20;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  background: #231f20;
  border-color: #231f20;
}
</style>
