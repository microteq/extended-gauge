import { css } from "lit";

export const styles = css`
  :host {
    --mdc-icon-size: 24px;
    --clickable-cursor: default;
  }

  ha-gauge
  {
    width: 100%;
    height: 100%;
  }

  .card-content-container 
  {
    width: 90%;
    height: 90%;
    margin: 0 auto;
    padding-bottom: 24px;
  }

  .card-header
  {
    padding: 24px 16px 10px;
    line-height: normal;
  }
`;
