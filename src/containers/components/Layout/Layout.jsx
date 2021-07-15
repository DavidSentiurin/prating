import { observer } from 'mobx-react';
import { LayoutComponent } from '../../../components';
import { session } from '../../../data';


export const LayoutContainer = observer(({children}) => {
  const onClickSignOut = () => {
    if (session) {
      session.signOut();
    };
  };

  return (
    <LayoutComponent onClickSignOut={onClickSignOut} isAuthorized={session.isAuthorized}>
      {children}
    </LayoutComponent>
  );
});
