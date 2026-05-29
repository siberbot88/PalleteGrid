declare module "splitting" {
  type SplittingOptions = {
    target?: Element | Element[] | string;
    by?: "chars" | "words" | "lines" | "items" | "rows" | "cols" | "cells";
  };

  export default function Splitting(options?: SplittingOptions): unknown[];
}
