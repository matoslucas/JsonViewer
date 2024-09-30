import React, { useCallback } from 'react';
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

// Renders a single node of the JSON tree
const renderNode = (key: string | number, value: unknown, path: string) => {
  const currentPath = path ? `${path}.${key}` : String(key);
  const hasChildren = value && typeof value === 'object' && value !== null;
  const childrenCount = hasChildren
    ? Array.isArray(value)
      ? value.length
      : Object.keys(value).length
    : null;

  return (
    <NavLink
      key={currentPath}
      label={
        <Group justify="flex-end" className={classes.show}>
          {hasChildren ? (
            <Text c="dimmed">[{childrenCount}]</Text>
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
      }
      leftSection={
        !hasChildren && (
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
        )
      }
      rightSection={
        hasChildren ? (
          <ActionIcon variant="subtle" size="xs">
            <IconChevronRight size="1rem" stroke={1.5} />
          </ActionIcon>
        ) : (
          <ActionIcon
            variant="light"
            size="xs"
            styles={{
              root: {
                borderColor: '#a0bffc',
                borderWidth: '1px',
                borderStyle: 'solid',
              },
            }}
          >
            <Text size="xs" styles={{ root: { fontSize: 10 } }}>
              T
            </Text>
          </ActionIcon>
        )
      }
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
    return Object.entries(node).map(([key, value]) =>
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
