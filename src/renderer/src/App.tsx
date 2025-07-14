import Navbar from "@/components/Navbar";
import Versions from "@/components/Versions";
import LocationForm, { type LocationFormData } from "@/components/LocationForm";
import LevelEditor from "@/components/LevelEditor";
import { useStore } from "@/store";
import { actions } from "@/store/actions";
import classes from "./App.module.css";

export default function App(): JSX.Element {
  const [{ selectedLocationId, locations }, dispatch] = useStore((state) => ({
    selectedLocationId: state.selectedLocationId,
    locations: state.locations,
  }));

  const selectedLocation = selectedLocationId ? locations[selectedLocationId] : null;

  const handleLocationFormSubmit = (data: LocationFormData) => {
    if (selectedLocationId) {
      dispatch(actions.updateLocation(selectedLocationId, {
        name: data.name,
        width: data.width,
        height: data.height,
        position: data.position,
      }));
    }
  };

  const handleLocationFormCancel = () => {
    dispatch(actions.selectLocation(null));
  };

  return (
    <div className={classes.app}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.main}>
        {selectedLocation ? (
          <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h2>Edit Location: {selectedLocation.name}</h2>
            <LocationForm
              location={selectedLocation}
              onSubmit={handleLocationFormSubmit}
              onCancel={handleLocationFormCancel}
            />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              Main
              <Versions />
            </div>
            <LevelEditor />
          </div>
        )}
      </div>
    </div>
  );
}
