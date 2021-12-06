import { RTMessage } from "../main";

export const OnClickAction = (
  msgtype: string,
  eid: string,
  msgdata: string
) => {
  const msg = <RTMessage>{
    type: msgtype,
    id: eid,
    data: msgdata,
  };
  var msgx = btoa(JSON.stringify(msg));
  const action = `
      event.stopPropagation();
      webviewApi.postMessage('rpgtools-content','${msgx}');
      return false;
  `;
  return action.trim().replace(/\n/g, " ");
};
