

//components
import Messenger from "./components/Messenger";
import AccountProvider from "./Context/AccountProvider";
import TeamplateProvider from "./theme/TeamplateProvider";
import UserProvider from "./Context/UserProvider";

function App() {
  return (
    <TeamplateProvider>
      <UserProvider>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </UserProvider>
    </TeamplateProvider>

  );
}
export default App;