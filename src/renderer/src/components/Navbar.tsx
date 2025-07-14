import {
  ActionIcon,
  Center,
  Code,
  Collapse,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Navbar.module.css";
import { useStore } from "@/store";
import { actions } from "@/store/actions";

type Resource = {
  name: string;
  items: Array<{ id: string; name: string }>;
  action: () => void;
};

export default function Navbar(): JSX.Element {
  const [{ characters, locations, selectedLocationId }, dispatch] = useStore((state) => ({
    characters: Object.values(state.characters),
    locations: Object.values(state.locations),
    selectedLocationId: state.selectedLocationId,
  }));

  const resources = [
    {
      name: "Locations",
      items: locations,
      action: () => dispatch(actions.createLocation("New Location")),
    },
    {
      name: "Characters",
      items: characters,
      action: () => dispatch(actions.createCharacter("New Character")),
    },
  ];

  return (
    <nav className={classes.navbar}>
      <TextInput
        placeholder="Search"
        className={classes.searchInput!}
        size="xs"
        leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />}
        leftSectionPointerEvents="none"
      />

      {resources.map((resource) => (
        <ResourceSection 
          key={resource.name} 
          resource={resource} 
          selectedId={resource.name === "Locations" ? selectedLocationId : null}
        />
      ))}
    </nav>
  );
}

type ResourceSectionProps = {
  resource: Resource;
  selectedId?: string | null;
};

function ResourceSection({ resource, selectedId }: ResourceSectionProps): JSX.Element {
  const [isOpened, { toggle }] = useDisclosure(false);

  return (
    <>
      <ResourceSectionHeader
        key={resource.name}
        resource={resource}
        isOpened={isOpened}
        toggleResource={toggle}
      />

      <Collapse in={isOpened}>
        <ResourceSectionList 
          items={resource.items} 
          resourceName={resource.name}
          selectedId={selectedId ?? null}
        />
      </Collapse>
    </>
  );
}

type ResourceSectionHeaderProps = {
  resource: Resource;
  isOpened: boolean;
  toggleResource: (resource: string) => void;
};

function ResourceSectionHeader({
  resource,
  isOpened,
  toggleResource,
}: ResourceSectionHeaderProps): JSX.Element {
  return (
    <div className={classes.sectionHeader!} key={resource.name}>
      <UnstyledButton
        className={classes.sectionToggle!}
        onClick={() => toggleResource(resource.name)}
      >
        <FontAwesomeIcon
          fixedWidth
          icon={isOpened ? faChevronDown : faChevronRight}
          className={classes.linkIcon!}
        />
        {resource.name}
      </UnstyledButton>
      <ActionIcon
        className={classes.addButton!}
        onClick={resource.action}
        variant="light"
      >
        <FontAwesomeIcon icon={faPlus} />
      </ActionIcon>
    </div>
  );
}

type ResourceSectionListProps = {
  items: Array<{ id: string; name: string }>;
  resourceName: string;
  selectedId?: string | null;
};

function ResourceSectionList({ items, resourceName, selectedId }: ResourceSectionListProps): JSX.Element {
  const [, dispatch] = useStore((state) => state);

  const handleItemClick = (item: { id: string; name: string }) => {
    if (resourceName === "Locations") {
      dispatch(actions.selectLocation(item.id));
    }
  };

  return items.length === 0 ? (
    <Center p="sm" fz="sm" c="dimmed">
      No items
    </Center>
  ) : (
    <div className={classes.sectionList!}>
      {items.map((item) => (
        <div key={item.id} className={classes.item!}>
          <UnstyledButton 
            className={classes.itemButton!} 
            onClick={() => handleItemClick(item)}
            style={{ 
              backgroundColor: selectedId === item.id ? 'var(--mantine-color-blue-light)' : undefined 
            }}
          >
            <Code fz="xxs">{item.id}</Code>
            {item.name}
          </UnstyledButton>
        </div>
      ))}
    </div>
  );
}
