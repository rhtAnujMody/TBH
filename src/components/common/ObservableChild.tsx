import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';

type Props = {
  children: React.ReactNode;
};

const ObservableChild: FC<Props> = observer(({children}) => {
  return children;
});

export default ObservableChild;
