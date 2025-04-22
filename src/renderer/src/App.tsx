import Navbar from "@/components/Navbar";
import Versions from "@/components/Versions";
import classes from "./App.module.css";

export default function App(): JSX.Element {
  return (
    <div className={classes.app}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.main}>
        Main
        <Versions />
      </div>
    </div>
  );
}
