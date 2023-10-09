import React from 'react';
import Global from 'utils/global';

interface Props {
  show: boolean;
  alertMsg: string;
  alertType: string;
}

function Alert({ show, alertMsg, alertType }: Props) {
  const setAlertClass = () => {
    if (!show) {
      return 'invisibleElement';
    }
    if (alertType === Global.SUCCESS_MSG) {
      return 'alert alert-success';
    }
    if (alertType === Global.FAILED_MSG) {
      return 'alert alert-danger';
    }
    return '';
  };

  return (
    <div className={setAlertClass()} role="alert">
      {alertMsg}
    </div>
  );
}

export default Alert;
