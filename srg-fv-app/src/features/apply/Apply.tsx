import { Reducer, useReducer } from 'react';
import { ApplyForm } from './ApplyForm';
import { ApplyEvent, ApplyState } from './enums';
import { ThankYou } from './ThankYou';

export function Apply() {
  const reducer: Reducer<ApplyState, ApplyEvent> = (_state, event) => {
    switch (event) {
      case ApplyEvent.Submit:
        return ApplyState.ThankYou;
      default:
        return ApplyState.Form;
    }
  };

  const [state, dispatch] = useReducer(reducer, ApplyState.Form);

  switch (state) {
    case ApplyState.Form:
      return (
        <ApplyForm
          submit={() => {
            dispatch(ApplyEvent.Submit);
          }}></ApplyForm>
      );
    case ApplyState.ThankYou:
      return <ThankYou />;
  }
}
