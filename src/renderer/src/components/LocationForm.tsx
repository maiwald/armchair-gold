import { Button, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Location } from "@/store/types";

export type LocationFormData = {
  name: string;
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
};

type LocationFormProps = {
  location?: Location;
  onSubmit: (data: LocationFormData) => void;
  onCancel?: () => void;
};

export default function LocationForm({
  location,
  onSubmit,
  onCancel,
}: LocationFormProps): JSX.Element {
  const form = useForm<LocationFormData>({
    initialValues: {
      name: location?.name ?? "",
      width: location?.width ?? 20,
      height: location?.height ?? 20,
      position: {
        x: location?.position.x ?? 0,
        y: location?.position.y ?? 0,
      },
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      width: (value) => (value <= 0 ? "Width must be greater than 0" : null),
      height: (value) => (value <= 0 ? "Height must be greater than 0" : null),
    },
  });

  const handleSubmit = (data: LocationFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Enter location name"
          {...form.getInputProps("name")}
        />

        <NumberInput
          label="Width"
          placeholder="Enter width"
          min={1}
          {...form.getInputProps("width")}
        />

        <NumberInput
          label="Height"
          placeholder="Enter height"
          min={1}
          {...form.getInputProps("height")}
        />

        <Stack gap="xs">
          <div style={{ fontWeight: 500, fontSize: "14px" }}>Position</div>
          <NumberInput
            label="X"
            placeholder="Enter X coordinate"
            {...form.getInputProps("position.x")}
          />
          <NumberInput
            label="Y"
            placeholder="Enter Y coordinate"
            {...form.getInputProps("position.y")}
          />
        </Stack>

        <Stack gap="xs">
          <Button type="submit">Save</Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}