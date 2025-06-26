import { css } from "lit";

export const styles = css`
  :host {
    --mdc-icon-size: 24px;
    --clickable-cursor: default;
  }

  ha-card {
    height: 100%;
    overflow: hidden;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
}

  .card-content-container 
  {
    width: 100%;
    padding-bottom: 24px;
  }

  .card-header
  {
    padding: 24px 16px 10px;
    line-height: normal;
  }
`;
