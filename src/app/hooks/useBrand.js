import { useContext } from "react";
import BrandContaxt from "app/contexts/BrandContaxt";
const useBrand = () => useContext(BrandContaxt);
export default useBrand;
