import { DataSource, DataSourceOptions } from "typeorm";
import { ComposeComponent, Equipment, BaseEquipment, Component, Event, Pin, Simulation, Arduino, TypeComponent, User } from "../entities";
import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot({
    envFilePath: ['.env', '.env.local'],
    isGlobal: true,
})

const entities = [
    Equipment,
    BaseEquipment,
    Component,
    Event,
    Pin,
    Simulation,
    Arduino,
    TypeComponent,
    ComposeComponent,
    User
]

const DockerDatabaseOptions: DataSourceOptions = {
    type: process.env.DOCKER_TYPEORM_CONNECTION as any,
    host: process.env.DOCKER_TYPEORM_HOST,
    port: parseInt(process.env.DOCKER_TYPEORM_PORT, 10),
    username: process.env.DOCKER_TYPEORM_USERNAME,
    password: process.env.DOCKER_TYPEORM_PASSWORD,
    database: process.env.DOCKER_TYPEORM_DATABASE,
    entities: entities,
    synchronize: process.env.DOCKER_TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.DOCKER_TYPEORM_LOGGING === 'true',
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
}
const DevDatabaseOptions: DataSourceOptions = {
    type: process.env.DEV_TYPEORM_CONNECTION as any,
    host: process.env.DEV_TYPEORM_HOST,
    port: parseInt(process.env.DEV_TYPEORM_PORT, 10),
    username: process.env.DEV_TYPEORM_USERNAME,
    password: process.env.DEV_TYPEORM_PASSWORD,
    database: process.env.DEV_TYPEORM_DATABASE,
    entities: entities,
    synchronize: process.env.DEV_TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.DEV_TYPEORM_LOGGING === 'true',
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
}

const TestDatabaseOptions: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: entities,
    synchronize: true,
    logging: false,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
}

class DataSourceFactory {

    private constructor() { }

    static getDataSourceOptions(nodeEnv: string): DataSourceOptions {
        switch (nodeEnv) {
            case 'test':
                return TestDatabaseOptions;
            case 'dev':
                return DevDatabaseOptions;
            case 'docker':
                return DockerDatabaseOptions;
            default:
                return DevDatabaseOptions;
        }
    }
}

const DataSourceConfig = DataSourceFactory.getDataSourceOptions(process.env.NODE_ENV);

export { DataSourceConfig }

export const AppDS = new DataSource(DataSourceConfig);