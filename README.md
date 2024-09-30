This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# JSON Viewer

A React component that renders JSON data as a collapsible, hierarchical tree structure. It provides a visual interface to explore complex JSON objects and arrays, with additional features such as path copying and expandable nodes.

## Features

- **Recursive rendering** of JSON objects and arrays into a tree structure.
- **Expandable/Collapsible nodes** for nested objects and arrays.
- **Path copying** for each node to facilitate data extraction.
- **Customizable UI** powered by [Mantine](https://mantine.dev/) components.
- **Handles primitive types** such as strings, numbers, booleans, and `null` values.

## Demo

Check out a live demo of the JSON Viewer [here](https://stackblitz.com/~/github.com/matoslucas/JsonViewer).

## Installation

To integrate this component into your project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/matoslucas/JsonViewer.git
   ```

2. Install the required dependencies:

   ```bash
   cd JsonViewer
   npm install
   ```

## Usage

Once the repository and dependencies are set up, you can use the `JsonViewer` component in your application:

### Example

```tsx
import React from 'react';
import JsonViewer from './JsonViewer';

const App = () => {
  const jsonData = {
    name: 'John Doe',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA',
    },
    skills: ['React', 'TypeScript', 'Node.js'],
  };

  return (
    <div>
      <h1>JSON Viewer Demo</h1>
      <JsonViewer json={jsonData} />
    </div>
  );
};

export default App;
```

### Props

| Prop  | Type                               | Description                              |
| ----- | ---------------------------------- | ---------------------------------------- |
| `json` | `Record<string, unknown> | unknown[]` | The JSON object or array to be rendered. |

## Features

- **Explore Nested Data**: Expand and collapse nodes to explore deeply nested JSON structures.
- **Copy JSON Path**: Click the copy icon next to any node to copy its path to the clipboard.
- **Customizable UI**: Customize the appearance of the tree nodes by adjusting the Mantine components and styles.

## Customization

### Styles

The component uses `JsonViewer.module.css` to style elements. You can customize the styles by modifying this file or replacing it with your own.

Example:

```css
.show {
  padding: 10px;
  background-color: #f5f5f5;
}

.hide {
  display: none;
}
```

### Icons

The component uses icons from [Tabler Icons](https://tabler-icons.io/). You can swap them for your own icons or customize their appearance.

## Development

### Running Locally

To run the project locally:

1. Clone the repository as mentioned above.
2. Install dependencies with `npm install`.
3. Start the development server:

   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Running Tests

To run tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you'd like to improve the `JsonViewer` component or add new features, feel free to submit a pull request. Please ensure your code adheres to the repository's coding standards and is thoroughly tested.

### To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request with a detailed explanation of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Mantine](https://mantine.dev/) for the UI components.
- [Tabler Icons](https://tabler-icons.io/) for the beautiful icons.
