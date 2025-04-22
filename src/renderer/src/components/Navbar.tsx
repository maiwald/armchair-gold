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
  const [{ characters, locations }, dispatch] = useStore((state) => ({
    characters: Object.values(state.characters),
    locations: Object.values(state.locations),
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
        <ResourceSection key={resource.name} resource={resource} />
      ))}
    </nav>
  );
}

type ResourceSectionProps = {
  resource: Resource;
};

function ResourceSection({ resource }: ResourceSectionProps): JSX.Element {
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
        <ResourceSectionList items={resource.items} />
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
};

function ResourceSectionList({ items }: ResourceSectionListProps): JSX.Element {
  return items.length === 0 ? (
    <Center p="sm" fz="sm" c="dimmed">
      No items
    </Center>
  ) : (
    <div className={classes.sectionList!}>
      {items.map((item) => (
        <div key={item.id} className={classes.item!}>
          <UnstyledButton className={classes.itemButton!} key={item.id}>
            <Code fz="xxs">{item.id}</Code>
            {item.name}
          </UnstyledButton>
        </div>
      ))}
    </div>
  );
}
