// We only show package types that are defined in this list
export const packageTypeTitles: Record<string, { title: string; description: string }> = {
  main: { title: 'Main modules', description: 'The main modules of the SDK' },
  integration: { title: 'Integrations', description: 'Integrations with frameworks and services' },
  feature: {
    title: 'Features',
    description:
      'Feature modules. Only use these directly for advanced use-cases, the prefered way is to use these features via the umbrella package "moralis"',
  },
  core: { title: 'Core modules', description: 'Core modules are the building blocks of Moralis.' },
  utils: {
    title: 'Utilities',
    description: 'Utilities, types, operations and datatypes related used by other modules.',
  },
  tools: {
    title: 'Tools',
    description: 'Stand-alone tools and utilities',
  },
};
