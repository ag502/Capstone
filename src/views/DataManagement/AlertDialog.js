import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

const AlertDialog = ({
  open,
  type,
  selectedNumber,
  setOpen,
  deleteFolderHandler
}) => {
  let message = '';
  let title = '';

  switch (type) {
    case 'Delete':
      message = '개의 폴더를 삭제하시겠습니까?';
      title = '삭제';
      break;
    case 'Download':
      message = '개의 폴더의 파일을 다운로드 하시겠습니까?';
      title = '다운로드';
      break;
    default:
      break;
  }
  return (
    <Dialog
      open={open}
      onClose={() => setOpen({ isOpen: false, type: 'None' })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`${selectedNumber}${message}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => setOpen({ isOpen: false, type: 'None' })}
        >
          Disagree
        </Button>
        <Button color="primary" onClick={deleteFolderHandler} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
