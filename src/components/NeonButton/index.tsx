import { UnknownObj } from "src/shared/models/common.model";
import ButtonShared, { ButtonSharedPropsModel } from "../ButtonShared";
import "./styles.scss";

const NeonButton = (props: ButtonSharedPropsModel) => {
  return (
    <ButtonShared isNeon {...props}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </ButtonShared>
  );
};

export default NeonButton;
