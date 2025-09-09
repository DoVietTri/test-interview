import type { Option } from "./product";

export interface OptionTypeSelected {
  optionTypeId: number;
  displayName: string;
  option: Option;
}

export interface ProductCombo {
  uid: string;
  name: string;
  quantity: number;
  optionTypes: OptionTypeSelected[];
}
