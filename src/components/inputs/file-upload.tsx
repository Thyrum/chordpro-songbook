import { UploadFileOutlined } from "@mui/icons-material";
import { Button, ButtonProps, styled } from "@mui/material";
import React from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export interface InputFileUploadProps
  extends Omit<ButtonProps, "onChange" | "startDecorator" | "endDecorator"> {
  onChange?: (files: FileList | null) => void;
  multiple?: boolean;
  icon?: React.ReactNode;
  accept?: string;
  text?: string;
}

export default function InputFileUpload({
  onChange,
  multiple,
  tabIndex,
  accept,
  text = "Upload a file",
  icon = <UploadFileOutlined />,
  ...props
}: InputFileUploadProps) {
  return (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      startIcon={icon}
      variant="outlined"
      size="small"
      {...props}
    >
      {text}
      <VisuallyHiddenInput
        tabIndex={tabIndex}
        type="file"
        onChange={(e) => onChange && onChange(e.target.files)}
        multiple={multiple}
        accept={accept}
      />
    </Button>
  );
}
