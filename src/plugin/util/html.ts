import { RTMessage } from "../main";

export const clickAction = (msgtype: string, eid: string, msgdata: string) => {
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

export const errorHtml = (text: string): string => {
  return `<span class="error">${text}</span>`;
};

export const loadMsg = (id: string, msgtype: string): string => {
  const msg = <RTMessage>{
    type: msgtype,
    id: id,
    data: "",
  };
  var msgx = btoa(JSON.stringify(msg));
  const action = `
  event.stopPropagation();
  webviewApi.postMessage('rpgtools-content','${msgx}').then(function(response) {
      const el = document.getElementById('${id}');
      el.childNodes.forEach(it => el.removeChild(it));
      const txt = document.createTextNode(response);
      el.appendChild(txt);
      el.setAttribute("onmouseover","");
  });
  return false;
  `;
  return action.trim().replace(/\n/g, " ");
};
