import React, { ReactNode } from 'react';

// Material UI Components
import Button from '@material-ui/core/Button';
import MaterialDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

interface Props {
  open: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  titleText?: string;
  children?: ReactNode;
  contentText?: string;
  closeText?: string;
  confirmText?: string;
}

function Dialog({ open, onClose, onCancel, onConfirm, titleText, children, contentText, closeText, confirmText }: Props) {
  return (
    <MaterialDialog aria-labelledby='form-dialog-title' onClose={onClose} open={open}>
      {titleText && <DialogTitle id='form-dialog-title'>{titleText}</DialogTitle>}
      {(contentText || children) && (
        <DialogContent>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}
          {children}
        </DialogContent>
      )}
      <DialogActions>
        <Button color='primary' onClick={onCancel || onClose}>
          {closeText || 'Lukk'}
        </Button>
        <Button color='primary' onClick={onConfirm || onCancel} variant='contained'>
          {confirmText || 'OK'}
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
}

export default Dialog;
