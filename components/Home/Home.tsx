'use client';

import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';

import classes from './Home.module.css';

import dynamic from 'next/dynamic';
import { Button, Group, JsonInput, Stack } from '@mantine/core';

// Dynamically import JsonViewer with SSR disabled
const JsonViewer = dynamic(() => import('../JsonViewer/JsonViewer'), {
  ssr: false,
});

const Home: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonData, setJsonData] = useState<any>(null);

  const [jsonDataisValid, setJsonDataisValid] = useState(false);

  const handleRenderJson = (data: string) => {
    try {
      JSON.parse(data);
      // setJsonData(parsedJson);
      setJsonDataisValid(true);
    } catch (error) {
      console.log('Invalid JSON');
      setJsonDataisValid(false);
    }
  };

  const setData = () => {
    const parsedJson = JSON.parse(jsonInput);
    setJsonData(parsedJson);
  };
  return (
    <Group justify="center" w={'100vw'} gap="xs">
      <JsonInput
        w="45vw"
        label="Enter JSON here"
        validationError="Invalid JSON"
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={(value) => {
          setJsonInput(value);
          handleRenderJson(value);
        }}
        formatOnBlur
        autosize
        minRows={4}
      />

      <Stack justify="flex-end" w="45vw">
        <Button onClick={setData} disabled={!jsonDataisValid}>
          Render JSON
        </Button>
        {jsonData && <JsonViewer json={jsonData} />}
      </Stack>
    </Group>
  );
};
export default Home;
