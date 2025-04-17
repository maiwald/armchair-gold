import { AppShell, Skeleton } from "@mantine/core";

import Versions from "./components/Versions";

export default function App(): JSX.Element {
  return (
    <AppShell navbar={{ width: 300, breakpoint: "xs" }} padding="md">
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        Main
        <Versions />
      </AppShell.Main>
    </AppShell>
  );
}
