export interface State {
  showPostUpload: boolean;
  showPostDetails: boolean;
  messages: string;
}

export const state: State = {
  showPostUpload: false,
  showPostDetails: false,
  messages: ""
};
