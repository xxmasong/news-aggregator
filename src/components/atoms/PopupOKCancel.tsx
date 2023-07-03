import * as React from 'react';
import styled from 'styled-components';
import PopupBase from './PopupBase';
import Button from './Button';
import { themedPalette } from '@/lib/styles/themes';

const PopupOKCancelBlock = styled.div`
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${themedPalette.text1};
    line-height: 1.5;
    font-weight: bold;
  }
  .message {
    line-height: 1.5;
    font-size: 1rem;
    color: ${themedPalette.text2};
    margin-top: 1rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }
  .button-area {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    button + button {
      margin-left: 0.75rem;
    }
  }
`;

export interface PopupOKCancelProps {
  visible: boolean;
  title?: string;
  onConfirm?: () => any;
  onCancel?: () => any;
  children: React.ReactNode;
}

const PopupOKCancel: React.FC<PopupOKCancelProps> = ({
  visible,
  title,
  children,
  onConfirm,
  onCancel,
}) => {
  return (
    <PopupBase visible={visible}>
      <PopupOKCancelBlock>
        {title && <h3>{title}</h3>}
        <div className="message">{children}</div>
        <div className="button-area">
          {onCancel && (
            <Button color="transparent" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </PopupOKCancelBlock>
    </PopupBase>
  );
};

export default PopupOKCancel;
