import { FC, ReactNode, useState } from 'react';
import { CSSTransition } from 'react-transition-group'

export const TransitionForm: FC<PropsType> = ({ children }) => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames='alert'
      unmountOnExit
      // onEnter={() => setShowButton(false)}
      // onExited={() => setShowButton(true)}
    >
      {children}
    </CSSTransition>
  )
}

type PropsType = {
  children: ReactNode
}