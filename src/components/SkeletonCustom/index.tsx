import { Skeleton, SxProps } from "@mui/material";

interface SkeletonCustomProps {
  height?: number | string;
  sx?: SxProps;
  width?: number | string;
}

const SkeletonCustom = (props: SkeletonCustomProps) => {
  const { height, width, sx } = props;
  return (
    <Skeleton
      animation="wave"
      height={height}
      width={width}
      sx={{ borderRadius: "5px", ...(sx || {}) }}
      variant="rectangular"
    />
  );
};

export default SkeletonCustom;