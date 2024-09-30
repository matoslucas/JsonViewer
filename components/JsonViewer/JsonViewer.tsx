import React from 'react';
import { IconChevronRight, IconCopy } from '@tabler/icons-react';
import { ActionIcon, Button, Card, Group, NavLink, Text } from '@mantine/core';
import classes from './JsonViewer.module.css';
import { capitalize } from 'lodash';

interface JsonViewerProps {
  json: Record<string, unknown> | unknown[];
}

// Utility function to check if a value is a primitive
const isPrimitive = (value: unknown): boolean =>
  value === null || ['string', 'number', 'boolean'].includes(typeof value);

// Copy path to clipboard with feedback
const handleCopyPath = (path: string) => {
  navigator.clipboard.writeText(path).then(() => {
    console.log(`Copied to clipboard: ${path}`);
  });
};

// Function to render the label of the node
const renderLabel = (key: string | number, value: unknown, hasChildren: boolean) => (
  <Group justify="flex-end" className={classes.show}>
    {hasChildren ? (
      <Text c="dimmed">[{Array.isArray(value) ? value.length : Object.keys(value as Record<string, unknown>).length}]</Text>
    ) : (
      <Text c="dimmed" truncate="start">
        {String(value)}
      </Text>
    )}
    <Group maw={200} justify="flex-end" gap={0}>
      <Text size="sm" truncate="start">
        {capitalize(String(key))}
      </Text>
    </Group>
  </Group>
);

// Function to render the left section (Button and Copy Icon)
const renderLeftSection = (hasChildren: boolean, currentPath: string) => {
  if (hasChildren) return null;
  return (
    <Group gap={0} className={classes.hide}>
      <Button
        variant="default"
        size="xs"
        mah={16}
        styles={{
          root: {
            borderColor: '#858e9652',
            borderWidth: '1px',
            borderStyle: 'solid',
          },
        }}
      >
        <Text size="xs" styles={{ root: { fontSize: 10 } }}>
          Create column
        </Text>
      </Button>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="xs"
        onClick={() => handleCopyPath(currentPath)}
      >
        <IconCopy size={16} />
      </ActionIcon>
    </Group>
  );
};

// Function to render the right section (Chevron or Icon)
const renderRightSection = (hasChildren: boolean) => (
  <ActionIcon
    variant={hasChildren ? 'subtle' : 'light'}
    size="xs"
    styles={hasChildren ? undefined : { root: { borderColor: '#a0bffc', borderWidth: '1px', borderStyle: 'solid' } }}
  >
    {hasChildren ? (
      <IconChevronRight size="1rem" stroke={1.5} />
    ) : (
      <Text size="xs" styles={{ root: { fontSize: 10 } }}>T</Text>
    )}
  </ActionIcon>
);

// Renders a single node of the JSON tree
const renderNode = (key: string | number, value: unknown, path: string) => {
  const currentPath = path ? `${path}.${key}` : String(key);

  // Narrow the type of value to check if it is an object or array
  const hasChildren =
    value !== null && typeof value === 'object' && (Array.isArray(value) || Object.keys(value as Record<string, unknown>).length > 0);

  return (
    <NavLink
      key={currentPath}
      label={renderLabel(key, value, hasChildren)}
      leftSection={renderLeftSection(hasChildren, currentPath)}
      rightSection={renderRightSection(hasChildren)}
      childrenOffset={0}
      dir="rtl"
    >
      {hasChildren ? renderTree(value, currentPath) : null}
    </NavLink>
  );
};

// Recursively renders the tree structure from a JSON object or array
const renderTree = (node: unknown, path: string = ''): React.ReactNode => {
  if (Array.isArray(node)) {
    return node.map((item, index) => renderNode(index, item, path));
  } else if (typeof node === 'object' && node !== null) {
    return Object.entries(node as Record<string, unknown>).map(([key, value]) =>
      renderNode(key, value, path)
    );
  }
  return null; // Return null when there are no children
};

// Main JsonViewer component
const JsonViewer: React.FC<JsonViewerProps> = ({ json }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group gap={0}>{renderTree(json)}</Group>
    </Card>
  );
};

export default JsonViewer;
