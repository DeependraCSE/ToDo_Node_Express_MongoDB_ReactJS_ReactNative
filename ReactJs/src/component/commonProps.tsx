export type LabelProps = {
    htmlFor: string;
    text: string;
};

export type TextInputProps = {
    type: string;
    id: string;
    placeholder: string;
    value : any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disable?:boolean
};

export type CheckboxInputProps = {
    id: string;
    value : string;
    checked : boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
    lable: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type TextClickWithPreTextProps = {
    preText? : string,
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type AlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}
export type AlertType = 'info' | 'danger' | 'success' | 'warning' | 'dark';