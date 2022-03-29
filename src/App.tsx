import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  checkIfUserCurrentlySignedIn,
  reset,
  signInWithDemoAccount,
  signOutAll,
} from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const { isError, isSuccess } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   // if (isError) {
  //   // }

  //   if (isSuccess) {
  //   }

  //   dispatch(reset());
  // }, [isSuccess]);

  useEffect(() => {
    // dispatch(checkIfUserCurrentlySignedIn());
    // // setTimeout(() => {
    // // dispatch(signOutAll());
    // // }, 3000);
    // // setTimeout(() => {
    // // dispatch(signInWithDemoAccount());
    // // dispatch(reset());
    // // }, 7000);
    // setTimeout(() => {
    //   dispatch(reset());
    // }, 3000);

  }, []);

  return <div className="App"></div>;
}

export default App;
