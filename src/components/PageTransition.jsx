import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './../assets/css/styles.css'; // Import your CSS for transitions

const PageTransition = ({ children, location }) => {
    console.log(children,"children");
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="fade"
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
