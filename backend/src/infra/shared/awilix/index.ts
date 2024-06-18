import { AwilixContainer, createContainer } from 'awilix';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Cradle {}

const container: AwilixContainer<Cradle> = createContainer();

container.register({});

export { container };
