import { DataSource, DataSourceOptions } from "typeorm";
import { Equipment, BaseEquipment, Component, Event, Pin, Simulation, Arduino } from "../entities";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})
const DatabaseOptions: DataSourceOptions = {
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
        Equipment,
        BaseEquipment,
        Component,
        Event,
        Pin,
        Simulation,
        Arduino
    ],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
}

const TestDatabaseOptions: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
        Equipment,
        BaseEquipment,
        Component,
        Event,
        Pin,
        Simulation,
        Arduino
    ],
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
            case 'development':
                return DatabaseOptions;
            default:
                return DatabaseOptions;
        }
    }
}

const DataSourceConfig = DataSourceFactory.getDataSourceOptions(process.env.NODE_ENV);

export { DataSourceConfig }

export const AppDS = new DataSource(DataSourceConfig);